import React from 'react';
import { formatDate } from '../../../lib/utils';
import { StartupUpdate } from '../../../types/startup';
import { Milestone, Newspaper, Package, Users, DollarSign } from 'lucide-react';

const updateTypeIcons = {
  milestone: Milestone,
  news: Newspaper,
  product: Package,
  team: Users,
  funding: DollarSign,
};

interface UpdateCardProps {
  update: StartupUpdate;
}

export function UpdateCard({ update }: UpdateCardProps) {
  const Icon = updateTypeIcons[update.type];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
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
}