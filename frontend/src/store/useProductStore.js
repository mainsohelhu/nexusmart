import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [], // Start with an empty array
  searchQuery: '',

  // This will now update the state regardless of whether the database is empty or full
  setProducts: (data) => set({ products: data }),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useProductStore;