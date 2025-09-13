import { motion } from "framer-motion";
import { useGitHubActivity } from "@/hooks/useGitHubData";
import { Clock, GitCommit, Star, GitFork } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function ActivityItem({ event, index }: { event: any; index: number }) {
  const getEventIcon = () => {
    switch (event.type) {
      case "PushEvent":
        return <GitCommit className="h-3 w-3" />;
      case "WatchEvent":
        return <Star className="h-3 w-3" />;
      case "ForkEvent":
        return <GitFork className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getEventDescription = () => {
    switch (event.type) {
      case "PushEvent":
        const commits = event.payload?.commits?.length || 0;
        return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${event.repo.name}`;
      case "WatchEvent":
        return `Starred ${event.repo.name}`;
      case "ForkEvent":
        return `Forked ${event.repo.name}`;
      case "CreateEvent":
        return `Created ${event.payload.ref_type} in ${event.repo.name}`;
      default:
        return `${event.type.replace('Event', '')} in ${event.repo.name}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/80 whitespace-nowrap"
    >
      <div className="text-primary">
        {getEventIcon()}
      </div>
      <span className="font-medium">
        {getEventDescription()}
      </span>
      <span className="text-white/60">
        {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
      </span>
    </motion.div>
  );
}

export default function GitHubActivityTicker() {
  const { data: activity, isLoading } = useGitHubActivity();

  if (isLoading || !activity?.length) {
    return (
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-4"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/60 whitespace-nowrap"
            >
              <div className="w-3 h-3 bg-white/20 rounded-full animate-pulse" />
              <div className="w-32 h-3 bg-white/20 rounded animate-pulse" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  const recentActivity = activity.slice(0, 5);

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-6"
      >
        {recentActivity.map((event: any, index: number) => (
          <ActivityItem key={`${event.id}-${index}`} event={event} index={index} />
        ))}
        {/* Duplicate for seamless loop */}
        {recentActivity.map((event: any, index: number) => (
          <ActivityItem key={`${event.id}-dup-${index}`} event={event} index={index} />
        ))}
      </motion.div>
    </div>
  );
}