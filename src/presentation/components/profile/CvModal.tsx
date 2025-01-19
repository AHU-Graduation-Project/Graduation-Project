import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useAuthStore } from '../../../application/state/authStore';
import CertificationModal from './CV/CVmodals/CertificationModal';
import { SkillModal } from './CV/CVmodals/SkillModal';
import { ExperienceModal } from './CV/CVmodals/ExperienceModal';
import { EducationModal } from './CV/CVmodals/EducationModal';
import CVForm from './CV/CVFrom';
import Card from '../UI/Card';
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

const CVSurveyForm = () => {
  const { user } = useAuthStore();

  const defaultSkills: Skill[] = [
    { title: 'Programming Languages: JavaScript, Python, Java' },
    { title: 'Frameworks: React, Angular, Node.js' },
    { title: 'Tools: Git, Docker, Jenkins' },
    { title: 'Database Management: SQL, MongoDB' },
    { title: 'Cloud Services: AWS, Azure' },
  ];
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [skills, setSkills] = useState<Skill[]>(
    user?.selectedSkills?.length ? user.selectedSkills : defaultSkills,
  );
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);

  // Generate PDF using html2pdf.js
  const generatePDF = () => {
    const element = document.getElementById('cv-container');
    if (element) {
      const options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().set(options).from(element).save();
    }
  };

  // Handle changes to the summary field
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  const handleDeleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };



  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CVForm
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            summary={summary}
            setSummary={setSummary}
            education={education}
            setEducation={setEducation}
            experience={experience}
            setExperience={setExperience}
            certifications={certifications}
            setCertifications={setCertifications}
            skills={skills}
            setSkills={setSkills}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            preview={preview}
            setPreview={setPreview}
            onSkillDelete={handleDeleteSkill}
            onExperienceDelete={(index) =>
              setExperience(experience.filter((_, i) => i !== index))
            }
            onCertificationDelete={(index) =>
              setCertifications(certifications.filter((_, i) => i !== index))
            }
            onEducationDelete={(index) =>
              setEducation(education.filter((_, i) => i !== index))
            }
            onSkillAdd={() => setActiveModal('skills')}
            onExperienceAdd={() => setActiveModal('experience')}
            onCertificationAdd={() => setActiveModal('certifications')}
            onEducationAdd={() => setActiveModal('education')}
            onSummaryChange={handleSummaryChange}
            onGeneratePDF={generatePDF}
          />
        </Card>

        {/* Modals */}

        <SkillModal
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          setPersonalInfo={setPersonalInfo}
          setSkills={setSkills}
        />
        <EducationModal
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          setEducation={setEducation}
          education={education}
        />
        <ExperienceModal
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          setExperience={setExperience}
          experience={experience}
        />
        <CertificationModal
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          setCertifications={setCertifications}
          certifications={certifications}
        />

        {/* {eucation Modal} */}
      </div>
    </div>
  );
};

export default CVSurveyForm;
