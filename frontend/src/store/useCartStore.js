import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  
  // Action to add item or increase quantity
  addToCart: (product) => set((state) => {
    const itemExists = state.cart.find((item) => item._id === product._id);
    
    if (itemExists) {
      return {
        cart: state.cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, qty: 1 }] };
  }),

  // Action to decrease quantity
  decreaseQty: (id) => set((state) => {
    const item = state.cart.find((i) => i._id === id);
    
    if (item && item.qty > 1) {
      return {
        cart: state.cart.map((i) =>
          i._id === id ? { ...i, qty: i.qty - 1 } : i
        ),
      };
    }
    // If qty is 1, we keep it at 1 (or you could call removeFromCart here)
    return { cart: state.cart };
  }),

  // Action to remove item entirely
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item._id !== id),
  })),

  // Clear entire cart
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;