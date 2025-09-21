import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  Phone,
  Shield,
  GraduationCap
} from "lucide-react";

interface AuthFormsProps {
  onClose: () => void;
}

const AuthForms = ({ onClose }: AuthFormsProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'student' | 'admin'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isLogin ? 'Sign In' : 'Create Account'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin ? 'Welcome back to Beacon' : 'Join the disaster preparedness community'}
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'signup'} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="login" 
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label>Account Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={userType === 'student' ? 'default' : 'outline'}
                      onClick={() => setUserType('student')}
                      className="flex items-center space-x-2 h-auto p-4"
                    >
                      <GraduationCap className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Student</div>
                        <div className="text-xs opacity-70">Learn & Practice</div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'admin' ? 'default' : 'outline'}
                      onClick={() => setUserType('admin')}
                      className="flex items-center space-x-2 h-auto p-4"
                    >
                      <Shield className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Admin</div>
                        <div className="text-xs opacity-70">Manage & Monitor</div>
                      </div>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="fullName" 
                      type="text" 
                      placeholder="Enter your full name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="location" 
                      type="text" 
                      placeholder="City, State"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Create {userType === 'student' ? 'Student' : 'Admin'} Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 text-center">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForms;