import mongoose, { Schema, models } from "mongoose";

const ExperienceSchema = new Schema({
  company: String,
  role: String,
  description: String,
});

const EducationSchema = new Schema({
  college: String,
  degree: String,
  year: String,
});

const ProjectSchema = new Schema({
  title: String,
  description: String,
  tech: String,
});

const ResumeSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: String,
    phone: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    jobTitle: { type: String, default: "" },
    summary: String,
    skills: [String],
    experience: [ExperienceSchema],
    education: [EducationSchema],
    projects: [ProjectSchema],
    template: { type: String, default: "classic" },
  },
  { timestamps: true }
);

const Resume = models.Resume || mongoose.model("Resume", ResumeSchema);
export default Resume;