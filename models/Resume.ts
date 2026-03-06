import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    summary: String,

    skills: [String],

    education: [
      {
        college: String,
        degree: String,
        year: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        description: String,
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        tech: String,
      },
    ],
    template: {
  type: String,
  default: "classic"
}
  },
  { timestamps: true }
);

export default mongoose.models.Resume ||
  mongoose.model("Resume", ResumeSchema);