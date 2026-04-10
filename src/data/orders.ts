export type OrderStatus = "pending" | "approved" | "dispatched" | "synced";
export type TallyStatus = "pending" | "synced" | "failed";
export type CustomerType = "retail" | "wholesale";

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  customerType: CustomerType;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  tallyStatus: TallyStatus;
  tallySyncLog?: string;
  createdAt: string;
  updatedAt: string;
}

export const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Rahul Sharma",
    phone: "+91 98765 43210",
    address: "45 MG Road, Bangalore 560001",
    customerType: "retail",
    items: [{ productId: "hm-001", productName: "Phantom X1", quantity: 1, rate: 4999, total: 4999 }],
    totalAmount: 4999,
    status: "pending",
    tallyStatus: "pending",
    createdAt: "2026-04-09T10:30:00Z",
    updatedAt: "2026-04-09T10:30:00Z",
  },
  {
    id: "ORD-002",
    customerName: "Priya Motors",
    phone: "+91 87654 32109",
    address: "12 Industrial Area, Pune 411001",
    customerType: "wholesale",
    items: [
      { productId: "hm-002", productName: "Vortex Carbon R", quantity: 10, rate: 5999, total: 59990 },
      { productId: "hm-003", productName: "Apex Modular GT", quantity: 5, rate: 4999, total: 24995 },
    ],
    totalAmount: 84985,
    status: "approved",
    tallyStatus: "synced",
    tallySyncLog: "Synced successfully at 2026-04-09 14:22",
    createdAt: "2026-04-08T09:15:00Z",
    updatedAt: "2026-04-09T14:22:00Z",
  },
  {
    id: "ORD-003",
    customerName: "Vikram Singh",
    phone: "+91 76543 21098",
    address: "78 Nehru Place, Delhi 110019",
    customerType: "retail",
    items: [{ productId: "hm-004", productName: "Terra ADV", quantity: 1, rate: 5499, total: 5499 }],
    totalAmount: 5499,
    status: "dispatched",
    tallyStatus: "synced",
    tallySyncLog: "Synced successfully at 2026-04-08 16:45",
    createdAt: "2026-04-07T11:00:00Z",
    updatedAt: "2026-04-08T16:45:00Z",
  },
];
