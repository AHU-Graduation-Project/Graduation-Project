import React from 'react';
import { Plus } from 'lucide-react';
import TextArea from '../../UI/TextArea';
import EntryCard from '../../UI/EntryCard';
import CVGenerator from '../CVGenerator';

interface PersonalInfo {
  fullast_name: string;
  email: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  title: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface CVFormProps {
  personalInfo: PersonalInfo | null;
  summary: string;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  certifications: Certification[];
  preview: boolean;
  onPersonalInfoClick: () => void;
  onSummaryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEducationDelete: (index: number) => void;
  onEducationAdd: () => void;
  onSkillDelete: (index: number) => void;
  onSkillAdd: () => void;
  onExperienceDelete: (index: number) => void;
  onExperienceAdd: () => void;
  onCertificationDelete: (index: number) => void;
  onCertificationAdd: () => void;
  onPreviewToggle: () => void;
  onGeneratePDF: () => void;
}

export const CVForm: React.FC<CVFormProps> = ({
  personalInfo,
  summary,
  education,
  skills,
  experience,
  certifications,
  preview,
  onPersonalInfoClick,
  onSummaryChange,
  onEducationDelete,
  onEducationAdd,
  onSkillDelete,
  onSkillAdd,
  onExperienceDelete,
  onExperienceAdd,
  onCertificationDelete,
  onCertificationAdd,
  onPreviewToggle,
  onGeneratePDF,
}) => {
  const cvData = {
    name: personalInfo?.fullName || 'John Doe',
    contact: {
      email: personalInfo?.email || 'johndoe@example.com',
      phone: personalInfo?.phone || '+123 456 7890',
      linkedin: personalInfo?.linkedin || 'linkedin.com/in/johndoe',
    },
    summary:
      summary ||
      'Results-driven professional with experience in delivering high-quality solutions...',
    skills: skills.map((skill) => skill),
    experience: experience.length
      ? experience.map(transformExperience)
      : [
          {
            title: 'Software Engineer',
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            period: 'Jan 2020 - Present',
            responsibilities: [
              'Developed and maintained scalable web applications using React and Node.js.',
              'Collaborated with cross-functional teams to define, design, and ship new features.',
              'Improved application performance by 30% through code optimization.',
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
          degree: 'Bachelor of Science in Computer Science',
          university: 'University of California, Berkeley',
          period: '2013 - 2017',
        },
    certifications: certifications.map((cert) => cert.name),
  };

  const formatCertificationData = (cert: Certification) => {
    const formattedData: Record<string, string> = {
      Certification: cert.name,
    };
    if (cert.organization) {
      formattedData['Organization'] = cert.organization;
    }
    if (cert.dateObtained) {
      formattedData['Date Obtained'] = new Date(
        cert.dateObtained,
      ).toLocaleDateString();
    }
    return formattedData;
  };

  // Transform experience data for the CV generator
  const transformExperience = (exp: Experience) => ({
    title: exp.title,
    company: exp.company,
    location: exp.location,
    period: exp.period,
    responsibilities: exp.responsibilities.split('\n').filter((r) => r.trim()),
  });

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <section>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Personal Information
        </h2>
        <div
          onClick={onPersonalInfoClick}
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

      {/* Professional Summary */}
      <section>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Professional Summary
        </h2>
        <TextArea
          label="Professional Summary"
          placeholder="Write 3-4 sentences about your professional identity..."
          value={summary}
          onChange={onSummaryChange}
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
              onDelete={() => onEducationDelete(index)}
            />
          ))}
          <button
            onClick={onEducationAdd}
            className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus size={20} />
            <span>Add Education</span>
          </button>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Skills</h2>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <EntryCard
              key={index}
              data={{ Skill: skill.title }}
              onDelete={() => onSkillDelete(index)}
            />
          ))}
          <button
            onClick={onSkillAdd}
            className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus size={20} />
            <span>Add Skill</span>
          </button>
        </div>
      </section>

      {/* Professional Experience */}
      <section>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <EntryCard
              key={index}
              data={exp}
              onDelete={() => onExperienceDelete(index)}
            />
          ))}
          <button
            onClick={onExperienceAdd}
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
              data={formatCertificationData(cert)}
              onDelete={() => onCertificationDelete(index)}
            />
          ))}
          <button
            onClick={onCertificationAdd}
            className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus size={20} />
            <span>Add Certification</span>
          </button>
        </div>
      </section>

      <section className="flex justify-center">
        <button
          onClick={onPreviewToggle}
          className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Preview CV
        </button>
      </section>

      {/* Preview and Download */}
      <div>
        {preview && (
          <div id="cv-container">
            <CVGenerator userData={cvData} />
          </div>
        )}

        <button
          onClick={onGeneratePDF}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default CVForm;
