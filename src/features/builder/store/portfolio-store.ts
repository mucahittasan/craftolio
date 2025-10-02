import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
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
};

type Actions = {
  setProfile: (profile: Partial<ProfileState>) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (
    id: string,
    experience: Partial<Omit<Experience, 'id'>>,
  ) => void;
  removeExperience: (id: string) => void;
};

export const usePortfolioStore = create<PortfolioState & Actions>()(
  immer((set) => ({
    profile: {
      title: '',
      bio: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
    },
    experiences: [],

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
  })),
);
