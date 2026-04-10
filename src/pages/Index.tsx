import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-helmet.jpg";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium helmet" className="w-full h-full object-cover opacity-60" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-2xl animate-fade-in">
            <p className="text-primary font-medium tracking-widest text-sm mb-4">ENGINEERED FOR PERFORMANCE</p>
            <h1 className="font-display text-7xl md:text-9xl leading-none mb-6 text-foreground">
              RIDE<br />
              <span className="text-chrome">FEARLESS</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Premium helmets crafted for riders who demand the perfect blend of safety, style, and performance.
            </p>
            <Link to="/shop">
              <Button size="lg" className="glow-blue text-base px-8 py-6 font-semibold">
                Shop Performance <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest mb-2">COLLECTION</p>
              <h2 className="font-display text-5xl text-foreground">TOP PICKS</h2>
            </div>
            <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product, i) => (
              <Link
                key={product.id}
                to={`/shop/${product.slug}`}
                className="group glass-card overflow-hidden hover-lift"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={800}
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-primary tracking-widest mb-1">{product.category.toUpperCase()}</p>
                  <h3 className="font-semibold text-lg text-foreground mb-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">₹{product.retailPrice.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10K+", label: "Helmets Sold" },
            { value: "99.8%", label: "Safety Rating" },
            { value: "500+", label: "Dealers" },
            { value: "5★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl md:text-5xl text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="font-display text-2xl mb-2 text-foreground">APEX<span className="text-primary">GEAR</span></p>
          <p className="text-sm text-muted-foreground">© 2026 ApexGear. Premium Helmet Brand.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
