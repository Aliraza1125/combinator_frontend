import React from 'react';
import { FileText, Video, ExternalLink } from 'lucide-react';

interface DocumentSectionProps {
  pitchDeckUrl?: string;
  videoUrl?: string;
}

export function DocumentSection({ pitchDeckUrl, videoUrl }: DocumentSectionProps) {
  if (!pitchDeckUrl && !videoUrl) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No documents available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pitchDeckUrl && (
        <a
          href={pitchDeckUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
        >
          <FileText className="w-6 h-6 text-indigo-600" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Pitch Deck</h3>
            <p className="text-sm text-gray-500">View company presentation</p>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400" />
        </a>
      )}

      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
        >
          <Video className="w-6 h-6 text-indigo-600" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Demo Video</h3>
            <p className="text-sm text-gray-500">Watch product demonstration</p>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400" />
        </a>
      )}
    </div>
  );
}