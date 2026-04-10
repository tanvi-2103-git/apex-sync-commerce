import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Shield, Truck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import Navbar from "@/components/Navbar";
import { CustomerType } from "@/data/orders";
import { toast } from "sonner";

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const inventory = useStore((s) => s.inventory);
  const addToCart = useStore((s) => s.addToCart);
  const product = inventory.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [customerType, setCustomerType] = useState<CustomerType>("retail");

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const price = customerType === "wholesale" ? product.wholesalePrice : product.retailPrice;
  const stock = customerType === "wholesale" ? product.wholesaleStock : product.retailStock;

  const handleAdd = () => {
    if (quantity > stock) {
      toast.error("Not enough stock available");
      return;
    }
    addToCart(product, quantity, customerType);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
            <div className="aspect-square rounded-lg overflow-hidden glass-card">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-primary text-sm font-medium tracking-widest mb-2">{product.category.toUpperCase()}</p>
              <h1 className="font-display text-5xl md:text-6xl text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

              {/* Customer Type */}
              <div className="flex gap-3 mb-6">
                {(["retail", "wholesale"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCustomerType(type)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                      customerType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {type === "retail" ? "Retail" : "Wholesale"}
                  </button>
                ))}
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-5xl text-foreground">₹{price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">{stock} in stock</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center bg-secondary rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-foreground hover:text-primary transition-colors">−</button>
                  <span className="px-4 py-3 font-medium text-foreground min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(stock, quantity + 1))} className="px-4 py-3 text-foreground hover:text-primary transition-colors">+</button>
                </div>
                <Button onClick={handleAdd} size="lg" className="glow-blue flex-1 py-6 font-semibold text-base" disabled={stock === 0}>
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  {stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" /> {f}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-6">
                <Truck className="w-4 h-4" /> Cash on Delivery • Free shipping on orders above ₹5,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
