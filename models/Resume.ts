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
    userId: {
      type: String,
      required: true,  // every resume must belong to a user
    },
    name: { type: String, required: true },
    email: String,
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