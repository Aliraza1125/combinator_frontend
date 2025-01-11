import React, { useState, useEffect, useRef } from 'react';
import { useMessageStore } from '../../store/messageStore';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils';

interface MessageThreadProps {
  conversationId: string;
}

export function MessageThread({ conversationId }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = useMessageStore((state) => state.messages[conversationId] || []);
  const conversation = useMessageStore((state) => 
    state.conversations.find((c) => c.id === conversationId)
  );
  const addMessage = useMessageStore((state) => state.addMessage);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addMessage(
      conversationId,
      newMessage,
      'user',
      conversation?.participants.find((p) => p !== 'user') || ''
    );
    setNewMessage('');
  };

  return (
    <>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">{conversation?.startupName}</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-75">
                {formatDate(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button type="submit" className="flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Send</span>
          </Button>
        </div>
      </form>
    </>
  );
}