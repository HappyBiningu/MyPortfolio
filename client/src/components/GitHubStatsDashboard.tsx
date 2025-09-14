import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useGitHubStats } from "@/hooks/useGitHubData";
import { 
  Star, 
  GitFork, 
  BookOpen, 
  Users, 
  Activity,
  Code,
  TrendingUp,
  Github
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00c49f', 
  '#0088fe', '#ff8c42', '#8dd1e1', '#d084d0', '#87d068'
];

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  gradient: string;
  delay: number;
}

function StatCard({ icon, title, value, subtitle, gradient, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="relative overflow-hidden"
    >
      <Card className={`h-full bg-gradient-to-br ${gradient} border-0 shadow-lg`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-white/80 text-sm font-medium">{title}</p>
              <p className="text-white text-2xl font-bold">{value}</p>
              {subtitle && <p className="text-white/70 text-xs">{subtitle}</p>}
            </div>
            <div className="text-white/60 p-3 bg-white/10 rounded-full backdrop-blur-sm">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LanguageChart({ languages }: { languages: any[] }) {
  const pieData = languages.slice(0, 6).map((lang, index) => ({
    name: lang.language,
    value: parseFloat(lang.percentage),
    color: COLORS[index % COLORS.length]
  }));

  const barData = languages.slice(0, 8);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <Card className="glassmorphism border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code className="h-5 w-5" />
            Language Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1000}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: any) => [`${value}%`, 'Usage']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-4">
            {pieData.map((lang, index) => (
              <Badge 
                key={lang.name} 
                variant="outline" 
                className="bg-white/10 text-white border-white/20"
                style={{ borderColor: lang.color }}
              >
                <div 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: lang.color }}
                />
                {lang.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="glassmorphism border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Languages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="language" 
                tick={{ fill: 'white', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: 'white', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: any) => [`${value}%`, 'Usage']}
              />
              <Bar 
                dataKey="percentage" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              >
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glassmorphism border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-16 bg-white/20" />
                  <Skeleton className="h-8 w-12 bg-white/20" />
                  <Skeleton className="h-3 w-20 bg-white/20" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-white/10">
          <CardHeader>
            <Skeleton className="h-6 w-40 bg-white/20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full bg-white/20" />
          </CardContent>
        </Card>
        <Card className="glassmorphism border-white/10">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-white/20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full bg-white/20" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function GitHubStatsDashboard() {
  const { data: stats, isLoading, isError } = useGitHubStats();

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              GitHub Analytics Dashboard
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Live insights into my coding journey and development patterns
            </p>
          </motion.div>
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (isError || !stats) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            GitHub Analytics Dashboard
          </h2>
          <p className="text-white/60">Failed to load GitHub statistics</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Github className="h-8 w-8" />
            GitHub Analytics Dashboard
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Live insights into my coding journey and development patterns
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Repositories"
            value={stats?.stats?.totalRepos || 0}
            subtitle="Public projects"
            gradient="from-blue-500 to-purple-600"
            delay={0.1}
          />
          <StatCard
            icon={<Star className="h-6 w-6" />}
            title="Total Stars"
            value={stats?.stats?.totalStars || 0}
            subtitle="Community appreciation"
            gradient="from-yellow-500 to-orange-600"
            delay={0.2}
          />
          <StatCard
            icon={<GitFork className="h-6 w-6" />}
            title="Total Forks"
            value={stats?.stats?.totalForks || 0}
            subtitle="Project contributions"
            gradient="from-green-500 to-teal-600"
            delay={0.3}
          />
          <StatCard
            icon={<Users className="h-6 w-6" />}
            title="Followers"
            value={stats?.profile?.followers || 0}
            subtitle="Developer network"
            gradient="from-purple-500 to-pink-600"
            delay={0.4}
          />
        </div>

        {/* Language Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <LanguageChart languages={stats?.languages || []} />
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8"
        >
          <Card className="glassmorphism border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Developer Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{stats?.profile?.name || 'Tinotenda Happy'}</h3>
                    <p className="text-white/60">@{stats?.profile?.login || 'HappyBiningu'}</p>
                  </div>
                  {stats?.profile?.bio && (
                    <p className="text-white/80">{stats.profile.bio}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Public Repositories</span>
                    <span className="text-white font-semibold">{stats?.profile?.public_repos || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Following</span>
                    <span className="text-white font-semibold">{stats?.profile?.following || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Followers</span>
                    <span className="text-white font-semibold">{stats?.profile?.followers || 0}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}