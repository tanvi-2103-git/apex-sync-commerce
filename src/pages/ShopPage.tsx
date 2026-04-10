import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import Navbar from "@/components/Navbar";

const ShopPage = () => {
  const inventory = useStore((s) => s.inventory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="text-primary text-sm font-medium tracking-widest mb-2">ALL HELMETS</p>
            <h1 className="font-display text-6xl text-foreground">THE COLLECTION</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((product, i) => {
              const totalStock = product.retailStock + product.wholesaleStock;
              const lowStock = totalStock < 30;
              return (
                <Link
                  key={product.id}
                  to={`/shop/${product.slug}`}
                  className="group glass-card overflow-hidden hover-lift animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={800}
                      height={800}
                    />
                    {lowStock && (
                      <span className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                        Low Stock
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-primary tracking-widest mb-1">{product.category.toUpperCase()}</p>
                    <h3 className="font-semibold text-lg text-foreground mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-foreground font-medium">₹{product.retailPrice.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{totalStock} in stock</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
