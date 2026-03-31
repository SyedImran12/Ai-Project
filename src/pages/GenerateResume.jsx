import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRobot, FaMagic, FaTrash } from "react-icons/fa";
import { generateResume } from "../api/ResumeService";
import PersonalInfoForm from "./PersonalInfoForm";


function GenerateResume() {
  const [userDescription, setUserDescription] = useState("");
  const maxLength = 1000;
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

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
  skills: data?.skills || [],
  experience: data?.experience || [],
  education: data?.education || [],
  certifications: data?.certifications || [],
  projects: data?.projects || [],
  achievements: data?.achievements || [],
  languages: data?.languages || [],
  interests: data?.interests || [],
});

  const handleGenerate = async () => {
    if (!userDescription || userDescription.trim().length < 50) {
      toast.error("Please enter at least 50 characters");
      return;
    }
    toast.success("Generating resume...");
    try {
      setLoading(true);

      const resume = await generateResume(userDescription);

      setResumeData(normalizeResume(resume));
      console.log("Generated Resume:", resume);

      toast.success("Resume generated successfully!", {
        duration: 3000,
        position: "top-center",
      });

    } catch (error) {
      toast.error("Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUserDescription("");
  };

  function showForm() {
    return (
      <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-base-200 px-4">

        {/* Step 1: Show Input */}
        {!resumeData && ShowInputField()}

        {/* Step 2: Show Form */}
        {resumeData && (
          <PersonalInfoForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}

      </div>
    );
  }

  function ShowInputField() {
    return <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-8">

      {/* Header */}
      <div className="text-center mb-6">
        <FaRobot className="text-4xl text-primary mx-auto mb-2" />
        <h1 className="text-3xl font-bold">
          AI Resume Generator
        </h1>
        <p className="text-gray-500 mt-2">
          Describe yourself and let AI build your resume
        </p>
      </div>

      {/* Text Area */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">
            Your Description
          </span>
          <span className="label-text-alt">
            {userDescription.length}/{maxLength}
          </span>
        </label>

        <textarea
          className="textarea textarea-bordered h-40 resize-none focus:outline-primary"
          placeholder="Example: I am a Java developer with 5 years of experience in Spring Boot, microservices, and cloud technologies..."
          value={userDescription}
          maxLength={maxLength}
          onChange={(e) => setUserDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Helper Tips */}
      <div className="text-sm text-gray-500 mt-3">
        💡 Include: skills, experience, projects, achievements
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">

        <button
          disabled={loading}
          onClick={handleGenerate}
          className="btn btn-primary flex items-center gap-2"
        >
          {loading && <span className="loading loading-spinner"></span>}
          <FaMagic />
          Generate Resume
        </button>

        <button
          onClick={handleClear}
          className="btn btn-outline flex items-center gap-2"
        >
          <FaTrash />
          Clear
        </button>

      </div>

    </div>
  }


  return (
    <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-base-200 px-4">

    {/* Step 1: Input */}
    {!resumeData && ShowInputField()}

    {/* Step 2: Form */}
    {resumeData && (
      <PersonalInfoForm
        resumeData={resumeData}
        setResumeData={setResumeData}
      />
    )}

  </div>
  );
}

export default GenerateResume;