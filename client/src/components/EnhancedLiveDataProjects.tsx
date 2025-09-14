import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGitHubStats } from "@/hooks/useGitHubData";
import { 
  TrendingUp, 
  Activity,
  Code,
  GitCommit,
  Calendar,
  Zap,
  BarChart3
} from "lucide-react";
import { useState } from "react";


function GitHubStatsCard() {
  const { data: stats, isLoading } = useGitHubStats();

  if (isLoading) {
    return (
      <Card className="glassmorphism border-white/20 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Coding Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-20 bg-white/20" />
              <Skeleton className="h-4 w-12 bg-white/20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card className="glassmorphism border-white/20 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Coding Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/60">Failed to load GitHub stats</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          Live Coding Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              <span className="text-white/80 text-sm">Repositories</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.stats.totalRepos}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              <span className="text-white/80 text-sm">Stars</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.stats.totalStars}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-green-400" />
              <span className="text-white/80 text-sm">Forks</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.stats.totalForks}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-white/80 text-sm">Languages</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.languages.length}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-white/60 text-sm mb-2">Top Languages</p>
          <div className="space-y-2">
            {stats.languages.slice(0, 3).map((lang: any, index: number) => (
              <div key={lang.language} className="flex justify-between items-center">
                <span className="text-white/80 text-sm">{lang.language}</span>
                <span className="text-primary font-semibold text-sm">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContributionHeatmap() {
  // Mock contribution data - in a real app, this would come from GitHub API
  const generateMockData = () => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 5),
      });
    }
    return data.reverse();
  };

  const [contributionData] = useState(generateMockData());

  const getIntensityColor = (count: number) => {
    const colors = [
      'rgb(235, 237, 240)', // 0 contributions
      'rgb(155, 233, 168)', // 1 contribution
      'rgb(64, 196, 99)',   // 2 contributions
      'rgb(48, 161, 78)',   // 3 contributions
      'rgb(33, 110, 57)'    // 4+ contributions
    ];
    return colors[Math.min(count, 4)];
  };

  return (
    <Card className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-400" />
          Contribution Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-52 gap-1 mb-4" style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}>
          {contributionData.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.001 }}
              className="w-3 h-3 rounded-sm border border-white/10"
              style={{ backgroundColor: getIntensityColor(day.count) }}
              title={`${day.date}: ${day.count} contributions`}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm border border-white/10"
                style={{ backgroundColor: getIntensityColor(level) }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EnhancedLiveDataProjects() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjOUM5MkFDIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiLz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-white mb-4 flex items-center justify-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Live Data & Analytics
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Real-time data insights and interactive visualizations showcasing coding statistics and development activity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GitHubStatsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContributionHeatmap />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">Data updates in real-time</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}