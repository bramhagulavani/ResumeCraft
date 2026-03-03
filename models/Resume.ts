import mongoose, { Schema, models } from "mongoose";

const ExperienceSchema = new Schema({
  company: String,
  role: String,
  description: String,
});

const ResumeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    summary: String,
    experience: [ExperienceSchema],
  },
  { timestamps: true }
);

const Resume =
  models.Resume || mongoose.model("Resume", ResumeSchema);

export default Resume;