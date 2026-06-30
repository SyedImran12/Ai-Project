import React from "react";

function SkillsSection({ skills = [], updateArrayItem, addItem, removeItem }) {
  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <div className="bg-base-100 shadow-md p-6">
      <h2 className="font-semibold text-xl mb-5">Skills</h2>

      {safeSkills.length === 0 && (
        <p className="text-sm text-gray-400 mb-4">No skills added</p>
      )}

      <div className="flex flex-col gap-4">
        {safeSkills.map((skill, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_140px_auto] gap-3 bg-base-200 p-3">
            <input
              className="input input-bordered bg-white"
              placeholder="Enter skill, e.g. React, Java"
              value={skill.title || ""}
              onChange={(event) => updateArrayItem("skills", index, "title", event.target.value)}
            />

            <select
              className="select select-bordered bg-white"
              value={skill.level || 3}
              onChange={(event) => updateArrayItem("skills", index, "level", Number(event.target.value))}
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  Level {level}
                </option>
              ))}
            </select>

            <button className="btn btn-error btn-sm self-center" onClick={() => removeItem("skills", index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary w-full mt-6"
        onClick={() => addItem("skills", { title: "", level: 3 })}
      >
        + Add Skill
      </button>
    </div>
  );
}

export default SkillsSection;
