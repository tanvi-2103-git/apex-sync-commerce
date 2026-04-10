import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store/useStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cart = useStore((s) => s.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-3xl tracking-wider text-foreground">
          APEX<span className="text-primary">GEAR</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/admin" className="text-xs font-medium text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            Admin
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border px-6 py-4 space-y-4">
          <Link to="/" className="block text-sm" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/shop" className="block text-sm" onClick={() => setOpen(false)}>Shop</Link>
          <Link to="/cart" className="block text-sm" onClick={() => setOpen(false)}>Cart ({totalItems})</Link>
          <Link to="/admin" className="block text-xs text-muted-foreground" onClick={() => setOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
