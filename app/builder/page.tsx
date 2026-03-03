"use client";

import { useState } from "react";

interface Experience {
  company: string;
  role: string;
  description: string;
}

export default function BuilderPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");

  const [experience, setExperience] = useState<Experience[]>([
    { company: "", role: "", description: "" },
  ]);

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { company: "", role: "", description: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };


  const handleSave = async () => {
  const res = await fetch("/api/resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      summary,
      experience,
    }),
  });

  if (res.ok) {
    alert("Resume saved successfully!");
  } else {
    alert("Error saving resume");
  }
};

  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>

      <div className="grid grid-cols-2 gap-8 h-[80vh]">
        {/* FORM SECTION */}
        <div className="bg-slate-900 rounded-2xl p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Resume Form</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <textarea
              placeholder="Professional Summary"
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            {/* EXPERIENCE SECTION */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Experience</h3>

              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-4 rounded-xl mb-4 space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceChange(index, "company", e.target.value)
                    }
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600"
                  />

                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) =>
                      handleExperienceChange(index, "role", e.target.value)
                    }
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600"
                  />

                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600"
                  />

                  {experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-sm text-rose-400 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addExperience}
                className="px-4 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition"
              >
                + Add Experience
              </button>
            </div>
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="bg-white text-black rounded-2xl p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold">
              {name || "Your Name"}
            </h3>

            <p>{email || "your@email.com"}</p>

            <p className="mt-4 whitespace-pre-line">
              {summary || "Your professional summary will appear here..."}
            </p>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Experience</h4>

              {experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <div className="font-semibold">
                    {exp.role || "Role"}{" "}
                    {exp.company && `- ${exp.company}`}
                  </div>
                  <div className="text-sm whitespace-pre-line">
                    {exp.description}
                  </div>
                </div>
              ))}
              <button
  onClick={handleSave}
  className="mt-6 w-full px-4 py-3 bg-emerald-600 rounded-xl hover:bg-emerald-500 transition font-semibold"
>
  Save Resume
</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}