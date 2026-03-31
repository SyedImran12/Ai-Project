import React from 'react'
import { Link } from 'react-router';

const features = [
  {
    icon: "🤖",
    title: "AI Generated Content",
    desc: "Generate resume content automatically",
  },
  {
    icon: "⚡",
    title: "Instant Resume",
    desc: "Create resume within seconds",
  },
  {
    icon: "🎯",
    title: "ATS Friendly",
    desc: "Optimized for job portals",
  },
];

const steps = [
  { icon: "📝", title: "Enter Details", desc: "Provide your information" },
  { icon: "🤖", title: "AI Generates", desc: "AI builds your resume" },
  { icon: "📄", title: "Download", desc: "Get PDF instantly" },
];

function LandingPage() {
  return (
    <>
    {/* Hero Section */}
     <section className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.freepik.com/free-vector/resume-concept-illustration_114360-2761.jpg"
          className="max-w-md rounded-lg shadow-2xl"
          alt="resume"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Build Your Resume in Seconds 🚀
          </h1>
          <p className="py-6 text-lg">
            Describe yourself and let AI generate a professional resume instantly.
          </p>
          <Link to="/generate-resume" className="btn btn-primary btn-lg">
            Create My Resume
          </Link>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Features</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="card bg-base-200 p-6 text-center shadow">
            <div className="text-4xl">{f.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{f.title}</h3>
            <p className="text-gray-500 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

{/* How It Works Section */}
    <section className="bg-base-200 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-12">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <div key={i}>
            <div className="text-4xl mb-4">{s.icon}</div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>


    {/* CTA Section */}
        <section className="bg-primary text-primary-content py-16 text-center">
      <h2 className="text-3xl font-bold">
        Start Building Your Resume Today
      </h2>
      <Link to="/generate-resume" className="btn btn-secondary mt-6">
        Get Started Free
      </Link>
    </section>

{/* Footer Section */}
{/* <footer className="footer p-10 bg-base-200 text-base-content">
      <nav>
        <h6 className="footer-title">Product</h6>
        <a className="link link-hover">Features</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About</a>
      </nav>
    </footer> */}
    </>
  )
}

export default LandingPage
