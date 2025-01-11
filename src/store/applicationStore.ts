import { create } from 'zustand';
import { StartupApplication } from '../types/application';
import { loadApplications, saveApplications } from '../lib/storage';
import { useStartupStore } from './startupStore';
import { generateId } from '../lib/utils';

interface ApplicationStore {
  applications: StartupApplication[];
  currentApplication: StartupApplication | null;
  setCurrentApplication: (application: StartupApplication | null) => void;
  addApplication: (application: StartupApplication) => void;
  updateApplication: (id: string, application: Partial<StartupApplication>) => void;
  getApplicationById: (id: string) => StartupApplication | undefined;
  convertToStartup: (application: StartupApplication) => void;
}

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
  applications: loadApplications(),
  currentApplication: null,
  setCurrentApplication: (application) => set({ currentApplication: application }),
  addApplication: (application) =>
    set((state) => {
      const newApplications = [...state.applications, application];
      saveApplications(newApplications);
      return { applications: newApplications };
    }),
  updateApplication: (id, updatedFields) =>
    set((state) => {
      const newApplications = state.applications.map((app) =>
        app.id === id ? { ...app, ...updatedFields } : app
      );
      saveApplications(newApplications);
      return { applications: newApplications };
    }),
  getApplicationById: (id) => {
    const { applications } = get();
    return applications.find((app) => app.id === id);
  },
  convertToStartup: (application) => {
    const addStartup = useStartupStore.getState().addStartup;
    const startup = {
      id: generateId(),
      ...application,
      teamMembers: [],
      metrics: {
        revenue: 0,
        users: 0,
        growth: 0,
        views: 0
      },
      highlights: [],
      socialLinks: {
        twitter: '',
        linkedin: '',
        facebook: ''
      },
      updates: [],
      investments: [],
      contactRequests: [],
      bookmarkedBy: [],
      logo: '',
      coverImage: '',
      pitchDeckUrl: '',
      videoUrl: ''
    };
    addStartup(startup);
  },
}));