import React from "react";

function PersonalInfoForm({ resumeData, setResumeData }) {

  // 🔒 Guard (prevents crash before data loads)
  if (!resumeData) return null;

  const personal = resumeData.personalInformation || {};
  const skills = resumeData.skills || [];
  const experience = resumeData.experience || [];

  // 🔹 Update personal info
  const handleChange = (e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      personalInformation: {
        ...prev.personalInformation,
        [name]: value,
      },
    }));
  };

  // 🔹 Generic array update (IMMUTABLE FIX)
  const updateArrayItem = (section, index, field, value) => {
    setResumeData((prev) => {
      const updated = prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );

      return {
        ...prev,
        [section]: updated,
      };
    });
  };

  // 🔹 Add item (SAFE DEFAULT)
  const addItem = (section, template) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), template],
    }));
  };

  // 🔹 Remove item
  const removeItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">

      {/* 🔹 PERSONAL INFO */}
      <div className="card bg-base-100 shadow p-5">
        <h2 className="font-bold text-lg mb-3">Personal Info</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {[
            { key: "fullName", label: "Full Name" },
            { key: "email", label: "Email" },
            { key: "phoneNumber", label: "Phone Number" },
            { key: "location", label: "Location" },
            { key: "linkedIn", label: "LinkedIn" },
            { key: "gitHub", label: "GitHub" },
            { key: "portfolio", label: "Portfolio" },
          ].map(({ key, label }) => (
            <input
              key={key}
              type="text"
              name={key}
              value={personal[key] || ""}
              onChange={handleChange}
              placeholder={label}
              className="input input-bordered w-full"
            />
          ))}

        </div>
      </div>

      {/* 🔹 SKILLS */}
      <div className="card bg-base-100 shadow p-5">
        <h2 className="font-bold text-lg mb-3">Skills</h2>

        {skills.length === 0 && (
          <p className="text-sm text-gray-400 mb-2">No skills added</p>
        )}

        {skills.map((skill, index) => (
          <div key={index} className="flex gap-2 mb-2">

            <input
              className="input input-bordered w-1/2"
              placeholder="Skill"
              value={skill.title || ""}
              onChange={(e) =>
                updateArrayItem("skills", index, "title", e.target.value)
              }
            />

            <input
              className="input input-bordered w-1/2"
              placeholder="Level"
              value={skill.level || ""}
              onChange={(e) =>
                updateArrayItem("skills", index, "level", e.target.value)
              }
            />

            <button
              className="btn btn-error btn-sm"
              onClick={() => removeItem("skills", index)}
            >
              ✕
            </button>

          </div>
        ))}

        <button
          className="btn btn-primary btn-sm mt-2"
          onClick={() =>
            addItem("skills", { title: "", level: "" })
          }
        >
          + Add Skill
        </button>
      </div>

      {/* 🔹 EXPERIENCE */}
      <div className="card bg-base-100 shadow p-5">
        <h2 className="font-bold text-lg mb-3">Experience</h2>

        {experience.length === 0 && (
          <p className="text-sm text-gray-400 mb-2">No experience added</p>
        )}

        {experience.map((exp, index) => (
          <div key={index} className="border p-3 mb-3 rounded">

            <input
              className="input input-bordered mb-2 w-full"
              placeholder="Job Title"
              value={exp.jobTitle || ""}
              onChange={(e) =>
                updateArrayItem("experience", index, "jobTitle", e.target.value)
              }
            />

            <input
              className="input input-bordered mb-2 w-full"
              placeholder="Company"
              value={exp.company || ""}
              onChange={(e) =>
                updateArrayItem("experience", index, "company", e.target.value)
              }
            />

            <input
              className="input input-bordered mb-2 w-full"
              placeholder="Location"
              value={exp.location || ""}
              onChange={(e) =>
                updateArrayItem("experience", index, "location", e.target.value)
              }
            />

            <input
              className="input input-bordered mb-2 w-full"
              placeholder="Duration"
              value={exp.duration || ""}
              onChange={(e) =>
                updateArrayItem("experience", index, "duration", e.target.value)
              }
            />

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Responsibility"
              value={exp.responsibility || ""}
              onChange={(e) =>
                updateArrayItem("experience", index, "responsibility", e.target.value)
              }
            />

            <button
              className="btn btn-error btn-sm mt-2"
              onClick={() => removeItem("experience", index)}
            >
              Remove
            </button>

          </div>
        ))}

        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            addItem("experience", {
              jobTitle: "",
              company: "",
              location: "",
              duration: "",
              responsibility: "",
            })
          }
        >
          + Add Experience
        </button>
      </div>

    </div>
  );
}

export default PersonalInfoForm;