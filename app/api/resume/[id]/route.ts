import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function GET() {
  try {
    await connectToDatabase();

    const resumes = await Resume.find().sort({ createdAt: -1 }).lean();

    const sanitized = resumes.map((r: any) => ({
      ...r,
      _id: r._id.toString(),
    }));

    return NextResponse.json(sanitized, { status: 200 });
  } catch (error: any) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { message: "Error fetching resumes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const newResume = await Resume.create(body);

    const responseData = {
      ...newResume.toObject(),
      _id: newResume._id.toString(),
    };

    return NextResponse.json(
      { message: "Resume saved successfully", data: responseData },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { message: "Error saving resume", error: error.message },
      { status: 500 }
    );
  }
}