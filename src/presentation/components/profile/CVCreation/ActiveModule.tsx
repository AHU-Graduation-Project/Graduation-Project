import CVGenerator from "../CVGenerator";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ActiveModule = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [skills, setSkills] = useState<Skill[]>([]);

  const transformExperience = (exp: Experience) => ({
    title: exp.title,
    company: exp.company,
    location: exp.location,
    period: exp.period,
    responsibilities: exp.responsibilities.split("\n").filter((r) => r.trim()),
  });

  const cvData = {
    name: personalInfo?.fullName || "John Doe",
    contact: {
      email: personalInfo?.email || "johndoe@example.com",
      phone: personalInfo?.phone || "+123 456 7890",
      linkedin: personalInfo?.linkedin || "linkedin.com/in/johndoe",
    },
    summary:
      summary ||
      "Results-driven professional with experience in delivering high-quality solutions...",
    skills: skills.map((skill) => skill),
    experience: experience.length
      ? experience.map(transformExperience)
      : [
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
        ],
    education: education.length
      ? {
          degree: education[0].degree,
          university: education[0].institution,
          period: education[0].years,
        }
      : {
          degree: "Bachelor of Science in Computer Science",
          university: "University of California, Berkeley",
          period: "2013 - 2017",
        },
    certifications: certifications.map((cert) => cert.name),
  };

  const downloadPDF = async () => {
    const element = document.getElementById("cv-container");
    if (!element) return;

    // Capture the CVGenerator content
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    // Create a PDF and add the captured image
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("CV.pdf");
  };

  return (
    <div>
      <div id="cv-container">
        <CVGenerator userData={cvData} />
      </div>
      <button
        onClick={downloadPDF}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default ActiveModule;
