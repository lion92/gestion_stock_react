import create from "zustand";

export const MenuShow = create((set) => ({
    toggle: false,
    toggleState: () => set((state) => ({ toggle: !state.toggle })),
}));