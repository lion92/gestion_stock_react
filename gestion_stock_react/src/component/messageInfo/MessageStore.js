

// Créer le magasin Zustand
import create from "zustand";

export const MessageStore = create((set) => ({
    message: "Bienvenue",
    setMessage: (newMessage) => set({ message: newMessage }),
}));
