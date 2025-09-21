import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Waves, 
  Mountain, 
  Wind, 
  Users,
  Clock,
  BookOpen
} from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Flood Preparedness",
    description: "Learn about flood risks, early warning signs, and safety measures during floods.",
    icon: Waves,
    color: "info",
    duration: "25 min",
    lessons: 6
  },
  {
    id: 2,
    title: "Earthquake Safety",
    description: "Understand earthquake preparation, during-event actions, and recovery procedures.",
    icon: Mountain,
    color: "warning",
    duration: "30 min",
    lessons: 8
  },
  {
    id: 3,
    title: "Cyclone Awareness",
    description: "Cyclone formation, warning systems, and protection strategies for coastal areas.",
    icon: Wind,
    color: "primary",
    duration: "20 min",
    lessons: 5
  },
  {
    id: 4,
    title: "Stampede Prevention",
    description: "Crowd safety, emergency exits, and prevention of human stampedes.",
    icon: Users,
    color: "destructive",
    duration: "15 min",
    lessons: 4
  }
];

const Modules = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Modules</h1>
        <p className="text-muted-foreground">
          Master disaster preparedness through comprehensive learning modules designed for Indian scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${module.color}/10`}>
                      <Icon className={`h-6 w-6 text-${module.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{module.lessons} lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{module.description}</p>
                
                <Button className="w-full">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Modules;