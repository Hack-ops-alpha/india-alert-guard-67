import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

const leaderboardData = {
  overall: [],
  weekly: []
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-warning" />;
    case 2:
      return <Medal className="h-5 w-5 text-muted-foreground" />;
    case 3:
      return <Award className="h-5 w-5 text-warning/60" />;
    default:
      return <span className="text-muted-foreground font-bold">#{rank}</span>;
  }
};

const getRankBg = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-warning/10 to-warning/5";
    case 2:
      return "bg-muted/30";
    case 3:
      return "bg-warning/5";
    default:
      return "bg-card";
  }
};

const LeaderboardList = ({ data }: { data: typeof leaderboardData.overall }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No rankings yet</h3>
        <p className="text-muted-foreground mb-4">
          Complete modules and quizzes to start climbing the leaderboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((user) => (
        <Card key={user.rank} className={`${getRankBg(user.rank)} border-l-4 ${
          user.rank === 1 ? 'border-l-warning' :
          user.rank === 2 ? 'border-l-muted-foreground' :
          user.rank === 3 ? 'border-l-warning/60' : 'border-l-transparent'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(user.rank)}
                </div>
                
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.location}</p>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="font-bold text-lg text-primary">{user.score}</div>
                <Badge variant="secondary" className="text-xs">
                  {user.badges} badges
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you rank among disaster preparedness champions across India.
        </p>
      </div>


      <Tabs defaultValue="overall" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overall" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Overall</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>This Week</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall">
          <LeaderboardList data={leaderboardData.overall} />
        </TabsContent>
        
        <TabsContent value="weekly">
          <LeaderboardList data={leaderboardData.weekly} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;