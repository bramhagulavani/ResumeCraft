import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ResumeView({ params }: Props) {
  // In Next.js 13+/14+ App Router, params is a Promise — must be awaited
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <div className="p-10">Invalid Resume ID</div>;
  }

  await connectToDatabase();

  const resume = await Resume.findById(id).lean() as any;

  if (!resume) {
    return <div className="p-10">Resume not found</div>;
  }

return (
  <div className="max-w-3xl mx-auto bg-white text-black p-10 rounded-lg shadow-lg mt-10">

    {/* Name */}
    <h1 className="text-3xl font-bold">{resume.name}</h1>

    {/* Email */}
    <p className="text-gray-600 mt-1">{resume.email}</p>

    <hr className="my-6" />

    {/* Summary */}
    <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
    <p className="text-gray-700">{resume.summary}</p>

    {/* Skills */}
    {resume.skills?.length > 0 && (
      <>
        <h2 className="text-xl font-semibold mt-6 mb-2">Skills</h2>
        <ul className="list-disc ml-6 text-gray-700">
          {resume.skills.map((skill: string, i: number) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </>
    )}

    {/* Experience */}
    {resume.experience?.length > 0 && (
      <>
        <h2 className="text-xl font-semibold mt-6 mb-2">Experience</h2>
        {resume.experience.map((exp: any, i: number) => (
          <div key={i} className="mb-3">
            <p className="font-semibold">{exp.role}</p>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-gray-700 text-sm">{exp.description}</p>
          </div>
        ))}
      </>
    )}

    {/* Education */}
    {resume.education?.length > 0 && (
      <>
        <h2 className="text-xl font-semibold mt-6 mb-2">Education</h2>
        {resume.education.map((edu: any, i: number) => (
          <div key={i}>
            <p className="font-semibold">{edu.degree}</p>
            <p className="text-gray-600">{edu.college}</p>
            <p className="text-gray-500 text-sm">{edu.year}</p>
          </div>
        ))}
      </>
    )}

    {/* Projects */}
    {resume.projects?.length > 0 && (
      <>
        <h2 className="text-xl font-semibold mt-6 mb-2">Projects</h2>
        {resume.projects.map((proj: any, i: number) => (
          <div key={i} className="mb-3">
            <p className="font-semibold">{proj.title}</p>
            <p className="text-gray-700 text-sm">{proj.description}</p>
            <p className="text-gray-500 text-sm">{proj.tech}</p>
          </div>
        ))}
      </>
    )}

  </div>
);
}