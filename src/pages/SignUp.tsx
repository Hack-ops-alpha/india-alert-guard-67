import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, User, UserCog } from "lucide-react";

const SignUp = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: ""
  });

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    position: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studentData.password !== studentData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await register({
        name: studentData.name,
        email: studentData.email,
        password: studentData.password,
        location: `${studentData.city}, ${studentData.state}`
      }, 'student');
      
      if (success) {
        navigate('/dashboard');
      } else {
        alert('Registration failed. User may already exist.');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminData.password !== adminData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await register({
        name: adminData.name,
        email: adminData.email,
        password: adminData.password,
        organization: adminData.organization,
        position: adminData.position
      }, 'admin');
      
      if (success) {
        navigate('/dashboard');
      } else {
        alert('Registration failed. User may already exist.');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Join Beacon</h1>
          <p className="text-muted-foreground">Create your account to start learning disaster preparedness</p>
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
                <CardTitle className="text-center">Create Student Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={studentData.name}
                      onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                      required
                    />
                  </div>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-city">City</Label>
                      <Input
                        id="student-city"
                        type="text"
                        placeholder="Your city"
                        value={studentData.city}
                        onChange={(e) => setStudentData({...studentData, city: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-state">State</Label>
                      <Select onValueChange={(value) => setStudentData({...studentData, state: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="Create a password"
                      value={studentData.password}
                      onChange={(e) => setStudentData({...studentData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-confirm-password">Confirm Password</Label>
                    <Input
                      id="student-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={studentData.confirmPassword}
                      onChange={(e) => setStudentData({...studentData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Student Account"}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-primary hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Request Admin Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-name">Full Name</Label>
                    <Input
                      id="admin-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={adminData.name}
                      onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@organization.com"
                      value={adminData.email}
                      onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-organization">Organization</Label>
                    <Input
                      id="admin-organization"
                      type="text"
                      placeholder="School, College, or Organization name"
                      value={adminData.organization}
                      onChange={(e) => setAdminData({...adminData, organization: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-position">Position</Label>
                    <Input
                      id="admin-position"
                      type="text"
                      placeholder="Your role/position"
                      value={adminData.position}
                      onChange={(e) => setAdminData({...adminData, position: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Create a password"
                      value={adminData.password}
                      onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-confirm-password">Confirm Password</Label>
                    <Input
                      id="admin-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={adminData.confirmPassword}
                      onChange={(e) => setAdminData({...adminData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="secondary" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Request Admin Access"}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-primary hover:underline">
                      Sign in here
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

export default SignUp;