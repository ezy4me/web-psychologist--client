import { ChatAPI } from "@/services/chatApi";
import { create } from "zustand";

interface ChatState {
  messages: any;
  chat: any;
}

interface ChatActions {
  getMessages: (psychologistId: number, patientId: number) => Promise<any>;
  getUserChat: (psychologistId: number, patientId: number) => Promise<any>;
}

type ChatStore = ChatState & ChatActions;

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  chat: [],
  getMessages: async (psychologistId, patientId) => {
    try {
      const data = await ChatAPI.getMessages(psychologistId, patientId);
      set({ messages: data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
  getUserChat: async (psychologistId, patientId) => {
    try {
      const data = await ChatAPI.getUserChat(psychologistId, patientId);
      set({ chat: data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
}));

export default useChatStore;
