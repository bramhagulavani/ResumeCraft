import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    await connectToDatabase();

    const resumes = await Resume.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const sanitized = resumes.map((r: Record<string, unknown>) => ({
      ...r,
      _id: String(r._id),
    }));

    return NextResponse.json(sanitized, { status: 200 });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const newResume = await Resume.create({ ...body, userId });

    const responseData = {
      ...newResume.toObject(),
      _id: newResume._id.toString(),
    };

    return NextResponse.json(
      { message: "Resume saved successfully", data: responseData },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error saving resume" },
      { status: 500 }
    );
  }
}