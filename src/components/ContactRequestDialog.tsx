import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { useStartupStore } from '../store/startupStore';
import { useMessageStore } from '../store/messageStore';

interface ContactRequestDialogProps {
  startupId: string;
  startupName: string;
  startupLogo?: string;
  onRequestSent: () => void;
}

export function ContactRequestDialog({
  startupId,
  startupName,
  startupLogo,
  onRequestSent
}: ContactRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const startConversation = useMessageStore((state) => state.startConversation);
  const addMessage = useMessageStore((state) => state.addMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const conversationId = startConversation(startupId, startupName, startupLogo);
    addMessage(
      conversationId,
      `Hi! I'm interested in learning more about ${startupName}.`,
      'user',
      startupId
    );
    setOpen(false);
    onRequestSent();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Contact Startup</Button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Contact {startupName}
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-4">
            Start a conversation with {startupName}. Our messaging system allows you to communicate directly with the startup team.
          </Dialog.Description>
          
          <div className="flex justify-end space-x-3">
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Button onClick={handleSubmit}>Start Conversation</Button>
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