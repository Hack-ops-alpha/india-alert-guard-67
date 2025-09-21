import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, UserCog } from "lucide-react";

const SignIn = () => {
  const [studentData, setStudentData] = useState({
    email: "",
    password: ""
  });

  const [adminData, setAdminData] = useState({
    email: "",
    password: ""
  });

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Student sign in:", studentData);
    // TODO: Implement student authentication
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin sign in:", adminData);
    // TODO: Implement admin authentication
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back to Beacon</h1>
          <p className="text-muted-foreground">Sign in to continue your disaster preparedness journey</p>
        </div>

        <Tabs defaultValue="student" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Student Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={studentData.email}
                      onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="Enter your password"
                      value={studentData.password}
                      onChange={(e) => setStudentData({...studentData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In as Student
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Admin Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@example.com"
                      value={adminData.email}
                      onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminData.password}
                      onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="secondary">
                    Sign In as Admin
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Need admin access?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Request admin account
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;