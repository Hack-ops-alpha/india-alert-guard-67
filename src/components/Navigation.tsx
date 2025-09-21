import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Shield, 
  BookOpen, 
  Trophy, 
  Users, 
  BarChart3,
  Menu,
  X,
  LogOut,
  User
} from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { title: "Home", href: "/", icon: Shield },
    { title: "Modules", href: "/modules", icon: BookOpen },
    { title: "Quiz", href: "/quiz", icon: Trophy },
    { title: "Leaderboard", href: "/leaderboard", icon: BarChart3 },
    { title: "Community", href: "/community", icon: Users },
    { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // Don't show navigation on auth pages
  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  // Don't show navigation if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-card border-b border-border shadow-sm relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">Beacon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            location.pathname === item.href
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User info and logout for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <Badge variant={user?.type === 'admin' ? 'default' : 'secondary'}>
                {user?.type}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-50">
            <div className="p-4 space-y-2">
              {/* User info for mobile */}
              <div className="flex items-center space-x-2 px-3 py-2 border-b border-border mb-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Badge variant={user?.type === 'admin' ? 'default' : 'secondary'}>
                  {user?.type}
                </Badge>
              </div>
              
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
              
              {/* Logout button for mobile */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;