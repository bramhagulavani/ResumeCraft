import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { description } = await req.json();

    if (!description?.trim()) {
      return NextResponse.json({ message: "Description is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
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
        // ✅ Fixed: removed trailing space from model name
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are a professional resume writer. Given a user's description, generate resume content in JSON format only. No explanation, no markdown, no extra text, just raw JSON.
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

    if (!response.ok) {
      return NextResponse.json({ message: "AI service error" }, { status: 500 });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ message: "AI returned empty response" }, { status: 500 });
    }

    // ✅ Fixed: strip <think>...</think> tags that Llama models sometimes add
    content = content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    // ✅ Clean markdown fences if present
    content = content.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "AI response was not valid JSON" }, { status: 500 });
    }
    return NextResponse.json({ message: "AI generation failed" }, { status: 500 });
  }
}