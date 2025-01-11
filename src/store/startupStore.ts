import { create } from 'zustand';
import { StartupProfile, Industry, FundingStage, ContactRequest } from '../types/startup';
import { mockStartups } from '../data/mockStartups';
import { loadStartups, saveStartups } from '../lib/storage';

interface StartupFilters {
  industry?: Industry;
  fundingStage?: FundingStage;
  location?: string;
  search?: string;
  bookmarked?: boolean;
}

interface StartupStore {
  startups: StartupProfile[];
  filters: StartupFilters;
  setFilters: (filters: Partial<StartupFilters>) => void;
  addStartup: (startup: StartupProfile) => void;
  updateStartup: (id: string, updates: Partial<StartupProfile>) => void;
  getFilteredStartups: () => StartupProfile[];
  incrementViews: (startupId: string) => void;
  addContactRequest: (startupId: string, request: Omit<ContactRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateContactRequestStatus: (startupId: string, requestId: string, status: ContactRequest['status']) => void;
  toggleBookmark: (startupId: string, userId: string) => void;
  getBookmarkedStartups: (userId: string) => StartupProfile[];
}

const initialStartups = loadStartups().length > 0 ? loadStartups() : mockStartups;

export const useStartupStore = create<StartupStore>((set, get
) => ({
  startups: initialStartups,
  filters: {},
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  addStartup: (startup) =>
    set((state) => {
      const newStartups = [...state.startups, startup];
      saveStartups(newStartups);
      return { startups: newStartups };
    }),
  updateStartup: (id, updates) =>
    set((state) => {
      const newStartups = state.startups.map((startup) =>
        startup.id === id ? { ...startup, ...updates } : startup
      );
      saveStartups(newStartups);
      return { startups: newStartups };
    }),
  getFilteredStartups: () => {
    const { startups, filters } = get();
    return startups.filter((startup) => {
      const matchesIndustry = !filters.industry || startup.industry === filters.industry;
      const matchesFundingStage = !filters.fundingStage || startup.fundingStage === filters.fundingStage;
      const matchesLocation = !filters.location || startup.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesSearch = !filters.search || 
        startup.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        startup.pitch.toLowerCase().includes(filters.search.toLowerCase());
      const matchesBookmarked = !filters.bookmarked || 
        (filters.bookmarked && startup.bookmarkedBy.includes('user-1')); // In a real app, get the current user's ID

      return matchesIndustry && matchesFundingStage && matchesLocation && matchesSearch && matchesBookmarked;
    });
  },
  incrementViews: (startupId) =>
    set((state) => {
      const newStartups = state.startups.map((startup) =>
        startup.id === startupId
          ? {
              ...startup,
              metrics: {
                ...startup.metrics,
                views: (startup.metrics.views || 0) + 1,
              },
            }
          : startup
      );
      saveStartups(newStartups);
      return { startups: newStartups };
    }),
  addContactRequest: (startupId, request) =>
    set((state) => {
      const newStartups = state.startups.map((startup) =>
        startup.id === startupId
          ? {
              ...startup,
              contactRequests: [
                ...(startup.contactRequests || []),
                {
                  ...request,
                  id: crypto.randomUUID(),
                  createdAt: new Date().toISOString(),
                  status: 'pending',
                },
              ],
            }
          : startup
      );
      saveStartups(newStartups);
      return { startups: newStartups };
    }),
  updateContactRequestStatus: (startupId, requestId, status) =>
    set((state) => {
      const newStartups = state.startups.map((startup) =>
        startup.id === startupId
          ? {
              ...startup,
              contactRequests: startup.contactRequests.map((request) =>
                request.id === requestId
                  ? { ...request, status }
                  : request
              ),
            }
          : startup
      );
      saveStartups(newStartups);
      return { startups: newStartups };
    }),
  toggleBookmark: (startupId, userId) =>
    set((state) => {
      const newStartups = state.startups.map((startup) => {
        if (startup.id === startupId) {
          const bookmarkedBy = startup.bookmarkedBy || [];
          const isBookmarked = bookmarkedBy.includes(userId);
          
          return {
            ...startup,
            bookmarkedBy: isBookmarked
              ? bookmarkedBy.filter((id) => id !== userId)
              : [...bookmarkedBy, userId],
          };
        }
        return startup;
      });
      saveStartups(newStartups);
      return { startups: newStartups };
    }),
  getBookmarkedStartups: (userId) => {
    const { startups } = get();
    return startups.filter((startup) => 
      startup.bookmarkedBy && startup.bookmarkedBy.includes(userId)
    );
  },
}));