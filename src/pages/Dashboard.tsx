import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import DisasterAlerts from "@/components/DisasterAlerts";
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Track your disaster preparedness progress</p>
        </div>

        {/* Disaster Alerts Section */}
        <div className="mb-8">
          <DisasterAlerts />
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25%</div>
              <p className="text-xs text-muted-foreground">
                1 of 4 modules completed
              </p>
              <Progress value={25} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Performance</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Average score this week
              </p>
              <Badge variant="secondary" className="mt-2 text-green-600">+5% from last week</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#12</div>
              <p className="text-xs text-muted-foreground">
                Out of 150 students
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-success mr-1" />
                <span className="text-xs text-success">Moving up!</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Earthquake Safety</h4>
                    <p className="text-sm text-muted-foreground">Learn about earthquake preparedness</p>
                    <Progress value={65} className="mt-2" />
                  </div>
                  <Button size="sm">Continue</Button>
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg opacity-50">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Flood Safety</h4>
                    <p className="text-sm text-muted-foreground">Understanding flood risks and safety</p>
                    <Badge variant="secondary" className="mt-2 text-green-600">Completed</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Completed Quiz: "Flood Emergency Response"</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="secondary" className="text-green-600">90%</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Earned badge: "Safety First"</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                  <Trophy className="h-4 w-4 text-success" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Started module: "Earthquake Safety"</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
            <CardDescription>Continue building your disaster preparedness knowledge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <Target className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">Take a Quiz</h4>
                <p className="text-sm text-muted-foreground mb-4">Test your knowledge with our latest quiz</p>
                <Button size="sm" className="w-full">Start Quiz</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">Join Discussion</h4>
                <p className="text-sm text-muted-foreground mb-4">Share experiences with the community</p>
                <Button size="sm" variant="outline" className="w-full">Visit Community</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <BookOpen className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">Learn Module</h4>
                <p className="text-sm text-muted-foreground mb-4">Continue with the next learning module</p>
                <Button size="sm" variant="outline" className="w-full">Browse Modules</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;