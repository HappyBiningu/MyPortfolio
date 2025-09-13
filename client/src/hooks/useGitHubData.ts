import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// GitHub Profile Hook
export function useGitHubProfile() {
  return useQuery({
    queryKey: ["/api/github/profile"],
    queryFn: () => apiRequest("/api/github/profile"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

// GitHub Repositories Hook
export function useGitHubRepos() {
  return useQuery({
    queryKey: ["/api/github/repos"],
    queryFn: () => apiRequest("/api/github/repos"),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
}

// GitHub Activity Hook
export function useGitHubActivity() {
  return useQuery({
    queryKey: ["/api/github/activity"],
    queryFn: () => apiRequest("/api/github/activity"),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 2,
  });
}

// GitHub Statistics Hook
export function useGitHubStats() {
  return useQuery({
    queryKey: ["/api/github/stats"],
    queryFn: () => apiRequest("/api/github/stats"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

// Bitcoin Price Hook
export function useBitcoinPrice() {
  return useQuery({
    queryKey: ["/api/crypto/bitcoin"],
    queryFn: () => apiRequest("/api/crypto/bitcoin"),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
    retry: 2,
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