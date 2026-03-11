import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { description } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    console.log("API KEY EXISTS:", !!apiKey);
    console.log("API KEY PREFIX:", apiKey?.substring(0, 15));

    if (!apiKey) {
      return NextResponse.json({ message: "AI service not configured" }, { status: 500 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free ",
        messages: [
          {
            role: "system",
            content: `You are a professional resume writer. Return only raw JSON with this structure:
{
  "summary": "2-3 sentence professional summary",
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "experience": [{"company": "Company Name", "role": "Job Title", "description": "What you did"}]
}`,
          },
          { role: "user", content: description },
        ],
      }),
    });

    console.log("OPENROUTER STATUS:", response.status);
    const data = await response.json();
    console.log("OPENROUTER RESPONSE:", JSON.stringify(data).substring(0, 200));

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ message: "AI returned empty response" }, { status: 500 });
    }

    const cleaned = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed, { status: 200 });

  } catch (error: unknown) {
    console.error("AI ERROR:", error);
    return NextResponse.json({ message: "AI generation failed" }, { status: 500 });
  }
}