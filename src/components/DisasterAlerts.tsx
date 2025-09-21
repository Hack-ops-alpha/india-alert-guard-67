import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, CheckCircle, X, Bell, BellOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DisasterAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  location: string;
  timestamp: Date;
  isRead: boolean;
}

const DisasterAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if notifications are supported and get permission
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
      } else if (Notification.permission === 'default') {
        // Auto-request permission when component mounts
        requestNotificationPermission();
      }
    }

    // Load existing alerts from localStorage
    const savedAlerts = localStorage.getItem('beacon_alerts');
    if (savedAlerts) {
      const parsedAlerts = JSON.parse(savedAlerts).map((alert: any) => ({
        ...alert,
        timestamp: new Date(alert.timestamp)
      }));
      setAlerts(parsedAlerts);
    } else {
      // Add some demo alerts
      generateDemoAlerts();
    }

    // Simulate real-time alerts (in production, this would be from a real API)
    const alertInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every interval
        generateRandomAlert();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(alertInterval);
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive push notifications for disaster alerts.",
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const generateDemoAlerts = () => {
    const demoAlerts: DisasterAlert[] = [
      {
        id: '1',
        type: 'critical',
        title: 'Cyclone Alert',
        message: 'Severe cyclonic storm approaching coastal areas. Immediate evacuation recommended for low-lying areas.',
        location: 'Odisha Coast',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: false
      },
      {
        id: '2',
        type: 'warning',
        title: 'Heavy Rainfall Warning',
        message: 'Heavy to very heavy rainfall expected in the next 24 hours. Risk of flash floods in urban areas.',
        location: 'Mumbai, Maharashtra',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isRead: false
      },
      {
        id: '3',
        type: 'info',
        title: 'Earthquake Preparedness Drill',
        message: 'Scheduled earthquake preparedness drill tomorrow at 10 AM. All residents are advised to participate.',
        location: 'Delhi NCR',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        isRead: true
      }
    ];
    
    setAlerts(demoAlerts);
    localStorage.setItem('beacon_alerts', JSON.stringify(demoAlerts));
  };

  const generateRandomAlert = () => {
    const alertTypes = [
      {
        type: 'critical' as const,
        titles: ['Earthquake Alert', 'Tsunami Warning', 'Severe Cyclone Alert'],
        messages: [
          'Immediate evacuation required from coastal areas.',
          'Seek higher ground immediately.',
          'Move to designated safe zones now.'
        ]
      },
      {
        type: 'warning' as const,
        titles: ['Flood Warning', 'Landslide Risk', 'Heat Wave Alert'],
        messages: [
          'Avoid travel in affected areas.',
          'Stay indoors and keep hydrated.',
          'Follow local authority guidelines.'
        ]
      },
      {
        type: 'info' as const,
        titles: ['Weather Update', 'Safety Reminder', 'Preparedness Tips'],
        messages: [
          'Check your emergency kit.',
          'Review evacuation routes.',
          'Stay informed through official channels.'
        ]
      }
    ];

    const locations = ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad', 'Pune', 'Ahmedabad'];
    
    const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const randomTitle = randomType.titles[Math.floor(Math.random() * randomType.titles.length)];
    const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];

    const newAlert: DisasterAlert = {
      id: Date.now().toString(),
      type: randomType.type,
      title: randomTitle,
      message: randomMessage,
      location: randomLocation,
      timestamp: new Date(),
      isRead: false
    };

    setAlerts(prev => {
      const updated = [newAlert, ...prev];
      localStorage.setItem('beacon_alerts', JSON.stringify(updated));
      return updated;
    });

    // Show push notification if enabled
    if (notificationsEnabled && newAlert.type === 'critical') {
      showPushNotification(newAlert);
    }

    // Show toast notification
    toast({
      title: `${newAlert.type.toUpperCase()}: ${newAlert.title}`,
      description: `${newAlert.location} - ${newAlert.message}`,
      variant: newAlert.type === 'critical' ? 'destructive' : 'default',
    });
  };

  const showPushNotification = (alert: DisasterAlert) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(`Beacon Alert: ${alert.title}`, {
        body: `${alert.location} - ${alert.message}`,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: alert.id,
        requireInteraction: alert.type === 'critical',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 10 seconds for non-critical alerts
      if (alert.type !== 'critical') {
        setTimeout(() => notification.close(), 10000);
      }
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => {
      const updated = prev.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      );
      localStorage.setItem('beacon_alerts', JSON.stringify(updated));
      return updated;
    });
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => {
      const updated = prev.filter(alert => alert.id !== alertId);
      localStorage.setItem('beacon_alerts', JSON.stringify(updated));
      return updated;
    });
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Disaster Alerts</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={requestNotificationPermission}
            disabled={notificationsEnabled}
            className="flex items-center space-x-1"
          >
            {notificationsEnabled ? (
              <>
                <Bell className="h-4 w-4" />
                <span>Enabled</span>
              </>
            ) : (
              <>
                <BellOff className="h-4 w-4" />
                <span>Enable Notifications</span>
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
            <p>No active disaster alerts</p>
            <p className="text-sm">Stay prepared and stay safe!</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.type === 'critical'
                  ? 'border-l-destructive'
                  : alert.type === 'warning'
                  ? 'border-l-yellow-500'
                  : 'border-l-blue-500'
              } ${!alert.isRead ? 'bg-accent/20' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge variant={getAlertBadgeVariant(alert.type)}>
                          {alert.type}
                        </Badge>
                        {!alert.isRead && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{alert.location}</span>
                        <span>{alert.timestamp.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {!alert.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(alert.id)}
                        className="h-8 w-8 p-0"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DisasterAlerts;