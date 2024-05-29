import create from "zustand";

export const MenuShow = create((set) => ({
    toggle: true,
    toggleState: () => set((state) => ({ toggle: !state.toggle })),
}));