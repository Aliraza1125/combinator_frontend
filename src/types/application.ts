export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'info_requested';

export interface StartupApplication {
  id: string;
  companyName: string;
  industry: string;
  website?: string;
  foundedDate: string;
  location: string;
  teamSize: number;
  pitch: string;
  problem: string;
  solution: string;
  marketSize: string;
  competition: string;
  businessModel: string;
  fundingStage: string;
  fundingNeeded: number;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}