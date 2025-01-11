import { StartupProfile } from '../types/startup';

export const mockStartups: StartupProfile[] = [
  {
    id: '1',
    companyName: 'FinFlow',
    industry: 'fintech',
    website: 'https://finflow.example.com',
    foundedDate: '2023-01-15',
    location: 'Dubai, UAE',
    teamSize: 12,
    pitch: 'Revolutionizing cross-border payments in the MENA region using blockchain technology',
    problem: 'High fees and slow processing times for international money transfers in the Middle East',
    solution: 'Blockchain-based payment infrastructure reducing costs by 90% and processing times to under 1 minute',
    marketSize: '$50B annual cross-border payment market in MENA',
    competition: 'Traditional banks and legacy payment providers',
    businessModel: 'Transaction fee-based revenue model',
    fundingStage: 'series-a',
    fundingNeeded: 5000000,
    status: 'approved',
    createdAt: '2023-01-15T08:00:00.000Z',
    updatedAt: '2023-06-20T10:30:00.000Z',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60',
    pitchDeckUrl: 'https://example.com/pitch.pdf',
    videoUrl: 'https://example.com/demo.mp4',
    teamMembers: [
      {
        name: 'Sarah Ahmed',
        role: 'CEO & Co-founder',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
        linkedin: 'https://linkedin.com/in/example',
      },
      {
        name: 'Mohammed Rahman',
        role: 'CTO & Co-founder',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60',
        linkedin: 'https://linkedin.com/in/example',
      },
    ],
    metrics: {
      revenue: 1000000,
      users: 50000,
      growth: 200,
      views: 1500,
    },
    highlights: [
      'Processed $10M in transactions in Q1 2024',
      'Partnership with major UAE banks',
      'Featured in TechCrunch',
    ],
    socialLinks: {
      twitter: 'https://twitter.com/example',
      linkedin: 'https://linkedin.com/company/example',
      facebook: 'https://facebook.com/example',
    },
    updates: [
      {
        id: '1',
        title: 'Series A Funding Announcement',
        content: 'We are excited to announce the successful closure of our $5M Series A round led by MENA Ventures.',
        type: 'funding',
        imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop&q=60',
        createdAt: '2024-03-01T10:00:00Z'
      },
      {
        id: '2',
        title: 'New Partnership with Dubai Bank',
        content: 'Strategic partnership signed with Dubai Bank to expand our payment network.',
        type: 'milestone',
        createdAt: '2024-02-15T14:30:00Z'
      }
    ],
    investments: [
      {
        id: '1',
        investorName: 'MENA Ventures',
        investorLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60',
        amount: 5000000,
        date: '2024-03-01T10:00:00Z',
        testimonial: 'FinFlow is revolutionizing cross-border payments in the MENA region.',
        portfolio: [
          {
            name: 'TechPay',
            logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
            description: 'Digital payments platform',
            exitValue: 100000000
          }
        ]
      }
    ],
    contactRequests: [],
    bookmarkedBy: [],
    fundraising: {
      goal: 1000000,
      raised: 750000,
      backers: 200,
      endDate: '2024-06-01T00:00:00Z',
      description: 'Support our mission to revolutionize cross-border payments in MENA. Your investment will help us expand our blockchain infrastructure and accelerate market adoption.',
    }
  },
  {
    id: '2',
    companyName: 'EduArabia',
    industry: 'edtech',
    website: 'https://eduarabia.example.com',
    foundedDate: '2023-03-01',
    location: 'Riyadh, Saudi Arabia',
    teamSize: 8,
    pitch: 'Personalized Arabic language learning platform powered by AI',
    problem: 'Lack of effective modern Arabic language learning tools',
    solution: 'AI-powered personalized learning platform with dialect recognition',
    marketSize: '$2B Arabic language learning market',
    competition: 'Traditional language schools and generic apps',
    businessModel: 'Subscription-based with enterprise licensing',
    fundingStage: 'seed',
    fundingNeeded: 2000000,
    status: 'approved',
    createdAt: '2023-03-01T09:00:00.000Z',
    updatedAt: '2023-07-15T14:20:00.000Z',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60',
    pitchDeckUrl: 'https://example.com/pitch.pdf',
    videoUrl: 'https://example.com/demo.mp4',
    teamMembers: [
      {
        name: 'Fatima Al-Sayed',
        role: 'CEO & Founder',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60',
        linkedin: 'https://linkedin.com/in/example',
      },
    ],
    metrics: {
      revenue: 500000,
      users: 25000,
      growth: 150,
      views: 1200,
    },
    highlights: [
      '25,000 active learners',
      'Partnership with Saudi Ministry of Education',
      'Winner of EdTech Arabia 2023',
    ],
    socialLinks: {
      twitter: 'https://twitter.com/example',
      linkedin: 'https://linkedin.com/company/example',
    },
    updates: [
      {
        id: '1',
        title: 'Launch of Advanced Dialect Recognition',
        content: 'Our AI can now recognize and teach 8 different Arabic dialects.',
        type: 'product',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
        createdAt: '2024-03-10T09:00:00Z'
      }
    ],
    investments: [
      {
        id: '1',
        investorName: 'Saudi EdTech Fund',
        amount: 2000000,
        date: '2024-01-15T08:00:00Z',
        testimonial: 'EduArabia is transforming Arabic language education.',
        portfolio: [
          {
            name: 'LearnME',
            description: 'Online tutoring platform',
            exitValue: 50000000
          }
        ]
      }
    ],
    contactRequests: [],
    bookmarkedBy: [],
    fundraising: {
      goal: 750000,
      raised: 500000,
      backers: 150,
      endDate: '2024-07-01T00:00:00Z',
      description: 'Join us in transforming Arabic language education. Your investment will support AI development and content creation for multiple dialects.',
    }
  },
  {
    id: '3',
    companyName: 'HealthTech MENA',
    industry: 'healthtech',
    website: 'https://healthtechmena.example.com',
    foundedDate: '2023-02-15',
    location: 'Cairo, Egypt',
    teamSize: 15,
    pitch: 'AI-powered telemedicine platform connecting patients with doctors across MENA',
    problem: 'Limited access to healthcare specialists in remote areas',
    solution: 'Telemedicine platform with AI triage and specialist matching',
    marketSize: '$30B healthcare market in MENA',
    competition: 'Traditional clinics and basic telemedicine apps',
    businessModel: 'Commission per consultation and subscription for doctors',
    fundingStage: 'series-b',
    fundingNeeded: 10000000,
    status: 'approved',
    createdAt: '2023-02-15T10:00:00.000Z',
    updatedAt: '2023-08-01T16:45:00.000Z',
    logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
    pitchDeckUrl: 'https://example.com/pitch.pdf',
    videoUrl: 'https://example.com/demo.mp4',
    teamMembers: [
      {
        name: 'Dr. Ahmed Hassan',
        role: 'CEO & Co-founder',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop&q=60',
        linkedin: 'https://linkedin.com/in/example',
      },
      {
        name: 'Layla Ibrahim',
        role: 'CTO & Co-founder',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=60',
        linkedin: 'https://linkedin.com/in/example',
      },
    ],
    metrics: {
      revenue: 2000000,
      users: 100000,
      growth: 300,
      views: 2000,
    },
    highlights: [
      '100,000 consultations completed',
      'Licensed in 5 MENA countries',
      'Featured in Forbes Middle East',
    ],
    socialLinks: {
      twitter: 'https://twitter.com/example',
      linkedin: 'https://linkedin.com/company/example',
      facebook: 'https://facebook.com/example',
    },
    updates: [
      {
        id: '1',
        title: 'Expansion to Saudi Arabia',
        content: 'We are excited to announce our launch in Saudi Arabia, marking our 5th country in the MENA region.',
        type: 'milestone',
        imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&auto=format&fit=crop&q=60',
        createdAt: '2024-03-05T11:00:00Z'
      },
      {
        id: '2',
        title: 'AI Triage System Launch',
        content: 'Our new AI-powered triage system can now predict urgency levels with 95% accuracy.',
        type: 'product',
        createdAt: '2024-02-20T13:45:00Z'
      }
    ],
    investments: [
      {
        id: '1',
        investorName: 'Health Innovation Capital',
        investorLogo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
        amount: 10000000,
        date: '2024-02-01T09:30:00Z',
        testimonial: 'HealthTech MENA is revolutionizing healthcare access in the region.',
        portfolio: [
          {
            name: 'MedConnect',
            logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
            description: 'Digital health records platform',
            exitValue: 200000000
          }
        ]
      }
    ],
    contactRequests: [],
    bookmarkedBy: [],
    fundraising: {
      goal: 500000,
      raised: 350000,
      backers: 125,
      endDate: '2024-05-01T00:00:00Z',
      description: 'Help us scale our technology across the MENA region and bring innovative solutions to more users. Your support will directly contribute to expanding our team, enhancing our platform, and accelerating market penetration.',
    }
  }
];
// Add to each startup object in mockStartups array:
