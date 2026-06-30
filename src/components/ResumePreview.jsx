import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone, FaPrint } from "react-icons/fa";

const templateStyles = {
  classic: {
    wrapper: "bg-white text-slate-900",
    accent: "border-slate-900 text-slate-900",
    heading: "uppercase tracking-wide",
  },
  compact: {
    wrapper: "bg-white text-zinc-900 text-[13px]",
    accent: "border-emerald-700 text-emerald-800",
    heading: "uppercase tracking-wide",
  },
  modern: {
    wrapper: "bg-white text-neutral-900",
    accent: "border-cyan-700 text-cyan-800",
    heading: "",
  },
};

function splitLines(value = "") {
  return String(value)
    .split(/\n|•/)
    .map((item) => item.replace(/^-/, "").trim())
    .filter(Boolean);
}

function Section({ title, children, styles }) {
  return (
    <section className="mt-4 break-inside-avoid">
      <h3 className={`border-b pb-1 text-sm font-bold ${styles.accent} ${styles.heading}`}>
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function ResumePreview({ resumeData, template = "classic" }) {
  const styles = templateStyles[template] || templateStyles.classic;
  const personal = resumeData?.personalInformation || {};
  const skills = Array.isArray(resumeData?.skills) ? resumeData.skills : [];
  const experience = Array.isArray(resumeData?.experience) ? resumeData.experience : [];
  const education = Array.isArray(resumeData?.education) ? resumeData.education : [];
  const certifications = Array.isArray(resumeData?.certifications) ? resumeData.certifications : [];
  const projects = Array.isArray(resumeData?.projects) ? resumeData.projects : [];

  const contactItems = [
    personal.email && { icon: <FaEnvelope />, label: personal.email },
    personal.phoneNumber && { icon: <FaPhone />, label: personal.phoneNumber },
    personal.location && { icon: <FaMapMarkerAlt />, label: personal.location },
    personal.linkedIn && { icon: <FaLinkedin />, label: personal.linkedIn },
    personal.gitHub && { icon: <FaGithub />, label: personal.gitHub },
  ].filter(Boolean);

  return (
    <div className="w-full">
      <div className="mb-3 flex justify-end print:hidden">
        <button className="btn btn-outline btn-sm gap-2" onClick={() => window.print()}>
          <FaPrint />
          Print / Save PDF
        </button>
      </div>

      <article id="resume-preview" className={`mx-auto min-h-[1050px] w-full max-w-[816px] p-8 shadow print:shadow-none ${styles.wrapper}`}>
        <header className="text-center">
          <h1 className="text-3xl font-bold uppercase tracking-normal">
            {personal.fullName || "Your Name"}
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
            {contactItems.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1">
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>
        </header>

        <Section title="Professional Summary" styles={styles}>
          <p className="text-sm leading-6">{resumeData?.summary}</p>
        </Section>

        <Section title="Technical Skills" styles={styles}>
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, index) => (
              <span key={`${skill.title}-${index}`} className="border border-slate-300 px-2 py-1">
                {skill.title}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Professional Experience" styles={styles}>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={`${exp.company}-${index}`}>
                <div className="flex flex-wrap justify-between gap-2 text-sm font-semibold">
                  <span>{exp.jobTitle} | {exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <div className="text-xs text-slate-600">{exp.location}</div>
                <ul className="mt-2 list-disc pl-5 text-sm leading-6">
                  {splitLines(exp.responsibility).map((line, lineIndex) => (
                    <li key={lineIndex}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {projects.length > 0 && (
          <Section title="Projects" styles={styles}>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={`${project.title}-${index}`} className="text-sm">
                  <div className="font-semibold">{project.title}</div>
                  <p className="leading-6">{project.description}</p>
                  {Array.isArray(project.technologiesUsed) && project.technologiesUsed.length > 0 && (
                    <p className="text-xs text-slate-600">
                      Technologies: {project.technologiesUsed.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" styles={styles}>
            <div className="space-y-2 text-sm">
              {education.map((edu, index) => (
                <div key={`${edu.degree}-${index}`} className="flex flex-wrap justify-between gap-2">
                  <span>{edu.degree}, {edu.institution || edu.university}</span>
                  <span>{edu.graduationYear || edu.year}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications" styles={styles}>
            <ul className="list-disc pl-5 text-sm leading-6">
              {certifications.map((cert, index) => (
                <li key={`${cert.title || cert.name}-${index}`}>
                  {cert.title || cert.name}
                  {cert.issuingOrganization ? `, ${cert.issuingOrganization}` : ""}
                  {cert.year ? ` (${cert.year})` : ""}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>
    </div>
  );
}

export default ResumePreview;
