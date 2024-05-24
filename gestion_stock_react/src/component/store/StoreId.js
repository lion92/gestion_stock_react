import create from 'zustand';

// Créer le magasin Zustand
export const storeId = create((set) => ({
    // Initialiser la liste des IDs
    idList:[],
    containsId: (e,id) => (state) => state.idList.some((item) => item.id === id),

    updateQuantity: (e,id, newQuantite) => set((state) => ({
        idList: state.idList.map((item) =>
            item.id === id ? { ...item, quantite: newQuantite } : item
        )
    })),
    // Ajouter un ID à la liste
    addId: (e,id, quantite, prix) => set((state) => ({ idList: [...state.idList, {e:e,id:id, quantite:quantite, prix:prix}] })),

    // Supprimer un ID de la liste
    removeId: (e,id) =>
        set((state) => ({ e:e ,idList: state.idList.filter((item) => item.id !==  id) })),

    // Réinitialiser la liste des IDs
    resetIds: (e) => set({ e:e,idList: [] }),
}));
