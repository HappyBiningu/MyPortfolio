import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGitHubRepos } from "@/hooks/useGitHubData";
import { 
  Star, 
  GitFork, 
  Eye, 
  Calendar,
  ExternalLink,
  Clock,
  Code,
  Activity
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function RepoCard({ repo, index }: { repo: any; index: number }) {
  const languageColors: { [key: string]: string } = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489", 
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    PHP: "#4F5D95",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#239120",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Dart: "#00B4AB",
    Shell: "#89e051",
    Vue: "#2c3e50",
    React: "#61DAFB"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="h-full"
    >
      <Card className="h-full glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                {repo.name}
              </CardTitle>
              <p className="text-white/70 text-sm mt-1 line-clamp-2 min-h-[2.5rem]">
                {repo.description || "No description available"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-white/60 hover:text-white hover:bg-white/10 p-2"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View repository"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Languages */}
          {repo.languages && repo.languages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {repo.languages.slice(0, 3).map((language: string) => (
                <Badge
                  key={language}
                  variant="outline"
                  className="text-xs bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div 
                    className="w-2 h-2 rounded-full mr-1" 
                    style={{ backgroundColor: languageColors[language] || "#6B7280" }}
                  />
                  {language}
                </Badge>
              ))}
              {repo.languages.length > 3 && (
                <Badge variant="outline" className="text-xs bg-white/10 text-white/60 border-white/20">
                  +{repo.languages.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                <span>{repo.forks_count}</span>
              </div>
              {repo.watchers_count > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{repo.watchers_count}</span>
                </div>
              )}
            </div>
          </div>

          {/* Last updated */}
          <div className="flex items-center gap-2 text-xs text-white/60 pt-2 border-t border-white/10">
            <Clock className="h-3 w-3" />
            <span>Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}</span>
          </div>

          {/* Primary language */}
          {repo.language && (
            <div className="flex items-center gap-2 text-xs">
              <Code className="h-3 w-3 text-white/60" />
              <span className="text-white/80">{repo.language}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="glassmorphism border-white/20 bg-white/5">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 bg-white/20" />
                <Skeleton className="h-4 w-full bg-white/20" />
                <Skeleton className="h-4 w-2/3 bg-white/20" />
              </div>
              <Skeleton className="h-8 w-8 bg-white/20" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full bg-white/20" />
              <Skeleton className="h-5 w-20 rounded-full bg-white/20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16 bg-white/20" />
              <Skeleton className="h-4 w-16 bg-white/20" />
            </div>
            <Skeleton className="h-4 w-24 bg-white/20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function GitHubRepoShowcase() {
  const { data: repos, isLoading, isError } = useGitHubRepos();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0yMCAyMGMwLTExLjA0Ni04Ljk1NC0yMC0yMC0yMHYyMGgyMHoiLz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            Live GitHub Repositories
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Explore my latest projects and contributions fetched directly from GitHub
          </p>
        </motion.div>

        {isLoading && <LoadingSkeleton />}
        
        {isError && (
          <div className="text-center text-white/60">
            <p>Failed to load repositories</p>
          </div>
        )}

        {repos && repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {repos.slice(0, 6).map((repo: any, index: number) => (
                <RepoCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <Button 
                size="lg" 
                asChild
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <a
                  href="https://github.com/HappyBiningu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View All Repositories
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}