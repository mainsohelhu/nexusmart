// import { create } from 'zustand';

// const useProductStore = create((set) => ({
//   products: [],
//   searchQuery: '', // The global search state
  
//   setProducts: (data) => set({ products: data }),
  
//   // Action to update the search query
//   setSearchQuery: (query) => set({ searchQuery: query }),
// }));

// export default useProductStore;

import { create } from 'zustand';

// 1. We add 'get' here so we can access the current state
const useProductStore = create((set, get) => ({
  products: [
    {
      _id: '1',
      name: 'Nexus Tech Jacket',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      category: 'Apparel',
      rating: 4.8
    },
    {
      _id: '2',
      name: 'Quantum Gaming Mouse',
      price: 54.50,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1000&auto=format&fit=crop',
      category: 'Tech',
      rating: 4.9
    }
  ], 
  searchQuery: '',

  // This function now works correctly
  setProducts: (data) => {
    if (data && data.length > 0) {
      set({ products: data });
    }
    // If data is empty (like a server error), it keeps the mock products above
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useProductStore; // 2. DON'T FORGET THIS