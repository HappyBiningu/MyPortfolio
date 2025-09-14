import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  hardcodedGitHubProfile, 
  hardcodedGitHubRepos, 
  hardcodedGitHubActivity, 
  hardcodedGitHubStats 
} from "@/lib/hardcodedGitHubData";

// Helper function to detect if we're on Netlify or API is unavailable
const isStaticDeployment = () => {
  return window.location.hostname.includes('netlify.app') || 
         window.location.hostname.includes('github.io') ||
         !window.location.hostname.includes('replit');
};

// GitHub Profile Hook
export function useGitHubProfile() {
  return useQuery({
    queryKey: ["/api/github/profile"],
    queryFn: async () => {
      if (isStaticDeployment()) {
        return hardcodedGitHubProfile;
      }
      try {
        return await apiRequest("/api/github/profile");
      } catch (error) {
        console.warn("API unavailable, using hardcoded data:", error);
        return hardcodedGitHubProfile;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: isStaticDeployment() ? 0 : 2,
  });
}

// GitHub Repositories Hook
export function useGitHubRepos() {
  return useQuery({
    queryKey: ["/api/github/repos"],
    queryFn: async () => {
      if (isStaticDeployment()) {
        return hardcodedGitHubRepos;
      }
      try {
        return await apiRequest("/api/github/repos");
      } catch (error) {
        console.warn("API unavailable, using hardcoded data:", error);
        return hardcodedGitHubRepos;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: isStaticDeployment() ? 0 : 2,
  });
}

// GitHub Activity Hook
export function useGitHubActivity() {
  return useQuery({
    queryKey: ["/api/github/activity"],
    queryFn: async () => {
      if (isStaticDeployment()) {
        return hardcodedGitHubActivity;
      }
      try {
        return await apiRequest("/api/github/activity");
      } catch (error) {
        console.warn("API unavailable, using hardcoded data:", error);
        return hardcodedGitHubActivity;
      }
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: isStaticDeployment() ? 0 : 2,
  });
}

// GitHub Statistics Hook
export function useGitHubStats() {
  return useQuery({
    queryKey: ["/api/github/stats"],
    queryFn: async () => {
      if (isStaticDeployment()) {
        return hardcodedGitHubStats;
      }
      try {
        return await apiRequest("/api/github/stats");
      } catch (error) {
        console.warn("API unavailable, using hardcoded data:", error);
        return hardcodedGitHubStats;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: isStaticDeployment() ? 0 : 2,
  });
}


// Combined GitHub data hook for dashboard
export function useGitHubDashboard() {
  const profile = useGitHubProfile();
  const repos = useGitHubRepos();
  const stats = useGitHubStats();
  const activity = useGitHubActivity();

  return {
    profile,
    repos,
    stats,
    activity,
    isLoading: profile.isLoading || repos.isLoading || stats.isLoading || activity.isLoading,
    isError: profile.isError || repos.isError || stats.isError || activity.isError,
  };
}