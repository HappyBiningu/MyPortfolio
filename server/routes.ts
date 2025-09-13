import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { Octokit } from '@octokit/rest';

// In-memory cache for GitHub API responses
interface CacheItem {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheItem>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

function getCachedData(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  if (cached) {
    cache.delete(key); // Remove expired cache
  }
  return null;
}

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// GitHub API client setup
async function getGitHubClient() {
  let connectionSettings;

  async function getAccessToken() {
    if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
      return connectionSettings.settings.access_token;
    }
    
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!xReplitToken) {
      throw new Error('X_REPLIT_TOKEN not found for repl/depl');
    }

    connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

    if (!connectionSettings || !accessToken) {
      throw new Error('GitHub not connected');
    }
    return accessToken;
  }

  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json({ message: "Contact message sent successfully", contact });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Invalid contact form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to send contact message" });
      }
    }
  });

  // GitHub API endpoints
  app.get("/api/github/profile", async (req, res) => {
    try {
      const cacheKey = 'github:profile:HappyBiningu';
      const cached = getCachedData(cacheKey);
      
      if (cached) {
        return res.json(cached);
      }

      const octokit = await getGitHubClient();
      const { data: user } = await octokit.rest.users.getByUsername({
        username: 'HappyBiningu'
      });
      
      setCachedData(cacheKey, user);
      res.json(user);
    } catch (error) {
      console.error('GitHub profile error:', error);
      res.status(500).json({ message: "Failed to fetch GitHub profile" });
    }
  });

  app.get("/api/github/repos", async (req, res) => {
    try {
      const octokit = await getGitHubClient();
      const { data: repos } = await octokit.rest.repos.listForUser({
        username: 'HappyBiningu',
        sort: 'updated',
        per_page: 10
      });
      
      // Get additional details for each repo
      const reposWithDetails = await Promise.all(
        repos.map(async (repo) => {
          try {
            const { data: languages } = await octokit.rest.repos.listLanguages({
              owner: 'HappyBiningu',
              repo: repo.name
            });
            
            return {
              ...repo,
              languages: Object.keys(languages)
            };
          } catch (langError) {
            return {
              ...repo,
              languages: []
            };
          }
        })
      );
      
      res.json(reposWithDetails);
    } catch (error) {
      console.error('GitHub repos error:', error);
      res.status(500).json({ message: "Failed to fetch GitHub repositories" });
    }
  });

  app.get("/api/github/activity", async (req, res) => {
    try {
      const octokit = await getGitHubClient();
      const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
        username: 'HappyBiningu',
        per_page: 10
      });
      res.json(events);
    } catch (error) {
      console.error('GitHub activity error:', error);
      res.status(500).json({ message: "Failed to fetch GitHub activity" });
    }
  });

  app.get("/api/github/stats", async (req, res) => {
    try {
      const octokit = await getGitHubClient();
      
      // Get user profile
      const { data: user } = await octokit.rest.users.getByUsername({
        username: 'HappyBiningu'
      });
      
      // Get all repositories for language stats
      const { data: allRepos } = await octokit.rest.repos.listForUser({
        username: 'HappyBiningu',
        per_page: 100
      });
      
      // Aggregate language data
      const languageStats = {};
      let totalStars = 0;
      let totalForks = 0;
      
      for (const repo of allRepos) {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
        
        try {
          const { data: languages } = await octokit.rest.repos.listLanguages({
            owner: 'HappyBiningu',
            repo: repo.name
          });
          
          Object.entries(languages).forEach(([lang, bytes]) => {
            languageStats[lang] = (languageStats[lang] || 0) + bytes;
          });
        } catch (langError) {
          // Skip language stats for this repo if error
        }
      }
      
      // Calculate language percentages
      const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);
      const languagePercentages = Object.entries(languageStats)
        .map(([lang, bytes]) => ({
          language: lang,
          percentage: ((bytes / totalBytes) * 100).toFixed(1)
        }))
        .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
        .slice(0, 8); // Top 8 languages
      
      res.json({
        profile: {
          login: user.login,
          name: user.name,
          bio: user.bio,
          public_repos: user.public_repos,
          followers: user.followers,
          following: user.following
        },
        stats: {
          totalStars,
          totalForks,
          totalRepos: allRepos.length
        },
        languages: languagePercentages
      });
    } catch (error) {
      console.error('GitHub stats error:', error);
      res.status(500).json({ message: "Failed to fetch GitHub statistics" });
    }
  });

  // Live data endpoints for real-time features
  app.get("/api/crypto/bitcoin", async (req, res) => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
      const data = await response.json();
      res.json({
        price: data.bitcoin.usd,
        change24h: data.bitcoin.usd_24h_change
      });
    } catch (error) {
      console.error('Crypto API error:', error);
      res.status(500).json({ message: "Failed to fetch cryptocurrency data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
