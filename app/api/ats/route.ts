import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resumeText, jobDescription } = await req.json();

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json(
        { message: "Both resume and job description are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    console.log("ATS API KEY EXISTS:", !!apiKey);
console.log("ATS API KEY PREFIX:", apiKey?.substring(0, 15));   
    if (!apiKey) {
      return NextResponse.json(
        { message: "AI service not configured" },
        { status: 500 }
      );
    }
    

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          {
            role: "system",
            content: `You are an ATS (Applicant Tracking System) expert. Analyze the resume against the job description and return ONLY raw JSON with no explanation, no markdown, no code fences.

Return exactly this structure:
{
  "score": <number between 0 and 100>,
  "verdict": "<one of: Excellent, Good, Average, Poor>",
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}`,
          },
          {
            role: "user",
            content: `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
          },
        ],
      }),
    });

    if (!response.ok) {
  const errData = await response.json();
  console.log("OPENROUTER ERROR:", JSON.stringify(errData));
  return NextResponse.json({ message: "AI service error" }, { status: 500 });
}

const data = await response.json();
console.log("OPENROUTER RESPONSE:", JSON.stringify(data).substring(0, 300));    

   
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ message: "AI returned empty response" }, { status: 500 });
    }

    // Strip <think> tags and markdown fences
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    content = content.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed, { status: 200 });

  } catch (error: unknown) {
    console.log("ATS ERROR:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "AI response was not valid JSON" }, { status: 500 });
    }
    return NextResponse.json({ message: "ATS check failed" }, { status: 500 });
  }
}