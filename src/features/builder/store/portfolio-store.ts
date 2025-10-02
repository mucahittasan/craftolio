import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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
};

type Actions = {
  setProfile: (profile: Partial<ProfileState>) => void;
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

    setProfile: (profileUpdate) =>
      set((state) => {
        state.profile = { ...state.profile, ...profileUpdate };
      }),
  })),
);
