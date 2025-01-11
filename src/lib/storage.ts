import { StartupProfile } from '../types/startup';
import { StartupApplication } from '../types/application';

const STORAGE_KEYS = {
  STARTUPS: 'ycombinator_startups',
  APPLICATIONS: 'ycombinator_applications',
};

export function loadStartups(): StartupProfile[] {
  const stored = localStorage.getItem(STORAGE_KEYS.STARTUPS);
  return stored ? JSON.parse(stored) : [];
}

export function saveStartups(startups: StartupProfile[]) {
  localStorage.setItem(STORAGE_KEYS.STARTUPS, JSON.stringify(startups));
}

export function loadApplications(): StartupApplication[] {
  const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return stored ? JSON.parse(stored) : [];
}

export function saveApplications(applications: StartupApplication[]) {
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
}