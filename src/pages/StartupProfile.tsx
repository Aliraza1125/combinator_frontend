import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, Pencil, BarChart, Users, Eye } from 'lucide-react';
import useAxios from '../hooks/useAxios';
import { StartupProfileEditor } from "../components/StartupProfileEditor";
import { BookmarkButton } from "../components/startup/BookmarkButton";
import { ContactRequestDialog } from "../components/ContactRequestDialog";
import { InvestorShowcase } from "../components/startup/investors/InvestorShowcase";
import { StartupUpdates } from "../components/startup/updates/StartupUpdates";
import { TeamSection } from "../components/startup/team/TeamSection";
import { DocumentSection } from "../components/startup/documents/DocumentSection";
import { Button } from "../components/ui/Button";
import { FundraisingCard } from "../components/startup/fundraising/FundraisingCard";

interface Startup {
  id: string;
  userId: string; // Added to track ownership
  companyName: string;
  industry: string;
  location: string;
  teamSize: number;
  pitch: string;
  logo?: string;
  banner?: string;
  foundedDate: string;
  fundingStage: string;
  website?: string;
  status: string;
  views: {
    total: number;
    unique: number;
  };
  teamMembers: Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }>;
  updates: Array<{
    id: string;
    date: string;
    content: string;
  }>;
  investments: Array<{
    id: string;
    investor: string;
    amount: number;
    date: string;
  }>;
  socialLinks: Record<string, string>;
  fundraising: {
    goal: number;
    raised: number;
    backers: number;
    endDate: string;
    description: string;
  } | null;
  bookmarkedBy?: string[];
  pitchDeckUrl?: string;
  videoUrl?: string;
}

function getLoggedInUser() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

export function StartupProfile() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [startup, setStartup] = useState<Startup | null>(null);
  const [rawStartupData, setRawStartupData] = useState<any>(null); // Add this to store raw API data

  const { isLoading, error, execute } = useAxios();
  const loggedInUser = getLoggedInUser();
console.log("logged in user",loggedInUser)  
console.log(startup)
  // Check if the logged-in user is the owner of the startup or an admin
  const isOwner = loggedInUser && startup?.userId._id === loggedInUser._id;
  console.log("isowner",isOwner)
  const isAdmin = loggedInUser?.isAdmin;
  const canEdit = isOwner || isAdmin;

  useEffect(() => {
    fetchStartupDetails();
  }, [id]);

  const fetchStartupDetails = async () => {
    try {
      const response = await execute({
        method: 'GET',
        url: `/api/applications/${id}`
      });
      setRawStartupData(response.application);
      const transformedData: Startup = {
        id: response.application._id,
        userId: response.application.userId,
        companyName: response.application.companyName,
        industry: response.application.industry,
        location: response.application.location,
        teamSize: response.application.teamSize,
        pitch: response.application.pitch,
        logo: response.application.logo,
        banner: response.application.banner,
        foundedDate: response.application.foundedDate,
        fundingStage: response.application.fundingStage,
        website: response.application.website,
        status: response.application.status,
        views: {
          total: response.application.views?.total || 0,
          unique: response.application.views?.uniqueUsers?.length || 0
        },
        teamMembers: response.application.teamMembers || [],
        updates: response.application.updates || [],
        investments: response.application.investments || [],
        socialLinks: response.application.socialLinks || {},
        fundraising: response.application.fundraising || null,
        bookmarkedBy: response.application.bookmarkedBy || [],
        pitchDeckUrl: response.application.pitchDeckUrl,
        videoUrl: response.application.videoUrl
      };

      setStartup(transformedData);
    } catch (error) {
      console.error('Failed to fetch startup details:', error);
    }
  };

  const handleSave = async (updatedData: any) => {
    try {
      await execute({
        method: 'PUT',
        url: `/api/applications/${id}`,
        data: updatedData
      });
      await fetchStartupDetails();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update startup:', error);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">
          {error || 'Startup not found'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <img
          src={startup.banner || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"}
          alt={startup.companyName}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <div className="w-20 h-20 rounded-lg bg-white p-2 shadow-lg overflow-hidden">
            <img
              src={startup.logo || 'https://via.placeholder.com/80'}
              alt={`${startup.companyName} logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/80';
              }}
            />
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {startup.companyName}
            </h1>
            <p className="text-gray-600">{startup.location}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <BookmarkButton
            startupId={startup.id}
            bookmarkedBy={startup.bookmarkedBy || []}
          />
          <ContactRequestDialog
            startupId={startup.id}
            startupName={startup.companyName}
            startupLogo={startup.logo}
            onRequestSent={() => {}}
          />
        </div>
        <div className="flex items-center space-x-4">
          {canEdit && (
            <>
              <Link
                to={`/startups/${startup.id}/analytics`}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
              >
                <BarChart className="w-5 h-5" />
                <span>View Analytics</span>
              </Link>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Pencil className="w-4 h-4" />
                <span>{isEditing ? "View Profile" : "Edit Profile"}</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing && canEdit ? (
          <StartupProfileEditor
          startup={rawStartupData} // Pass the raw data instead of transformed data
          onCancel={() => setIsEditing(false)}
          onSave={async (updatedData) => {
            try {
              await execute({
                method: 'PUT',
                url: `/api/applications/${id}`,
                data: updatedData
              });
              await fetchStartupDetails();
              setIsEditing(false);
            } catch (error) {
              console.error('Failed to update startup:', error);
            }
          }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-6">{startup.pitch}</p>
              <div className="flex items-center space-x-8 border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{formatNumber(startup.teamSize)}</p>
                    <p className="text-sm text-gray-500">team members</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{formatNumber(startup.teamSize * 100)}</p>
                    <p className="text-sm text-gray-500">users</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{formatNumber(startup.views.total)}</p>
                    <p className="text-sm text-gray-500">total views</p>
                  </div>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{formatNumber(startup.views.unique)}</p>
                    <p className="text-sm text-gray-500">unique views</p>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Team</h2>
              <TeamSection members={startup.teamMembers || []} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Updates & Milestones</h2>
              <StartupUpdates updates={startup.updates} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Investment History</h2>
              <InvestorShowcase investments={startup.investments} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Resources</h2>
              <DocumentSection
                pitchDeckUrl={startup.pitchDeckUrl}
                videoUrl={startup.videoUrl}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Facts</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Industry</dt>
                  <dd className="text-base text-gray-900 capitalize">
                    {startup.industry}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Founded</dt>
                  <dd className="text-base text-gray-900">
                    {new Date(startup.foundedDate).getFullYear()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Team Size</dt>
                  <dd className="text-base text-gray-900">
                    {startup.teamSize} members
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Funding Stage
                  </dt>
                  <dd className="text-base text-gray-900 capitalize">
                    {startup.fundingStage.replace("-", " ")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Connect</h2>
              <div className="space-y-4">
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-indigo-600 hover:text-indigo-800"
                  >
                    Visit Website
                  </a>
                )}
                {Object.entries(startup.socialLinks || {}).map(
                  ([platform, url]) =>
                    url && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-indigo-600 hover:text-indigo-800 capitalize"
                      >
                        {platform}
                      </a>
                    )
                )}
              </div>
            </div>

            {startup.fundraising && (
              <div className="bg-white rounded-lg shadow-sm">
                <FundraisingCard
                  startupId={startup.id}
                  goal={startup.fundraising.goal}
                  raised={startup.fundraising.raised}
                  backers={startup.fundraising.backers}
                  daysLeft={Math.ceil(
                    (new Date(startup.fundraising.endDate).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                  description={startup.fundraising.description}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}