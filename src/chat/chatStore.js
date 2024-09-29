import { getAuth } from "firebase/auth";
import { create } from "zustand";
import { getUser } from "../firebase";

export const useChatStore = create((set) => ({
    chatName: null,
    user: null,
    changeChat: (chatId, user) => {
        console.log(chatId)
        const currentUser = getUser()

        return set({
            chatName: chatId,
            user: currentUser
        })
    },
}))