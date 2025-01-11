import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MessageCircle, X } from 'lucide-react';
import { useMessageStore } from '../../store/messageStore';
import { Button } from '../ui/Button';
import { ConversationList } from './ConversationList';
import { MessageThread } from './MessageThread';

export function InboxDialog() {
  const [open, setOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const unreadCount = useMessageStore((state) => state.getUnreadCount());

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="relative flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
          <MessageCircle className="w-5 h-5" />
          <span>Messages</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-2xl h-[600px] flex overflow-hidden">
          <Dialog.Title className="sr-only">Messages Inbox</Dialog.Title>
          
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>
            <ConversationList
              onSelectConversation={setActiveConversation}
              activeConversation={activeConversation}
            />
          </div>

          <div className="flex-1 flex flex-col">
            {activeConversation ? (
              <MessageThread conversationId={activeConversation} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}