import { useState } from "react";
import { Phone, Plus, X } from "lucide-react";
import html2pdf from "html2pdf.js";
import CVGenerator from "./CVGenerator";

const TextArea = ({ label, value, onChange, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 dark:text-gray-200">
      {label}
    </label>
    <textarea
      {...props}
      className="w-full p-2 border rounded-md h-24 bg-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      value={value}
      onChange={onChange}
    />
  </div>
);
// Modal component remains the same
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">{title}</h3>
        {children}
      </div>
    </div>
  );
};

const Card = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    {children}
  </div>
);

const EntryCard = ({ data, onDelete }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md relative">
    <button
      onClick={onDelete}
      className="absolute top-2 right-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
    >
      <X size={20} />
    </button>
    {Object.entries(data).map(([key, value]) => (
      <div key={key} className="mb-2 dark:text-gray-200">
        <span className="font-medium">{key}: </span>
        <span>{value}</span>
      </div>
    ))}
  </div>
);

const Button = ({ onClick, children, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
  >
    {children}
  </button>
);

const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 dark:text-gray-200">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-2 border rounded-md bg-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
  </div>
);

const CVSurveyForm = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [summary, setSummary] = useState(""); // Summary state
  const [skills, setSkills] = useState([]);
  const [activeModal, setActiveModal] = useState(null);

  const generatePDF = () => {
    const element = document.getElementById("cv-container");
    const opt = {
      margin: 1,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };
  // Transform experience data to match CVGenerator format
  const transformExperience = (exp) => ({
    title: exp.title,
    company: exp.company,
    location: exp.location,
    period: exp.period,
    responsibilities: exp.responsibilities.split("\n").filter((r) => r.trim()),
  });

  const cvData = {
    name: personalInfo?.fullast_name || "John Doe",
    contact: {
      email: personalInfo?.email || "johndoe@example.com",
      phone: personalInfo?.phone || "+123 456 7890",
      linkedin: personalInfo?.linkedin || "linkedin.com/in/johndoe",
    },
    summary:
      summary ||
      "Results-driven professional with experience in delivering high-quality solutions...",
    skills: skills.length
      ? skills
      : [
          "Programming Languages: JavaScript, Python, Java",
          "Frameworks: React, Angular, Node.js",
          "Tools: Git, Docker, Jenkins",
          "Database Management: SQL, MongoDB",
          "Cloud Services: AWS, Azure",
        ],
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

  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <form className="space-y-8">
            {/* Personal Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Personal Information
              </h2>
              <div
                onClick={() => setActiveModal("personal")}
                className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400"
              >
                {personalInfo ? (
                  <div className="dark:text-gray-200">
                    <h3 className="font-medium">{personalInfo.fullast_name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {personalInfo.email}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center text-gray-500 dark:text-gray-400">
                    <Plus size={20} />
                    <span>Add Personal Information</span>
                  </div>
                )}
              </div>
            </section>

            {/* About Me */}
            <section>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Professional Summary
              </h2>
              <TextArea
                label="Professional Summary"
                placeholder="Write 3-4 sentences about your professional identity, core strengths, career goals, and what makes you unique in your field..."
                value={summary}
                onChange={handleSummaryChange}
              />
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <EntryCard
                    key={index}
                    data={edu}
                    onDelete={() =>
                      setEducation(education.filter((_, i) => i !== index))
                    }
                  />
                ))}
                <button
                  onClick={() => setActiveModal("education")}
                  className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Plus size={20} />
                  <span>Add Education</span>
                </button>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <EntryCard
                    key={index}
                    data={exp}
                    onDelete={() =>
                      setExperience(experience.filter((_, i) => i !== index))
                    }
                  />
                ))}
                <button
                  onClick={() => setActiveModal("experience")}
                  className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Plus size={20} />
                  <span>Add Experience</span>
                </button>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <EntryCard
                    key={index}
                    data={cert}
                    onDelete={() =>
                      setCertifications(
                        certifications.filter((_, i) => i !== index)
                      )
                    }
                  />
                ))}
                <button
                  onClick={() => setActiveModal("certification")}
                  className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Plus size={20} />
                  <span>Add Certification</span>
                </button>
              </div>
            </section>

            {/* Preview and Download */}
            <div>
              <div id="cv-container">
                <CVGenerator userData={cvData} />
              </div>
              <button
                onClick={generatePDF}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download PDF
              </button>
            </div>
          </form>
        </Card>
        {/* Modals */}
        <Modal
          isOpen={activeModal === "personal"}
          onClose={() => setActiveModal(null)}
          title="Personal Information"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              setPersonalInfo({
                fullast_name: formData.get("fullast_name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                linkedin: formData.get("linkedin"),
              });
              setActiveModal(null);
            }}
          >
            <Input label="Full Name" name="fullast_name" type="text" required />
            <Input label="Email" name="email" type="email" required />
            <Input label="Phone" name="phone" type="tel" required />
            <Input label="LinkedIn" name="linkedin" type="text" required />
            <Button type="submit">Save</Button>
          </form>
        </Modal>

        <Modal
          isOpen={activeModal === "education"}
          onClose={() => setActiveModal(null)}
          title="Add Education"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              setEducation([
                ...education,
                {
                  degree: formData.get("degree"),
                  institution: formData.get("institution"),
                  years: formData.get("years"),
                },
              ]);
              setActiveModal(null);
            }}
          >
            <Input label="Degree" name="degree" type="text" required />
            <Input
              label="Institution"
              name="institution"
              type="text"
              required
            />
            <Input
              label="Period"
              name="years"
              type="text"
              placeholder="2013 - 2017"
              required
            />
            <Button type="submit">Add Education</Button>
          </form>
        </Modal>

        <Modal
          isOpen={activeModal === "experience"}
          onClose={() => setActiveModal(null)}
          title="Add Experience"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              setExperience([
                ...experience,
                {
                  title: formData.get("title"),
                  company: formData.get("company"),
                  period: formData.get("period"),
                  location: formData.get("location"),
                  responsibilities: formData.get("responsibilities"),
                },
              ]);
              setActiveModal(null);
            }}
          >
            <Input label="Job Title" name="title" type="text" required />
            <Input label="Company Name" name="company" type="text" required />
            <Input
              label="Period"
              name="period"
              type="text"
              placeholder="Jan 2020 - Present"
              required
            />
            <Input label="Location" name="location" type="text" required />
            <TextArea
              label="Key Responsibilities"
              name="responsibilities"
              placeholder="Enter each responsibility on a new line"
              required
            />
            <Button type="submit">Add Experience</Button>
          </form>
        </Modal>

        <Modal
          isOpen={activeModal === "certification"}
          onClose={() => setActiveModal(null)}
          title="Add Certification"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              setCertifications([
                ...certifications,
                {
                  name: formData.get("name"),
                  organization: formData.get("organization"),
                  dateObtained: formData.get("dateObtained"),
                },
              ]);
              setActiveModal(null);
            }}
          >
            <Input
              label="Certification Name"
              name="name"
              type="text"
              required
            />
            <Input
              label="Issuing Organization"
              name="organization"
              type="text"
              required
            />
            <Input
              label="Date Obtained"
              name="dateObtained"
              type="date"
              required
            />
            <Button type="submit">Add Certification</Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CVSurveyForm;
