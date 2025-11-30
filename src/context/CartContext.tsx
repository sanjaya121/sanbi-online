import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CheckoutInfo = {
  name: string;
  email: string;
  address: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  placeOrder: (info: CheckoutInfo) => Promise<{ orderId: string }>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity } : p)));
  };

  const clearCart = () => setItems([]);

  const placeOrder = async (info: CheckoutInfo) => {
    // Simulate an async operation like payment processing / order creation
    const orderId = `ORD-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
    // simulate a network delay
    await new Promise((res) => setTimeout(res, 800));
    // info would be posted to backend in a real scenario, keep for debug
    console.log('placeOrder called with:', info);
    // For a real app, you'd call your backend here and pass `info` and cart items
    // Clear cart on success
    setItems([]);
    return { orderId };
  };

  const totalCount = items.reduce((sum, it) => sum + it.quantity, 0);
  const totalPrice = items.reduce((sum, it) => sum + it.quantity * it.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
