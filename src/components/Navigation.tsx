import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  BookOpen, 
  Brain, 
  Trophy, 
  MessageSquare, 
  LayoutDashboard,
  Bell,
  User
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Home", icon: Shield },
    { to: "/modules", label: "Learn", icon: BookOpen },
    { to: "/quiz", label: "Quiz", icon: Brain },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { to: "/community", label: "Community", icon: MessageSquare },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <Shield className="h-8 w-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Beacon
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Button
                  key={to}
                  variant={location.pathname === to ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to={to} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
            </Button>
            
            <Button 
              size="sm"
              asChild
              className="flex items-center space-x-2"
            >
              <Link to="/signin">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;