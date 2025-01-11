import React from 'react';
import { formatDate } from '../../lib/utils';
import { StartupUpdate } from '../../types/startup';
import { Milestone, Newspaper, Package, Users, DollarSign } from 'lucide-react';

interface StartupUpdatesProps {
  updates: StartupUpdate[];
}

const updateTypeIcons = {
  milestone: Milestone,
  news: Newspaper,
  product: Package,
  team: Users,
  funding: DollarSign,
};

export function StartupUpdates({ updates }: StartupUpdatesProps) {
  if (updates.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No updates yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {updates.map((update) => {
        const Icon = updateTypeIcons[update.type];
        
        return (
          <div
            key={update.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
          >
            {update.imageUrl && (
              <img
                src={update.imageUrl}
                alt={update.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <Icon className="w-4 h-4" />
                <span className="capitalize">{update.type}</span>
                <span>•</span>
                <time>{formatDate(update.createdAt)}</time>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {update.title}
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">{update.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}