import React from "react";
import toast from "react-hot-toast";
import CertificationsSection from "./CertificationsSection";
import PersonalSection from "./PersonalSection";
import SkillsSection from "./SkillsSection";
import ResumePreview from "../components/ResumePreview";

const templates = [
  { id: "classic", name: "Classic" },
  { id: "compact", name: "Compact" },
  { id: "modern", name: "Modern" },
];

function PersonalInfoForm({
  resumeData,
  setResumeData,
  selectedTemplate = "classic",
  setSelectedTemplate = () => {},
}) {
  if (!resumeData) return null;

  const experience = Array.isArray(resumeData.experience) ? resumeData.experience : [];
  const education = Array.isArray(resumeData.education) ? resumeData.education : [];
  const projects = Array.isArray(resumeData.projects) ? resumeData.projects : [];

  const updateArrayItem = (section, index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: (prev[section] || []).map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItem = (section, template) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), template],
    }));
  };

  const removeItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  return (
    <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-[minmax(360px,520px)_1fr] gap-6">
      <div className="space-y-6 print:hidden">
        <div className="bg-base-100 shadow p-5">
          <h2 className="font-bold text-lg mb-3">Template</h2>
          <div className="join w-full">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                className={`btn join-item flex-1 ${selectedTemplate === template.id ? "btn-primary" : "btn-outline"}`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        <PersonalSection resumeData={resumeData} setResumeData={setResumeData} />

        <div className="bg-base-100 shadow p-5">
          <h2 className="font-bold text-lg mb-3">Summary</h2>
          <textarea
            className="textarea textarea-bordered w-full min-h-32"
            value={resumeData.summary || ""}
            onChange={(event) =>
              setResumeData((prev) => ({
                ...prev,
                summary: event.target.value,
              }))
            }
            placeholder="Professional Summary"
          />
        </div>

        <SkillsSection
          skills={resumeData.skills}
          updateArrayItem={updateArrayItem}
          addItem={addItem}
          removeItem={removeItem}
        />

        <div className="bg-base-100 shadow p-5">
          <h2 className="font-bold text-lg mb-3">Experience</h2>

          {experience.length === 0 && (
            <p className="text-sm text-gray-400 mb-2">No experience added</p>
          )}

          {experience.map((exp, index) => (
            <div key={index} className="border border-base-300 p-3 mb-3">
              <input
                className="input input-bordered mb-2 w-full"
                placeholder="Job Title"
                value={exp.jobTitle || ""}
                onChange={(event) => updateArrayItem("experience", index, "jobTitle", event.target.value)}
              />
              <input
                className="input input-bordered mb-2 w-full"
                placeholder="Company"
                value={exp.company || ""}
                onChange={(event) => updateArrayItem("experience", index, "company", event.target.value)}
              />
              <input
                className="input input-bordered mb-2 w-full"
                placeholder="Location"
                value={exp.location || ""}
                onChange={(event) => updateArrayItem("experience", index, "location", event.target.value)}
              />
              <input
                className="input input-bordered mb-2 w-full"
                placeholder="Duration"
                value={exp.duration || ""}
                onChange={(event) => updateArrayItem("experience", index, "duration", event.target.value)}
              />
              <textarea
                className="textarea textarea-bordered w-full min-h-28"
                placeholder="Responsibilities, one bullet per line"
                value={exp.responsibility || ""}
                onChange={(event) => updateArrayItem("experience", index, "responsibility", event.target.value)}
              />
              <button className="btn btn-error btn-sm mt-2" onClick={() => removeItem("experience", index)}>
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

        <div className="bg-base-100 shadow p-5">
          <h2 className="font-bold text-lg mb-3">Education</h2>

          {education.length === 0 && (
            <p className="text-sm text-gray-400 mb-2">No education added</p>
          )}

          {education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
              <input
                className="input input-bordered"
                placeholder="Degree"
                value={edu?.degree || ""}
                onChange={(event) => updateArrayItem("education", index, "degree", event.target.value)}
              />
              <input
                className="input input-bordered"
                placeholder="Institution"
                value={edu?.institution || edu?.university || ""}
                onChange={(event) => updateArrayItem("education", index, "institution", event.target.value)}
              />
              <input
                className="input input-bordered"
                placeholder="Graduation Year"
                value={edu?.graduationYear || edu?.year || ""}
                onChange={(event) => updateArrayItem("education", index, "graduationYear", event.target.value)}
              />
            </div>
          ))}

          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={() =>
              addItem("education", {
                degree: "",
                institution: "",
                location: "",
                graduationYear: "",
              })
            }
          >
            + Add Education
          </button>
        </div>

        <div className="bg-base-100 shadow p-5">
          <h2 className="font-bold text-lg mb-3">Projects</h2>

          {projects.length === 0 && (
            <p className="text-sm text-gray-400 mb-2">No projects added</p>
          )}

          {projects.map((project, index) => (
            <div key={index} className="border border-base-300 p-3 mb-3">
              <input
                className="input input-bordered mb-2 w-full"
                placeholder="Project Title"
                value={project.title || ""}
                onChange={(event) => updateArrayItem("projects", index, "title", event.target.value)}
              />
              <textarea
                className="textarea textarea-bordered mb-2 w-full"
                placeholder="Project Description"
                value={project.description || ""}
                onChange={(event) => updateArrayItem("projects", index, "description", event.target.value)}
              />
              <input
                className="input input-bordered w-full"
                placeholder="Technologies, comma separated"
                value={Array.isArray(project.technologiesUsed) ? project.technologiesUsed.join(", ") : ""}
                onChange={(event) =>
                  updateArrayItem(
                    "projects",
                    index,
                    "technologiesUsed",
                    event.target.value.split(",").map((item) => item.trim()).filter(Boolean)
                  )
                }
              />
              <button className="btn btn-error btn-sm mt-2" onClick={() => removeItem("projects", index)}>
                Remove
              </button>
            </div>
          ))}

          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              addItem("projects", {
                title: "",
                description: "",
                technologiesUsed: [],
                githubLink: "",
              })
            }
          >
            + Add Project
          </button>
        </div>

        <CertificationsSection
          certifications={resumeData.certifications}
          updateArrayItem={updateArrayItem}
          addItem={addItem}
          removeItem={removeItem}
        />

        <div className="text-center">
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={() => toast("Resume is ready to print or save as PDF")}
          >
            Submit Resume
          </button>
        </div>
      </div>

      <div className="xl:sticky xl:top-4 xl:self-start">
        <ResumePreview resumeData={resumeData} template={selectedTemplate} />
      </div>
    </div>
  );
}

export default PersonalInfoForm;
