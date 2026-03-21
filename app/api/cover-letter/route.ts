import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resumeText, jobDescription, tone } = await req.json();

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json(
        { message: "Both resume and job description are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ message: "AI service not configured" }, { status: 500 });
    }

    const toneInstruction = tone === "formal"
      ? "Write in a very formal, corporate, professional tone."
      : tone === "creative"
      ? "Write in a creative, enthusiastic, and personable tone."
      : "Write in a professional yet friendly tone.";

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
            content: `You are a professional cover letter writer. Generate a compelling cover letter based on the resume and job description provided. ${toneInstruction}

Rules:
- Start with "Dear Hiring Manager,"
- 3-4 paragraphs maximum
- Paragraph 1: Express interest in the role and company
- Paragraph 2: Highlight 2-3 most relevant skills/experiences from the resume that match the job
- Paragraph 3: Show enthusiasm and what you can bring to the team
- Paragraph 4: Call to action — request an interview, thank them
- End with "Sincerely," followed by a blank line for the name
- Do NOT include any explanation, just the cover letter text
- Keep it under 350 words
- Make it specific to the job description, not generic`,
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
      console.error("OpenRouter error:", errData);
      return NextResponse.json({ message: "AI service error" }, { status: 500 });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ message: "AI returned empty response" }, { status: 500 });
    }

    // Strip think tags if present
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    return NextResponse.json({ coverLetter: content }, { status: 200 });

  } catch (error: unknown) {
    console.error("Cover letter error:", error);
    return NextResponse.json({ message: "Cover letter generation failed" }, { status: 500 });
  }
}