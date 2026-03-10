import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { description } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen/qwen3-vl-30b-a3b-thinking",
        messages: [
          {
            role: "system",
            content: `You are a professional resume writer. Given a user's description, generate resume content in JSON format only. No explanation, no markdown, just raw JSON.
Return exactly this structure:
{
  "summary": "2-3 sentence professional summary",
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "description": "What you did there in 1-2 sentences"
    }
  ]
}`,
          },
          {
            role: "user",
            content: description,
          },
        ],
      }),
    });
    console.log(response);
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ message: "AI returned empty response" }, { status: 500 });
    }

    // Clean and parse JSON
    const cleaned = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed, { status: 200 });
  } catch (error: any) {
    console.error("AI ERROR:", error);
    return NextResponse.json({ message: "AI generation failed" }, { status: 500 });
  }
}