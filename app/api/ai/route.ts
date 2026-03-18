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
      return NextResponse.json({ message: "AI service not configured. Please set OPENROUTER_API_KEY." }, { status: 500 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are a professional resume writer. Given a user's description, return ONLY raw JSON with no explanation, no markdown, no code fences, no extra text whatsoever. Return exactly this JSON structure:
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
}
Return ONLY the JSON object. Do not wrap it in markdown. Do not add any text before or after. Do not use code fences.`,
          },
          {
            role: "user",
            content: description,
          },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return NextResponse.json({ message: "AI rate limit exceeded. Please try again in a moment." }, { status: 429 });
      }
      if (status === 401 || status === 403) {
        return NextResponse.json({ message: "AI service authentication failed. Check your API key." }, { status: 500 });
      }
      return NextResponse.json({ message: `AI service returned error (${status}). Please try again.` }, { status: 500 });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ message: "AI returned an empty response. Please try again." }, { status: 500 });
    }

    // Strip <think>...</think> tags (including multiline)
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    // Strip markdown code fences in all variations
    content = content.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    // Try to extract JSON object if there's extra text around it
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "AI response was not valid JSON. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ message: "AI generation failed unexpectedly. Please try again." }, { status: 500 });
  }
}