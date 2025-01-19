import React from "react";

const CVGenerator = ({ userData = {} }) => {
  const {
    name = "John Doe",
    contact = {
      email: "johndoe@example.com",
      phone: "+123 456 7890",
      linkedin: "linkedin.com/in/johndoe",
    },
    summary = "Results-driven software engineer with 5+ years of experience in full-stack development. Skilled in delivering scalable web applications, collaborating with cross-functional teams, and meeting deadlines. Passionate about leveraging technology to solve real-world problems.",
    skills = [
      "Programming Languages: JavaScript, Python, Java",
      "Frameworks: React, Angular, Node.js",
      "Tools: Git, Docker, Jenkins",
      "Database Management: SQL, MongoDB",
      "Cloud Services: AWS, Azure",
    ],
    experience = [
      {
        title: "Software Engineer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        period: "Jan 2020 - Present",
        responsibilities: [
          "Developed and maintained scalable web applications using React and Node.js.",
          "Collaborated with cross-functional teams to define, design, and ship new features.",
          "Improved application performance by 30% through code optimization.",
        ],
      },
      {
        title: "Junior Developer",
        company: "Innovatech Ltd.",
        location: "Austin, TX",
        period: "Jun 2017 - Dec 2019",
        responsibilities: [
          "Assisted in the development of client-facing web applications using Angular.",
          "Performed debugging and testing to ensure software quality and reliability.",
          "Contributed to team knowledge-sharing sessions and documentation efforts.",
        ],
      },
    ],
    education = {
      degree: "Bachelor of Science in Computer Science",
      university: "University of California, Berkeley",
      period: "2013 - 2017",
    },
    certifications = [
      { name: "Certified Kubernetes Administrator (CKA)" },
      { name: "Microsoft Certified: Azure Fundamentals" },
      { name: "Scrum Master Certified (SMC)" },
    ],
  } = userData;

  return (
    <div className="max-w-[210mm] mx-auto p-8 shadow-lg bg-white border border-gray-300">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-black">{name}</h1>
        <p className="text-center text-gray-600">
          Email: {contact.email} | Phone: {contact.phone} | LinkedIn:{" "}
          {contact.linkedin}
        </p>
      </header>

      {/* Summary Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-300 text-black pb-1 mb-4">
          Professional Summary
        </h2>
        <p className="text-sm text-gray-800 leading-relaxed">{summary}</p>
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-300 text-black     pb-1 mb-4">
          Key Skills
        </h2>
        <ul className="list-disc pl-5 text-sm text-gray-800">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Work Experience Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b text-black border-gray-300 pb-1 mb-4">
          Work Experience
        </h2>
        {experience.map((job, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">
              {job.company}, {job.location} | {job.period}
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-800 mt-2">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="mb-6">
        <h2 className="text-xl text-black font-semibold border-b border-gray-300 pb-1 mb-4">
          Education
        </h2>
        <div>
          <h3 className="font-semibold text-gray-900">{education.degree}</h3>
          <p className="text-sm text-gray-600">
            {education.university} | {education.period}
          </p>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="mb-6">
        <h2 className="text-xl text-black font-semibold border-b border-gray-300 pb-1 mb-4">
          Certifications
        </h2>
        <ul className="list-disc pl-5 text-sm text-gray-800">
          {certifications.map((cert, index) => (
            <li key={index}>{cert.name}</li>
          ))}
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="text-center text-gray-600 text-sm  pt-4">
        {/* References available upon request. */}
      </footer>
    </div>
  );
};

export default CVGenerator;
