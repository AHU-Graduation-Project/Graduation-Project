export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface Skill {
  title: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string;
}

export interface Education {
  degree: string;
  institution: string;
  years: string;
}

export interface Certification {
  name: string;
  organization?: string;
  dateObtained?: string;
}

export interface CVData {
  personalInfo: PersonalInfo | null;
  summary: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
}
