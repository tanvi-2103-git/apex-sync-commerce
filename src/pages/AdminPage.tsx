import { useState } from "react";
import {
  Package, ShoppingCart, BarChart3, RefreshCw, LogOut, CheckCircle, Clock, Truck, AlertTriangle, XCircle, ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import AdminLogin from "@/components/AdminLogin";
import { OrderStatus, TallyStatus } from "@/data/orders";
import { toast } from "sonner";

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-accent/20 text-accent",
  approved: "bg-primary/20 text-primary",
  dispatched: "bg-success/20 text-success",
  synced: "bg-success/20 text-success",
};

const tallyColors: Record<TallyStatus, string> = {
  pending: "text-accent",
  synced: "text-success",
  failed: "text-destructive",
};

const AdminPage = () => {
  const isAdminAuth = useStore((s) => s.isAdminAuth);
  const adminLogout = useStore((s) => s.adminLogout);
  const orders = useStore((s) => s.orders);
  const inventory = useStore((s) => s.inventory);
  const updateOrderStatus = useStore((s) => s.updateOrderStatus);
  const syncToTally = useStore((s) => s.syncToTally);
  const [tab, setTab] = useState<"overview" | "orders" | "inventory" | "tally">("overview");

  if (!isAdminAuth) return <AdminLogin />;

  const totalRevenue = orders.filter((o) => o.status !== "pending").reduce((s, o) => s + o.totalAmount, 0);
  const totalStock = inventory.reduce((s, p) => s + p.retailStock + p.wholesaleStock, 0);

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "orders" as const, label: "Orders", icon: ShoppingCart },
    { id: "inventory" as const, label: "Inventory", icon: Package },
    { id: "tally" as const, label: "Tally Sync", icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border glass sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl text-foreground">APEX<span className="text-primary">GEAR</span> <span className="text-muted-foreground text-lg">Admin</span></h1>
          <Button variant="ghost" size="sm" onClick={adminLogout} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: ArrowUpRight, color: "text-success" },
                { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "text-primary" },
                { label: "Pending Orders", value: orders.filter((o) => o.status === "pending").length, icon: Clock, color: "text-accent" },
                { label: "Total Stock", value: totalStock, icon: Package, color: "text-foreground" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className="font-display text-3xl text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id} — {order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-foreground">₹{order.totalAmount.toLocaleString()}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === "orders" && (
          <div className="animate-fade-in space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="glass-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{order.id}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customerName} • {order.phone} • {order.customerType}</p>
                  </div>
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <Button size="sm" onClick={() => { updateOrderStatus(order.id, "approved"); toast.success("Order approved & syncing to Tally"); }}>
                        <CheckCircle className="w-3 h-3 mr-1" /> Approve
                      </Button>
                    )}
                    {order.status === "approved" && (
                      <Button size="sm" variant="outline" onClick={() => { updateOrderStatus(order.id, "dispatched"); toast.success("Marked as dispatched"); }}>
                        <Truck className="w-3 h-3 mr-1" /> Dispatch
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.productName} × {item.quantity}</span>
                      <span className="text-foreground">₹{item.total.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-medium border-t border-border pt-2 mt-2">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inventory */}
        {tab === "inventory" && (
          <div className="animate-fade-in">
            <div className="grid gap-4">
              {inventory.map((product) => {
                const total = product.retailStock + product.wholesaleStock;
                const low = total < 30;
                return (
                  <div key={product.id} className="glass-card p-4 flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" width={64} height={64} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Retail: <span className="text-foreground">{product.retailStock}</span></p>
                      <p className="text-muted-foreground">Wholesale: <span className="text-foreground">{product.wholesaleStock}</span></p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${low ? "text-destructive" : "text-foreground"}`}>{total}</p>
                      {low && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Low</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tally Sync */}
        {tab === "tally" && (
          <div className="animate-fade-in space-y-4">
            <div className="glass-card p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-2">Tally Integration</h3>
              <p className="text-sm text-muted-foreground">
                Orders are synced to TallyPrime when approved or dispatched. Sales vouchers are auto-created with customer ledger, inventory items, and amounts.
              </p>
            </div>

            {orders.map((order) => (
              <div key={order.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {order.tallyStatus === "synced" && <CheckCircle className="w-5 h-5 text-success" />}
                  {order.tallyStatus === "pending" && <Clock className="w-5 h-5 text-accent" />}
                  {order.tallyStatus === "failed" && <XCircle className="w-5 h-5 text-destructive" />}
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.id} — {order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.tallySyncLog || "Not yet synced"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${tallyColors[order.tallyStatus]}`}>{order.tallyStatus.toUpperCase()}</span>
                  {order.tallyStatus === "failed" && (
                    <Button size="sm" variant="outline" onClick={() => { syncToTally(order.id); toast.info("Retrying sync..."); }}>
                      <RefreshCw className="w-3 h-3 mr-1" /> Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
