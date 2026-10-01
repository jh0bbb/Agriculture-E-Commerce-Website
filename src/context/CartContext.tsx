import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../data/mockData';

interface CartItem {
  product: Product;
  quantity: number;
}

interface WishlistItem {
  product: Product;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      if (exists) return prev.filter(i => i.product.id !== product.id);
      return [...prev, { product }];
    });
  };

  const isInWishlist = (productId: string) =>
    wishlist.some(i => i.product.id === productId);

  return (
    <CartContext.Provider value={{
      cart, wishlist, isLoggedIn, setIsLoggedIn,
      addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, toggleWishlist, isInWishlist,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
