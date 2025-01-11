import React from 'react';
import { Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {members.map((member, index) => (
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
  );
}