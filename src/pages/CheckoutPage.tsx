import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const CheckoutPage = () => {
  const cart = useStore((s) => s.cart);
  const getCartTotal = useStore((s) => s.getCartTotal);
  const addOrder = useStore((s) => s.addOrder);
  const updateStock = useStore((s) => s.updateStock);
  const clearCart = useStore((s) => s.clearCart);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  if (cart.length === 0 && !submitted) {
    navigate("/cart");
    return null;
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 flex flex-col items-center justify-center min-h-[60vh] text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="font-display text-5xl text-foreground mb-2">ORDER PLACED</h2>
          <p className="text-muted-foreground mb-8">Your order has been received. We'll reach out for delivery confirmation.</p>
          <Button onClick={() => navigate("/shop")} variant="outline">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const items = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      rate: item.customerType === "wholesale" ? item.product.wholesalePrice : item.product.retailPrice,
      total: (item.customerType === "wholesale" ? item.product.wholesalePrice : item.product.retailPrice) * item.quantity,
    }));

    addOrder({
      customerName: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      customerType: cart[0].customerType,
      items,
      totalAmount: getCartTotal(),
    });

    // Deduct stock
    cart.forEach((item) => updateStock(item.product.id, item.quantity, item.customerType));
    clearCart();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-lg">
          <h1 className="font-display text-5xl text-foreground mb-2">CHECKOUT</h1>
          <p className="text-muted-foreground mb-8">Cash on Delivery only</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Delivery Address</label>
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Full address with pincode"
                className="bg-secondary border-border"
              />
            </div>

            <div className="glass-card p-4 mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{cart.length} item(s)</span>
                <span className="text-foreground font-medium">₹{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment</span>
                <span className="text-foreground">Cash on Delivery</span>
              </div>
            </div>

            <Button type="submit" className="w-full py-6 font-semibold text-base glow-blue mt-4">
              Place Order — ₹{getCartTotal().toLocaleString()}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
