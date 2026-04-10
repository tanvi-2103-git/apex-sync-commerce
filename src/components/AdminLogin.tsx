import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const adminLogin = useStore((s) => s.adminLogin);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminLogin(password)) {
      toast.error("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="glass-card p-8 w-full max-w-sm animate-scale-in">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-3xl text-foreground">ADMIN ACCESS</h2>
          <p className="text-sm text-muted-foreground mt-1">Enter password to continue</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-secondary border-border"
          />
          <Button type="submit" className="w-full">Login</Button>
          <p className="text-xs text-muted-foreground text-center">Demo: admin123</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
