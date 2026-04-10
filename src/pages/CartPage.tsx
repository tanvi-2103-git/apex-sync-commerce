import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import Navbar from "@/components/Navbar";

const CartPage = () => {
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const getCartTotal = useStore((s) => s.getCartTotal);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="font-display text-4xl text-foreground mb-2">CART EMPTY</h2>
          <p className="text-muted-foreground mb-6">Explore our collection and find your perfect helmet.</p>
          <Link to="/shop">
            <Button>Browse Helmets</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-display text-5xl text-foreground mb-8">YOUR CART</h1>

          <div className="space-y-4 mb-8">
            {cart.map((item) => {
              const price = item.customerType === "wholesale" ? item.product.wholesalePrice : item.product.retailPrice;
              return (
                <div key={item.product.id} className="glass-card p-4 flex items-center gap-4 animate-fade-in">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" width={80} height={80} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.customerType === "wholesale" ? "Wholesale" : "Retail"} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-foreground">₹{(price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-4xl text-foreground">₹{getCartTotal().toLocaleString()}</span>
            </div>
            <Button onClick={() => navigate("/checkout")} className="w-full py-6 font-semibold text-base glow-blue">
              Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
