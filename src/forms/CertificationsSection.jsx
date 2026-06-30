import React from "react";

function CertificationsSection({
  certifications = [],
  updateArrayItem,
  addItem,
  removeItem,
}) {
  const safeCerts = Array.isArray(certifications) ? certifications : [];

  return (
    <div className="bg-base-100 shadow-md p-6">
      <h2 className="font-semibold text-xl mb-5">Certifications</h2>

      {safeCerts.length === 0 && (
        <p className="text-sm text-gray-400 mb-4">No certifications added</p>
      )}

      <div className="flex flex-col gap-3">
        {safeCerts.map((cert, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_auto] gap-3 bg-base-200 p-3">
            <input
              className="input input-bordered bg-white"
              placeholder="Certification"
              value={cert.title || cert.name || ""}
              onChange={(event) => updateArrayItem("certifications", index, "title", event.target.value)}
            />
            <input
              className="input input-bordered bg-white"
              placeholder="Issuing Organization"
              value={cert.issuingOrganization || ""}
              onChange={(event) => updateArrayItem("certifications", index, "issuingOrganization", event.target.value)}
            />
            <input
              className="input input-bordered bg-white"
              placeholder="Year"
              value={cert.year || ""}
              onChange={(event) => updateArrayItem("certifications", index, "year", event.target.value)}
            />
            <button className="btn btn-error btn-sm self-center" onClick={() => removeItem("certifications", index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-primary w-full mt-6"
        onClick={() => addItem("certifications", { title: "", issuingOrganization: "", year: "" })}
      >
        + Add Certification
      </button>
    </div>
  );
}

export default CertificationsSection;
