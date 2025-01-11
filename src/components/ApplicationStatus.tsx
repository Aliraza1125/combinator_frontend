import React from 'react';
import { useApplicationStore } from '../store/applicationStore';
import { StartupApplication } from '../types/application';

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  info_requested: 'bg-purple-100 text-purple-800',
};

const statusLabels = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  info_requested: 'Information Requested',
};

export function ApplicationStatus({ application }: { application: StartupApplication }) {
  return (
    <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{application.companyName}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[application.status]
          }`}
        >
          {statusLabels[application.status]}
        </span>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Industry:</span> {application.industry}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Location:</span> {application.location}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Funding Stage:</span>{' '}
          {application.fundingStage}
        </p>
      </div>

      <div className="text-sm text-gray-500">
        Last updated: {new Date(application.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}