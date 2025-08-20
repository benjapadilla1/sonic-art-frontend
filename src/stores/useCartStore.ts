import { create } from 'zustand';

interface CartItem {
  id: string;
  price: number;
  title: string;
  type: 'course' | 'samplePack';
  coverImageUrl: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => {
  let initialItems: CartItem[] = [];

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) initialItems = JSON.parse(stored);
    } catch (err) {
      console.warn('Error parsing cart from localStorage, resetting to empty', err);
    }

    window.addEventListener('storage', event => {
      if (event.key === 'cart') {
        try {
          const newItems = event.newValue ? JSON.parse(event.newValue) : [];
          set({ items: newItems });
        } catch {
          set({ items: [] });
        }
      }
    });
  }

  return {
    items: initialItems,

    addItem: item => {
      const exists = get().items.some(i => i.id === item.id);
      if (!exists) {
        const updated = [...get().items, item];
        set({ items: updated });

        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(updated));
        }
      }
    },

    removeItem: id => {
      const updated = get().items.filter(item => item.id !== id);
      set({ items: updated });

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updated));
      }
    },

    clearCart: () => {
      set({ items: [] });

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify([]));
      }
    },

    total: () => get().items.reduce((acc, item) => acc + item.price, 0),
  };
});
