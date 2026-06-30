import React from "react";

function PersonalSection({ resumeData, setResumeData }) {
  const personal = resumeData.personalInformation || {};

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

  return (
   
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
  );
}

export default PersonalSection;