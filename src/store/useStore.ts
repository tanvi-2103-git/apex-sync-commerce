import { create } from "zustand";
import { products, Product } from "@/data/products";
import { Order, sampleOrders, OrderStatus, TallyStatus, CustomerType } from "@/data/orders";

interface CartItem {
  product: Product;
  quantity: number;
  customerType: CustomerType;
}

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, customerType: CustomerType) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Products (with mutable stock)
  inventory: Product[];
  updateStock: (productId: string, quantity: number, customerType: CustomerType) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt" | "status" | "tallyStatus">) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  syncToTally: (orderId: string) => void;

  // Admin auth
  isAdminAuth: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  cart: [],
  inventory: [...products],
  orders: [...sampleOrders],
  isAdminAuth: false,

  addToCart: (product, quantity, customerType) => {
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id && item.customerType === customerType);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id && item.customerType === customerType
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity, customerType }] };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({ cart: state.cart.filter((item) => item.product.id !== productId) }));
  },

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => {
      const price = item.customerType === "wholesale" ? item.product.wholesalePrice : item.product.retailPrice;
      return sum + price * item.quantity;
    }, 0);
  },

  updateStock: (productId, quantity, customerType) => {
    set((state) => ({
      inventory: state.inventory.map((p) =>
        p.id === productId
          ? {
              ...p,
              retailStock: customerType === "retail" ? p.retailStock - quantity : p.retailStock,
              wholesaleStock: customerType === "wholesale" ? p.wholesaleStock - quantity : p.wholesaleStock,
            }
          : p
      ),
    }));
  },

  addOrder: (orderData) => {
    const id = `ORD-${String(get().orders.length + 1).padStart(3, "0")}`;
    const now = new Date().toISOString();
    set((state) => ({
      orders: [
        { ...orderData, id, status: "pending", tallyStatus: "pending", createdAt: now, updatedAt: now },
        ...state.orders,
      ],
    }));
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
      ),
    }));
    // Auto-sync on approve or dispatch
    if (status === "approved" || status === "dispatched") {
      get().syncToTally(orderId);
    }
  },

  syncToTally: (orderId) => {
    const order = get().orders.find((o) => o.id === orderId);
    if (!order || order.tallyStatus === "synced") return;

    // Simulate Tally XML sync
    const now = new Date().toLocaleString();
    const success = Math.random() > 0.15; // 85% success rate simulation

    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              tallyStatus: success ? "synced" : "failed",
              tallySyncLog: success
                ? `Synced successfully at ${now}. Sales voucher created. Customer ledger: ${o.customerName}`
                : `Sync failed at ${now}. Tally server unreachable. Will retry.`,
              updatedAt: new Date().toISOString(),
            }
          : o
      ),
    }));
  },

  adminLogin: (password) => {
    // Simple demo auth - in production use proper JWT
    if (password === "admin123") {
      set({ isAdminAuth: true });
      return true;
    }
    return false;
  },

  adminLogout: () => set({ isAdminAuth: false }),
}));
