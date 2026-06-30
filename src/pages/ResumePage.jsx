import React, { useState } from "react";
import PersonalInfoForm from "../forms/PersonalInfoForm";

function ResumePage() {

  const [resumeData, setResumeData] = useState({
    personalInformation: {},
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    achievements: [],
    languages: [],
    interests: [],
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-200 px-4 py-10">

    <div className="w-full max-w-3xl">
      <PersonalInfoForm
        resumeData={resumeData}
        setResumeData={setResumeData}
      />
    </div>

  </div>
  );
}

export default ResumePage;