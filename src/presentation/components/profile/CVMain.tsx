import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SummaryForm } from "./CVCreation/SummaryForm";
import { SkillsForm } from "./CVCreation/SkillsForm";
import { PersonalInfoForm } from "./CVCreation/PersonalInfoForm";
import { CertificationForm } from "./CVCreation/CertificationForm";
import { ExperienceForm } from "./CVCreation/ExperienceForm";
import { EducationForm } from "./CVCreation/EducationForm";
import CVGenerator from "./CVGenerator";
import Modal from "./CVCreation/Modal";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
}

interface Skill {
  title: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string;
}

interface Education {
  degree: string;
  institution: string;
  years: string;
}

interface Certification {
  name: string;
  organization?: string;
  dateObtained?: string;
}

const defaultSkills: Skill[] = [
  { title: "Programming Languages: JavaScript, Python, Java" },
  { title: "Frameworks: React, Angular, Node.js" },
  { title: "Tools: Git, Docker, Jenkins" },
  { title: "Database Management: SQL, MongoDB" },
  { title: "Cloud Services: AWS, Azure" },
];
const defaultCertifi: Certification[] = [
  { name: "Udemy" },
  { name: "python" },
  { name: "life" },
];
export const CVForm: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certifications, setCertifications] =
    useState<Certification[]>(defaultCertifi);
  const [summary, setSummary] = useState<string>("");
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [activeTab, setActiveTab] = useState("personal");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    skills: skills.map((skill) => skill.title),
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
    certifications: certifications.map((cert) => cert),
  };

  const downloadPDF = async () => {
    const element = document.getElementById("cv-container");
    if (!element) return;

    // Capture the CV content
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    // Create and save the PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("CV.pdf");
  };

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "summary", label: "Summary" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certifications" },
  ];

  return (
    <div className="max-w-4xl min-h-96 mx-auto p-4">
      <div className="mb-6">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-theme text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-transparent dark:bg-slate-800 rounded-lg shadow-sm border p-6">
        {activeTab === "personal" && (
          <PersonalInfoForm
            onSubmit={setPersonalInfo}
            initialData={personalInfo}
          />
        )}
        {activeTab === "summary" && (
          <SummaryForm
            onSubmit={setSummary}
            summary={summary}
            setSummary={setSummary}
          />
        )}
        {activeTab === "education" && (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <EducationForm
                key={index}
                initialData={edu}
                index={index}
                onSubmit={(newEdu) =>
                  setEducation(
                    education.map((e, i) => (i === index ? newEdu : e))
                  )
                }
                onDelete={(indexToRemove) =>
                  setEducation(education.filter((_, i) => i !== indexToRemove))
                }
              />
            ))}
            <EducationForm
              onSubmit={(newEdu) => setEducation([...education, newEdu])}
            />
          </div>
        )}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <ExperienceForm
                key={index}
                initialData={exp}
                index={index}
                // onDelete={onDeleteHandler}
                onSubmit={(newExp) =>
                  setExperience(
                    experience.map((e, i) => (i === index ? newExp : e))
                  )
                }
                onDelete={(indexToRemove) =>
                  setExperience(
                    experience.filter((_, i) => i !== indexToRemove)
                  )
                }
              />
            ))}
            <ExperienceForm
              onSubmit={(newExp) => setExperience([...experience, newExp])}
            />
          </div>
        )}
        {activeTab === "skills" && (
          <SkillsForm skills={skills} setSkills={setSkills} />
        )}
        {activeTab === "certifications" && (
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <CertificationForm
                key={index}
                initialData={cert}
                index={index}
                onSubmit={(newCert) =>
                  setCertifications(
                    certifications.map((c, i) => (i === index ? newCert : c))
                  )
                }
                onDelete={(indexToRemove) =>
                  setCertifications(
                    certifications.filter((_, i) => i !== indexToRemove)
                  )
                }
              />
            ))}
            <CertificationForm
              onSubmit={(newCert) =>
                setCertifications([...certifications, newCert])
              }
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-theme text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          Preview CV
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div id="cv-container">
          <CVGenerator userData={cvData} />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={downloadPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          >
            Download as PDF
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CVForm;