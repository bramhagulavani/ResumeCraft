import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function POST(req: Request) {
  try {
    // Connect to DB
    await connectToDatabase();

    // Get data from frontend
    const body = await req.json();

    // Save to database
    const newResume = await Resume.create(body);

    return NextResponse.json(
      { message: "Resume saved successfully", data: newResume },
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