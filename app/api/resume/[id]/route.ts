import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import mongoose from "mongoose";

// ── GET — fetch single resume (used by builder to prefill edit form) ──
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid resume ID format" },
        { status: 400 }
      );
    }

    const resume = await Resume.findById(id).lean() as any;

    if (!resume) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ...resume, _id: resume._id.toString() },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching resume", error: error.message },
      { status: 500 }
    );
  }
}

// ── PUT — update existing resume ──
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid resume ID format" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updated = await Resume.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ...updated.toObject(), _id: updated._id.toString() },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating resume", error: error.message },
      { status: 500 }
    );
  }
}

// ── DELETE — remove resume ──
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "Resume ID is required" },
        { status: 400 }
      );
    }

    const trimmedId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return NextResponse.json(
        { message: "Invalid resume ID format" },
        { status: 400 }
      );
    }

    const deletedResume = await Resume.findByIdAndDelete(trimmedId);

    if (!deletedResume) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Resume deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}