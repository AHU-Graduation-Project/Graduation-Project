export class UserEntity {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  profilePicture: string;
  position: string;
  level: string;
  aboutme: string;
  country: string;
  isEmailConformed: boolean;
  selectedRoadmaps: string[];
  completedRoadmaps: string[];
  generatedRoadmaps: {
    id: string;
    title: string;
    description: string;
    nodes: any[];
    edges: any[];
  }[];
  selectedSkills: string[];
  progress: Record<string, string[]>;

  constructor(
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    profilePicture: string,
    position: string,
    level: string,
    country: string,
    aboutme: string,
    isEmailConformed: boolean,
    selectedRoadmaps: string[],
    completedRoadmaps: string[],
    generatedRoadmaps: {
      id: string;
      title: string;
      description: string;
      nodes: any[];
      edges: any[];
    }[],
    selectedSkills: string[],
    progress: Record<string, string[]>
  ) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.profilePicture = profilePicture;
    this.position = position;
    this.level = level;
    this.country = country;
    this.aboutme = aboutme;
    this.isEmailConformed = isEmailConformed;
    this.selectedRoadmaps = selectedRoadmaps;
    this.completedRoadmaps = completedRoadmaps;
    this.generatedRoadmaps = generatedRoadmaps;
    this.selectedSkills = selectedSkills;
    this.progress = progress;
  }

  updateProgress(roadmapId: string, nodeId: string, completed: boolean) {
    if (!this.progress[roadmapId]) {
      this.progress[roadmapId] = [];
    }
    if (completed) {
      this.progress[roadmapId].push(nodeId);
    } else {
      this.progress[roadmapId] = this.progress[roadmapId].filter(
        (id) => id !== nodeId
      );
    }
  }

  addSkill(skill: string) {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
    }
  }

  removeSkill(skill: string) {
    this.selectedSkills = this.selectedSkills.filter((s) => s !== skill);
  }

  updateProfile(updatedData: Partial<UserEntity>) {
    Object.assign(this, updatedData);
  }
}
