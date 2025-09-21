import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  Calendar,
  Bell,
  Users,
  BarChart3,
  Shield
} from "lucide-react";

const dashboardData = {
  student: {
    progress: {
      modulesCompleted: 0,
      totalModules: 4,
      quizzesCompleted: 0,
      totalQuizzes: 12,
      overallProgress: 0
    },
    recentActivity: []
  },
  admin: {
    stats: {
      totalStudents: 0,
      activeToday: 0,
      quizzesCompleted: 0,
      averageScore: 0
    },
    upcomingDrills: []
  }
};

const StudentDashboard = () => (
  <div className="space-y-6">
    {/* Progress Overview */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">0%</div>
          <p className="text-xs text-muted-foreground">
            0 of 4 modules completed
          </p>
          <Progress value={0} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-muted-foreground">-</div>
          <p className="text-xs text-muted-foreground">
            0 total points
          </p>
          <Badge variant="secondary" className="mt-2">0 badges earned</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quiz Average</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-muted-foreground">-</div>
          <p className="text-xs text-muted-foreground">
            0 quizzes completed
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Recent Activity */}
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
          <p className="text-muted-foreground">
            Start learning modules and taking quizzes to see your activity here.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const AdminDashboard = () => (
  <div className="space-y-6">
    {/* Admin Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            No students registered yet
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Today</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">0</div>
          <p className="text-xs text-muted-foreground">
            No active users today
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            This week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-muted-foreground">-%</div>
          <p className="text-xs text-muted-foreground">
            No data available
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Upcoming Drills */}
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Upcoming Emergency Drills</CardTitle>
        <Button size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Drill
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No drills scheduled</h3>
          <p className="text-muted-foreground mb-4">
            Schedule emergency drills to prepare students for disaster scenarios.
          </p>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule First Drill
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your progress and manage disaster preparedness activities.
        </p>
      </div>

      <Tabs defaultValue="student" className="space-y-6">
        <TabsList>
          <TabsTrigger value="student">Student View</TabsTrigger>
          <TabsTrigger value="admin">Admin View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student">
          <StudentDashboard />
        </TabsContent>
        
        <TabsContent value="admin">
          <AdminDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;