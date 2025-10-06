import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  location?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  description?: string | null;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string | null;
  location?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  url?: string | null;
  githubUrl?: string | null;
  imageUrl?: string | null;
};

export type Skill = {
  id: string;
  name: string;
};

type ProfileState = {
  title: string;
  bio: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
};

type PortfolioState = {
  username: string | null;
  profile: ProfileState;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
};

type Actions = {
  setProfile: (profile: Partial<ProfileState>) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (
    id: string,
    experience: Partial<Omit<Experience, 'id'>>,
  ) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Education) => void;
  updateEducation: (
    id: string,
    education: Partial<Omit<Education, 'id'>>,
  ) => void;
  removeEducation: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Omit<Project, 'id'>>) => void;
  removeProject: (id: string) => void;
  addSkill: (skillName: string) => void;
  removeSkill: (id: string) => void;
  hydrateStore: (data: PortfolioState) => void;
};

export const usePortfolioStore = create<PortfolioState & Actions>()(
  immer((set) => ({
    username: null,
    profile: {
      title: '',
      bio: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
    },
    experiences: [],
    educations: [],
    projects: [],
    skills: [],

    setProfile: (profileUpdate) =>
      set((state) => {
        state.profile = { ...state.profile, ...profileUpdate };
      }),

    addExperience: (experience) =>
      set((state) => {
        state.experiences.push(experience);
      }),

    updateExperience: (id, experienceUpdate) =>
      set((state) => {
        const index = state.experiences.findIndex((exp) => exp.id === id);
        if (index !== -1) {
          state.experiences[index] = {
            ...state.experiences[index],
            ...experienceUpdate,
          };
        }
      }),

    removeExperience: (id) =>
      set((state) => {
        state.experiences = state.experiences.filter((exp) => exp.id !== id);
      }),

    addEducation: (education) =>
      set((state) => {
        state.educations.push(education);
      }),

    updateEducation: (id, educationUpdate) =>
      set((state) => {
        const index = state.educations.findIndex((edu) => edu.id === id);
        if (index !== -1) {
          state.educations[index] = {
            ...state.educations[index],
            ...educationUpdate,
          };
        }
      }),

    removeEducation: (id) =>
      set((state) => {
        state.educations = state.educations.filter((edu) => edu.id !== id);
      }),

    addProject: (project) =>
      set((state) => {
        state.projects.push(project);
      }),

    updateProject: (id, projectUpdate) =>
      set((state) => {
        const index = state.projects.findIndex((proj) => proj.id === id);
        if (index !== -1) {
          state.projects[index] = {
            ...state.projects[index],
            ...projectUpdate,
          };
        }
      }),

    removeProject: (id) =>
      set((state) => {
        state.projects = state.projects.filter((proj) => proj.id !== id);
      }),

    addSkill: (skillName) =>
      set((state) => {
        if (
          skillName &&
          !state.skills.some(
            (s) => s.name.toLowerCase() === skillName.toLowerCase(),
          )
        ) {
          state.skills.push({ id: uuidv4(), name: skillName });
        }
      }),

    removeSkill: (id) =>
      set((state) => {
        state.skills = state.skills.filter((skill) => skill.id !== id);
      }),

    hydrateStore: (data) =>
      set((state) => {
        state.username = data.username;
        state.profile = data.profile;
        state.experiences = data.experiences;
        state.educations = data.educations;
        state.projects = data.projects;
        state.skills = data.skills;
      }),
  })),
);
