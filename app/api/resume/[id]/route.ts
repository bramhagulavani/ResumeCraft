import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const id = params.id?.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const resume = await Resume.findOne({ _id: id, userId }).lean();

    if (!resume) {
      return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...resume,
      _id: (resume._id as any).toString(),
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const id = params.id?.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deleted = await Resume.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return NextResponse.json(
        { message: "Resume not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Resume deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const id = params.id?.trim();

    const updated = await Resume.findOneAndUpdate(
      { _id: id, userId },
      body,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Resume not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { message: "Error updating resume" },
      { status: 500 }
    );
  }
}