import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AlertSystem from "@/components/AlertSystem";
import { 
  Shield, 
  BookOpen, 
  Brain, 
  Trophy, 
  MessageSquare, 
  Users,
  Target,
  AlertTriangle,
  ArrowRight,
  Play
} from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Active Users", value: "0", icon: Users, color: "text-primary" },
    { label: "Cities Covered", value: "0", icon: Shield, color: "text-warning" },
    { label: "Alert Sources", value: "0", icon: AlertTriangle, color: "text-destructive" },
    { label: "Community Posts", value: "0", icon: MessageSquare, color: "text-info" }
  ];

  const features = [
    {
      title: "Interactive Learning",
      description: "Master disaster preparedness through engaging modules covering floods, earthquakes, cyclones, and stampedes.",
      icon: BookOpen,
      href: "/modules",
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Knowledge Testing",
      description: "Test your preparedness knowledge with comprehensive quizzes and track your progress.",
      icon: Brain,
      href: "/quiz",
      color: "bg-success/10 text-success"
    },
    {
      title: "Community Learning",
      description: "Connect with others, ask questions, and share experiences in our active community.",
      icon: MessageSquare,
      href: "/community",
      color: "bg-info/10 text-info"
    },
    {
      title: "Track Progress",
      description: "Monitor your learning journey and compete with others on the leaderboard.",
      icon: Trophy,
      href: "/leaderboard",
      color: "bg-warning/10 text-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-success/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-success to-info bg-clip-text text-transparent">
                Beacon
              </span>
              <br />
              <span className="text-foreground">Disaster Preparedness for India</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn, prepare, and stay safe with comprehensive disaster management education tailored for Indian communities. Master flood safety, earthquake preparedness, cyclone awareness, and crowd safety.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link to="/modules">
                  <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Start Learning
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/quiz">
                  <Brain className="h-5 w-5 mr-2" />
                  Take Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Alert System */}
      <section className="py-8 bg-muted/20 border-y">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-semibold">Live Disaster Alerts</h2>
          </div>
          <AlertSystem />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-muted/50 rounded-full">
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Disaster Preparedness</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build essential skills and knowledge to protect yourself and your community during natural disasters and emergencies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${feature.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button variant="ghost" asChild className="group/button p-0 h-auto">
                      <Link to={feature.href} className="flex items-center text-primary">
                        <span>Learn more</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-success/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Safety Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners across India who are building essential disaster preparedness skills. Start with our comprehensive learning modules today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/modules">
                <BookOpen className="h-5 w-5 mr-2" />
                Browse Modules
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/community">
                <MessageSquare className="h-5 w-5 mr-2" />
                Join Community
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
