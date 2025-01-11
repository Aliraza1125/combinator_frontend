import React from 'react';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
  views: number;
}

export function ViewCounter({ views }: ViewCounterProps) {
  return (
    <div className="flex items-center space-x-1 text-gray-500">
      <Eye className="w-4 h-4" />
      <span className="text-sm">{views.toLocaleString()} views</span>
    </div>
  );
}