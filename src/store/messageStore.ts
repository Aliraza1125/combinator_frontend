import { create } from 'zustand';
import { Message, Conversation } from '../types/message';
import { generateId } from '../lib/utils';

interface MessageStore {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  addMessage: (conversationId: string, content: string, senderId: string, receiverId: string) => void;
  startConversation: (startupId: string, startupName: string, startupLogo?: string) => string;
  getUnreadCount: () => number;
  markConversationAsRead: (conversationId: string) => void;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  conversations: [],
  messages: {},

  addMessage: (conversationId, content, senderId, receiverId) => {
    const newMessage: Message = {
      id: generateId(),
      senderId,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
      read: false,
    };

    set((state) => {
      const updatedMessages = {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), newMessage],
      };

      const updatedConversations = state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: newMessage,
              unreadCount: conv.unreadCount + 1,
            }
          : conv
      );

      return {
        messages: updatedMessages,
        conversations: updatedConversations,
      };
    });
  },

  startConversation: (startupId, startupName, startupLogo) => {
    const conversationId = generateId();
    const newConversation: Conversation = {
      id: conversationId,
      participants: ['user', startupId],
      startupName,
      startupLogo,
      unreadCount: 0,
    };

    set((state) => ({
      conversations: [...state.conversations, newConversation],
      messages: { ...state.messages, [conversationId]: [] },
    }));

    return conversationId;
  },

  getUnreadCount: () => {
    const { conversations } = get();
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  },

  markConversationAsRead: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      ),
      messages: {
        ...state.messages,
        [conversationId]: (state.messages[conversationId] || []).map((msg) => ({
          ...msg,
          read: true,
        })),
      },
    }));
  },
}));