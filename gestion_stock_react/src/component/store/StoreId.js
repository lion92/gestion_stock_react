import create from 'zustand';

// Créer le magasin Zustand
export const storeId = create((set) => ({
    // Initialiser la liste des IDs
    idList: [],

    // Ajouter un ID à la liste
    addId: (id) => set((state) => ({ idList: [...state.idList, id] })),

    // Supprimer un ID de la liste
    removeId: (id) =>
        set((state) => ({ idList: state.idList.filter((item) => item !== id) })),

    // Réinitialiser la liste des IDs
    resetIds: () => set({ idList: [] }),
}));
