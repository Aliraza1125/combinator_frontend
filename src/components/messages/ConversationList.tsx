import React from 'react';
import { useMessageStore } from '../../store/messageStore';
import { formatDate } from '../../lib/utils';

interface ConversationListProps {
  onSelectConversation: (id: string) => void;
  activeConversation: string | null;
}

export function ConversationList({
  onSelectConversation,
  activeConversation,
}: ConversationListProps) {
  const conversations = useMessageStore((state) => state.conversations);
  const markConversationAsRead = useMessageStore((state) => state.markConversationAsRead);

  const handleSelect = (conversationId: string) => {
    onSelectConversation(conversationId);
    markConversationAsRead(conversationId);
  };

  return (
    <div className="overflow-y-auto h-[calc(600px-4rem)]">
      {conversations.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No conversations yet
        </div>
      ) : (
        conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => handleSelect(conversation.id)}
            className={`w-full p-4 text-left hover:bg-gray-50 ${
              activeConversation === conversation.id ? 'bg-gray-50' : ''
            } ${conversation.unreadCount > 0 ? 'font-semibold' : ''}`}
          >
            <div className="flex items-center space-x-3">
              {conversation.startupLogo ? (
                <img
                  src={conversation.startupLogo}
                  alt={conversation.startupName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {conversation.startupName[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {conversation.startupName}
                  </p>
                  {conversation.lastMessage && (
                    <span className="text-xs text-gray-500">
                      {formatDate(conversation.lastMessage.createdAt)}
                    </span>
                  )}
                </div>
                {conversation.lastMessage && (
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage.content}
                  </p>
                )}
                {conversation.unreadCount > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {conversation.unreadCount} new
                  </span>
                )}
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  );
}