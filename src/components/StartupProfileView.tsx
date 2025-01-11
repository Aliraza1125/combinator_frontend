import React from 'react';
import { StartupProfile } from '../types/startup';
import { ViewCounter } from './ViewCounter';
import { ContactRequestDialog } from './ContactRequestDialog';
import {
  Building2,
  Calendar,
  Users,
  TrendingUp,
  ExternalLink,
  FileText,
  Video,
  Twitter,
  Linkedin,
  Facebook,
} from 'lucide-react';

interface StartupProfileViewProps {
  startup: StartupProfile;
}

export function StartupProfileView({ startup }: StartupProfileViewProps) {
  return (
    <div className="space-y-8">
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={
            startup.coverImage ||
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80'
          }
          alt={startup.companyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <img
            src={startup.logo || 'https://via.placeholder.com/80'}
            alt={`${startup.companyName} logo`}
            className="w-20 h-20 rounded-lg bg-white p-2 shadow-lg"
          />
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {startup.companyName}
            </h1>
            <p className="text-gray-600">{startup.location}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-600">{startup.pitch}</p>
              </div>
              <ViewCounter views={startup.metrics.views} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Building2 className="w-5 h-5" />
                <span>{startup.industry}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Founded {new Date(startup.foundedDate).getFullYear()}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{startup.teamSize} team members</span>
              </div>
              {startup.metrics.users && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <TrendingUp className="w-5 h-5" />
                  <span>{startup.metrics.users.toLocaleString()} users</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {startup.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  <img
                    src={member.image || 'https://via.placeholder.com/60'}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 mt-1"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Resources</h2>
            <div className="space-y-4">
              {startup.pitchDeckUrl && (
                <a
                  href={startup.pitchDeckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                >
                  <FileText className="w-5 h-5" />
                  <span>Pitch Deck</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {startup.videoUrl && (
                <a
                  href={startup.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                >
                  <Video className="w-5 h-5" />
                  <span>Demo Video</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Connect</h2>
            <div className="space-y-4">
              <ContactRequestDialog
                startupId={startup.id}
                startupName={startup.companyName}
                onRequestSent={() => {}}
              />
              <div className="flex space-x-4">
                {startup.socialLinks.twitter && (
                  <a
                    href={startup.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-400"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
                {startup.socialLinks.linkedin && (
                  <a
                    href={startup.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {startup.socialLinks.facebook && (
                  <a
                    href={startup.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}