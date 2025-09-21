import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, 
  Waves, 
  Wind, 
  Mountain, 
  MapPin, 
  Clock,
  X,
  Volume2,
  VolumeX,
  Search
} from "lucide-react";

const activeAlerts = [
  {
    id: 1,
    type: "flood",
    severity: "high",
    title: "Flash Flood Warning",
    description: "Heavy rainfall expected in Mumbai region. Avoid low-lying areas and underpasses.",
    location: "Mumbai, Maharashtra",
    issuedAt: "15 minutes ago",
    icon: Waves,
    source: "IMD Mumbai"
  },
  {
    id: 2,
    type: "cyclone",
    severity: "medium",
    title: "Cyclone Watch",
    description: "Cyclone Biparjoy moving towards Gujarat coast. Fishermen advised not to venture into sea.",
    location: "Gujarat Coast",
    issuedAt: "2 hours ago",
    icon: Wind,
    source: "NDMA"
  }
];

const recentAlerts = [
  {
    id: 3,
    type: "earthquake",
    severity: "low",
    title: "Earthquake Advisory",
    description: "Minor tremors felt in Delhi-NCR region. No damage reported.",
    location: "Delhi-NCR",
    issuedAt: "6 hours ago",
    icon: Mountain,
    source: "National Seismology Centre"
  }
];

const getSeverityConfig = (severity: string) => {
  switch (severity) {
    case "high":
      return {
        variant: "destructive" as const,
        badgeColor: "bg-destructive",
        textColor: "text-destructive-foreground"
      };
    case "medium":
      return {
        variant: "default" as const,
        badgeColor: "bg-warning",
        textColor: "text-warning-foreground"
      };
    case "low":
      return {
        variant: "default" as const,
        badgeColor: "bg-info",
        textColor: "text-info-foreground"
      };
    default:
      return {
        variant: "default" as const,
        badgeColor: "bg-muted",
        textColor: "text-muted-foreground"
      };
  }
};

const AlertSystem = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  const [userCity, setUserCity] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const dismissAlert = (alertId: number) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const handleCitySearch = () => {
    if (userCity.trim()) {
      setHasSearched(true);
    }
  };

  const getCitySpecificAlerts = () => {
    if (!hasSearched || !userCity.trim()) return [];
    
    // Mock city-specific alerts based on user input
    const cityLower = userCity.toLowerCase();
    
    if (cityLower.includes('mumbai') || cityLower.includes('maharashtra')) {
      return [
        {
          id: 1,
          type: "flood",
          severity: "high",
          title: "Heavy Rainfall Alert - Mumbai",
          description: "Intense rainfall expected in Mumbai region. Avoid low-lying areas and underpasses. Local trains may face delays.",
          location: userCity,
          issuedAt: "15 minutes ago",
          icon: Waves,
          source: "IMD Mumbai"
        }
      ];
    } else if (cityLower.includes('delhi') || cityLower.includes('ncr')) {
      return [
        {
          id: 2,
          type: "air_quality",
          severity: "medium",
          title: "Air Quality Advisory - Delhi NCR",
          description: "Air quality index expected to remain in 'Poor' category. Sensitive individuals should limit outdoor activities.",
          location: userCity,
          issuedAt: "1 hour ago",
          icon: Wind,
          source: "CPCB Delhi"
        }
      ];
    } else if (cityLower.includes('gujarat') || cityLower.includes('ahmedabad')) {
      return [
        {
          id: 3,
          type: "heat",
          severity: "high",
          title: "Heat Wave Warning - Gujarat",
          description: "Severe heat wave conditions expected. Temperature may reach 45°C. Stay hydrated and avoid outdoor activities during peak hours.",
          location: userCity,
          issuedAt: "30 minutes ago",
          icon: AlertTriangle,
          source: "IMD Ahmedabad"
        }
      ];
    }
    
    return [
      {
        id: 4,
        type: "general",
        severity: "low",
        title: `Weather Advisory - ${userCity}`,
        description: "No active weather warnings for your area. Stay updated with local authorities for any changes.",
        location: userCity,
        issuedAt: "2 hours ago",
        icon: MapPin,
        source: "Local Weather Service"
      }
    ];
  };

  const visibleActiveAlerts = getCitySpecificAlerts().filter(alert => !dismissedAlerts.includes(alert.id));

  return (
    <div className="space-y-6">
      {/* City Input */}
      {!hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Get Alerts for Your Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="city">Enter your city</Label>
                <Input
                  id="city"
                  placeholder="e.g., Mumbai, Delhi, Bangalore, Chennai..."
                  value={userCity}
                  onChange={(e) => setUserCity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
                />
              </div>
              <Button 
                onClick={handleCitySearch}
                disabled={!userCity.trim()}
                className="sm:mt-6"
              >
                <Search className="h-4 w-4 mr-2" />
                Get Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Alerts for {userCity}</span>
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setHasSearched(false);
                  setUserCity("");
                  setDismissedAlerts([]);
                }}
              >
                Change City
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              >
                {isSoundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {visibleActiveAlerts.map((alert) => {
            const Icon = alert.icon;
            const severityConfig = getSeverityConfig(alert.severity);
            
            return (
              <Alert key={alert.id} variant={severityConfig.variant} className="relative">
                <Icon className="h-4 w-4" />
                <div className="flex-1">
                  <AlertTitle className="flex items-center space-x-2">
                    <span>{alert.title}</span>
                    <Badge className={`text-xs ${severityConfig.badgeColor} ${severityConfig.textColor}`}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    {alert.description}
                  </AlertDescription>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{alert.issuedAt}</span>
                    </div>
                    <span>• {alert.source}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => dismissAlert(alert.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Alert>
            );
          })}
        </div>
      )}

      {/* Recent Alerts */}
      {hasSearched && (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => {
              const Icon = alert.icon;
              const severityConfig = getSeverityConfig(alert.severity);
              
              return (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                  <div className={`p-2 rounded-lg ${severityConfig.badgeColor}/10`}>
                    <Icon className={`h-4 w-4 ${severityConfig.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{alert.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.issuedAt}</span>
                      </div>
                      <span>• {alert.source}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      )}

      {/* Alert Sources */}
      {hasSearched && (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alert Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "NDMA", description: "National Disaster Management Authority", status: "Active" },
              { name: "IMD", description: "India Meteorological Department", status: "Active" },
              { name: "ISRO/Bhuvan", description: "Space-based monitoring", status: "Active" },
              { name: "SACHET", description: "State Alert Communication Hub", status: "Active" }
            ].map((source) => (
              <div key={source.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{source.name}</h4>
                  <p className="text-sm text-muted-foreground">{source.description}</p>
                </div>
                <Badge variant="default" className="bg-success">
                  {source.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
};

export default AlertSystem;