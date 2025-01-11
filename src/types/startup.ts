import type { ReactNode } from "react";
import { StartupApplication } from "./application";

export interface StartupProfile extends StartupApplication {
  id: string;
  companyName: string;
  location: ReactNode;
  pitch: ReactNode;
  industry: ReactNode;
  foundedDate: string | number | Date;
  teamSize: ReactNode;
  fundingStage: any;
  website: any;
  logo?: string;
  coverImage?: string;
  pitchDeckUrl?: string;
  videoUrl?: string;
  teamMembers: {
    name: string;
    role: string;
    image?: string;
    linkedin?: string;
  }[];
  metrics: {
    revenue?: number;
    users?: number;
    growth?: number;
    views: number;
  };
  highlights: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  contactRequests: ContactRequest[];
  updates: StartupUpdate[];
  investments: Investment[];
  bookmarkedBy: string[];
  fundraising?: {
    goal: number;
    raised: number;
    backers: number;
    endDate: string;
    description: string;
  };
}

export interface StartupUpdate {
  id: string;
  title: string;
  content: string;
  type: 'milestone' | 'news' | 'product' | 'team' | 'funding';
  imageUrl?: string;
  createdAt: string;
}

export interface Investment {
  id: string;
  investorName: string;
  investorLogo?: string;
  amount: number;
  date: string;
  testimonial?: string;
  portfolio?: {
    name: string;
    logo?: string;
    description: string;
    exitValue?: number;
  }[];
}

export interface ContactRequest {
  id: string;
  investorName: string;
  investorEmail: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}



export type Industry =
  | 'fintech'
  | 'healthtech'
  | 'edtech'
  | 'ecommerce'
  | 'saas'
  | 'ai'
  | 'cleantech'
  | 'other';

export type FundingStage =
  | 'pre-seed'
  | 'seed'
  | 'series-a'
  | 'series-b'
  | 'series-c'
  | 'other';