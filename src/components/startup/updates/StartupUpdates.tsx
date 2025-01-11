import React from 'react';
import { StartupUpdate } from '../../../types/startup';
import { UpdateCard } from './UpdateCard';

interface StartupUpdatesProps {
  updates?: StartupUpdate[];
}

export function StartupUpdates({ updates = [] }: StartupUpdatesProps) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No updates yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {updates.map((update) => (
        <UpdateCard key={update.id} update={update} />
      ))}
    </div>
  );
}