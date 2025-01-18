// src/presentation/components/cv/hooks/useCVForm.ts

import { useState } from 'react';
import {
  CVData,
  PersonalInfo,
  Education,
  Experience,
  Certification,
  Skill,}
  from "../components/profile/CV/CVTypes"
import { useAuthStore } from '../../application/state/authStore';

export const useCVForm = () => {
  const { user } = useAuthStore();
  const defaultSkills: Skill[] = [
    { title: 'Programming Languages: JavaScript, Python, Java' },
    { title: 'Frameworks: React, Angular, Node.js' },
    { title: 'Tools: Git, Docker, Jenkins' },
    { title: 'Database Management: SQL, MongoDB' },
    { title: 'Cloud Services: AWS, Azure' },
  ];

  const [cvData, setCVData] = useState<CVData>({
    personalInfo: null,
    summary: '',
    skills: user?.selectedSkills?.length ? user.selectedSkills.map(skill => ({ title: skill })) : defaultSkills,
    education: [],
    experience: [],
    certifications: [],
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setCVData((prev) => ({ ...prev, personalInfo: info }));
  };

  const updateSummary = (summary: string) => {
    setCVData((prev) => ({ ...prev, summary }));
  };

  const addEducation = (education: Education) => {
    setCVData((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }));
  };

  // Add similar methods for other sections...

  return {
    cvData,
    activeModal,
    preview,
    setActiveModal,
    setPreview,
    updatePersonalInfo,
    updateSummary,
    addEducation,
    // ... other methods
  };
};
