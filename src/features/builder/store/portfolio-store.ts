import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

// Tipleri tanımlıyoruz
export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate?: Date;
  endDate?: Date;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
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
  profile: ProfileState;
  experiences: Experience[];
  educations: Education[];
  projects: Project[]; // YENİ
};

type Actions = {
  setProfile: (profile: Partial<ProfileState>) => void;
  // Experience Aksiyonları
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (
    id: string,
    experience: Partial<Omit<Experience, 'id'>>,
  ) => void;
  removeExperience: (id: string) => void;
  // Education Aksiyonları
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (
    id: string,
    education: Partial<Omit<Education, 'id'>>,
  ) => void;
  removeEducation: (id: string) => void;
  // YENİ Project Aksiyonları
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Omit<Project, 'id'>>) => void;
  removeProject: (id: string) => void;
};

export const usePortfolioStore = create<PortfolioState & Actions>()(
  immer((set) => ({
    // Başlangıç Değerleri
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
    projects: [], // YENİ

    // Aksiyonlar
    setProfile: (profileUpdate) =>
      set((state) => {
        state.profile = { ...state.profile, ...profileUpdate };
      }),

    addExperience: (experience) =>
      set((state) => {
        state.experiences.push({ id: uuidv4(), ...experience });
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
        state.educations.push({ id: uuidv4(), ...education });
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

    // YENİ Project Aksiyonları
    addProject: (project) =>
      set((state) => {
        state.projects.push({ id: uuidv4(), ...project });
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
  })),
);
