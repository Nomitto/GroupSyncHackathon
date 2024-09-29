import { getAuth } from "firebase/auth";
import { create } from "zustand";
import { getUser } from "../firebase";

export const useChatStore = create((set) => ({
    chatName: null,
    user: null,
    changeChat: (chatId, user) => {
        console.log(chatId)

        return set({
            chatName: chatId,
            user: user
        })
    },
}))