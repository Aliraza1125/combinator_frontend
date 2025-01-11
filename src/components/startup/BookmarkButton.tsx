import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStartupStore } from '../../store/startupStore';

interface BookmarkButtonProps {
  startupId: string;
  bookmarkedBy: string[];
}

export function BookmarkButton({ startupId, bookmarkedBy }: BookmarkButtonProps) {
  // In a real app, you'd get the current user's ID from auth
  const currentUserId = 'user-1';
  const isBookmarked = bookmarkedBy.includes(currentUserId);
  const toggleBookmark = useStartupStore((state) => state.toggleBookmark);

  return (
    <Button
      variant={isBookmarked ? 'default' : 'outline'}
      onClick={() => toggleBookmark(startupId, currentUserId)}
      className="flex items-center space-x-2"
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
      <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
    </Button>
  );
}