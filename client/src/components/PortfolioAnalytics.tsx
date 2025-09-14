
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock, TrendingUp, Users } from 'lucide-react';

interface AnalyticsData {
  visitors: number;
  timeOnSite: string;
  topProjects: string[];
  skillInteractions: { [key: string]: number };
}

export default function PortfolioAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Simulate analytics data - replace with real analytics API
    const mockData: AnalyticsData = {
      visitors: Math.floor(Math.random() * 1000) + 500,
      timeOnSite: `${Math.floor(Math.random() * 5) + 2}m ${Math.floor(Math.random() * 60)}s`,
      topProjects: ['ML Demo', 'Live Data', 'Code Lab'],
      skillInteractions: {
        'Python': Math.floor(Math.random() * 100) + 50,
        'React': Math.floor(Math.random() * 80) + 40,
        'Machine Learning': Math.floor(Math.random() * 120) + 60,
        'Data Analysis': Math.floor(Math.random() * 90) + 45,
      }
    };
    setAnalytics(mockData);
  }, []);

  if (!analytics) return null;

  return (
    <Card className="glassmorphism-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Portfolio Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Visitors</span>
            <Badge variant="secondary">{analytics.visitors}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Avg. Time</span>
            <Badge variant="secondary">{analytics.timeOnSite}</Badge>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            Most Viewed Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(analytics.skillInteractions)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([skill, count]) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill} ({count})
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
