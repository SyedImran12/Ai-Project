import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBriefcase, FaFileAlt, FaMagic, FaRobot, FaTrash } from "react-icons/fa";
import { generateResume } from "../api/ResumeService";
import PersonalInfoForm from "../forms/PersonalInfoForm";

const templates = [
  { id: "classic", name: "Classic", description: "Single-column ATS layout" },
  { id: "compact", name: "Compact", description: "Dense layout for senior roles" },
  { id: "modern", name: "Modern", description: "Clean accent headings" },
];

function GenerateResume() {
  const [userDescription, setUserDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const maxLength = 2500;
  // const profileMaxLength = 10000;
  // const jobDescriptionMaxLength = 8000;

  const normalizeResume = (data) => ({
    personalInformation: {
      fullName: data?.personalInformation?.fullName || "",
      email: data?.personalInformation?.email || "",
      phoneNumber: data?.personalInformation?.phoneNumber || "",
      location: data?.personalInformation?.location || "",
      linkedIn: data?.personalInformation?.linkedIn || "",
      gitHub: data?.personalInformation?.gitHub || "",
      portfolio: data?.personalInformation?.portfolio || "",
    },
    summary: data?.summary || "",
    skills: Array.isArray(data?.skills) ? data.skills : [],
    experience: Array.isArray(data?.experience) ? data.experience : [],
    education: Array.isArray(data?.education) ? data.education : [],
    certifications: Array.isArray(data?.certifications) ? data.certifications : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    achievements: Array.isArray(data?.achievements) ? data.achievements : [],
    languages: Array.isArray(data?.languages) ? data.languages : [],
    interests: Array.isArray(data?.interests) ? data.interests : [],
  });

  const handleGenerate = async () => {
    if (userDescription.trim().length < 20) {
      toast.error("Please enter your profile details");
      return;
    }

    if (jobDescription.trim().length < 20) {
      toast.error("Please paste the job description");
      return;
    }

    try {
      setLoading(true);
      toast.success("Generating ATS resume...");

      const resume = await generateResume({
        userDescription,
        jobDescription,
        template: selectedTemplate,
      });

      setResumeData(normalizeResume(resume));
      toast.success("Resume generated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUserDescription("");
    setJobDescription("");
    setResumeData(null);
  };

  const showInputField = () => (
    <div className="w-full max-w-5xl bg-base-100 shadow-xl p-6 md:p-8">
      <div className="text-center mb-6">
        <FaRobot className="text-4xl text-primary mx-auto mb-2" />
        <h1 className="text-3xl font-bold">AI Resume Generator</h1>
        <p className="text-gray-500 mt-2">
          Paste your profile and the job description to build a targeted ATS-friendly resume
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold inline-flex items-center gap-2">
              <FaFileAlt />
              Your Profile
            </span>
            <span className="label-text-alt">{userDescription.length}/{maxLength}</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-56 resize-none focus:outline-primary"
            placeholder="Example: I am a Java developer with 5 years of experience in Spring Boot, REST APIs, microservices, AWS, MySQL, React..."
            value={userDescription}
            maxLength={maxLength}
            onChange={(event) => setUserDescription(event.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold inline-flex items-center gap-2">
              <FaBriefcase />
              Job Description
            </span>
            <span className="label-text-alt">{jobDescription.length}/{maxLength}</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-56 resize-none focus:outline-primary"
            placeholder="Paste the complete job description including required skills, responsibilities, and qualifications..."
            value={jobDescription}
            maxLength={maxLength}
            onChange={(event) => setJobDescription(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="label">
          <span className="label-text font-semibold">Template</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {templates.map((template) => (
            <button
              type="button"
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`border p-4 text-left transition ${
                selectedTemplate === template.id
                  ? "border-primary bg-primary/10"
                  : "border-base-300 hover:border-primary"
              }`}
            >
              <span className="block font-semibold">{template.name}</span>
              <span className="text-sm text-gray-500">{template.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Tip: include real metrics, projects, achievements, tools, and domain keywords for stronger ATS matching.
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button disabled={loading} onClick={handleGenerate} className="btn btn-primary flex items-center gap-2">
          {loading && <span className="loading loading-spinner" />}
          <FaMagic />
          Generate Resume
        </button>

        <button onClick={handleClear} className="btn btn-outline flex items-center gap-2">
          <FaTrash />
          Clear
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col gap-3 items-center bg-base-200 px-4 py-10">
      {!resumeData && showInputField()}

      {resumeData && (
        <PersonalInfoForm
          resumeData={resumeData}
          setResumeData={setResumeData}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}
    </div>
  );
}

export default GenerateResume;
