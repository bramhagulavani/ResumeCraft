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

    const sanitized = resumes.map((r: any) => ({
      ...r,
      _id: r._id.toString(),
    }));

    return NextResponse.json(sanitized, { status: 200 });
  } catch {
    // ✅ Fixed: return empty array on error, not an object
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
  }  catch (error: any) {
  console.error("POST ERROR DETAILS:", error.message);
  return NextResponse.json(
    { message: "Error saving resume", error: error.message },
    { status: 500 }
  );
  }
}