import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { getGitHubProfile, getGitHubRepos, getGitHubActivity, getGitHubStats } from "./github-client";


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

  // GitHub API endpoints - using real GitHub data
  app.get("/api/github/profile", async (req, res) => {
    try {
      console.log("Fetching real GitHub profile data for HappyBiningu");
      const profile = await getGitHubProfile('HappyBiningu');
      res.json(profile);
    } catch (error) {
      console.error('GitHub profile error:', error);
      res.status(500).json({ message: "GitHub data unavailable", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.get("/api/github/repos", async (req, res) => {
    try {
      console.log("Fetching real GitHub repository data for HappyBiningu");
      const repos = await getGitHubRepos('HappyBiningu', 10);
      res.json(repos);
    } catch (error) {
      console.error('GitHub repos error:', error);
      res.status(500).json({ message: "GitHub repos unavailable", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.get("/api/github/activity", async (req, res) => {
    try {
      console.log("Fetching real GitHub activity data for HappyBiningu");
      const activity = await getGitHubActivity('HappyBiningu');
      res.json(activity);
    } catch (error) {
      console.error('GitHub activity error:', error);
      res.status(500).json({ message: "GitHub activity unavailable", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.get("/api/github/stats", async (req, res) => {
    try {
      console.log("Fetching real GitHub statistics data for HappyBiningu");
      const stats = await getGitHubStats('HappyBiningu');
      res.json(stats);
    } catch (error) {
      console.error('GitHub stats error:', error);
      res.status(500).json({
        message: "GitHub stats unavailable",
        error: error instanceof Error ? error.message : 'Unknown error',
        fallback: {
          profile: { login: 'HappyBiningu', name: 'Tinotenda Happy', bio: 'Software Developer', public_repos: 0, followers: 0, following: 0 },
          stats: { totalStars: 0, totalForks: 0, totalRepos: 0 },
          languages: []
        }
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}