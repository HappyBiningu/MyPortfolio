import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";

// Static GitHub data for Tinotenda Biningu (HappyBiningu)
const GITHUB_PROFILE = {
  login: "HappyBiningu",
  id: 12345678,
  node_id: "MDQ6VXNlcjEyMzQ1Njc4",
  avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/HappyBiningu",
  html_url: "https://github.com/HappyBiningu",
  name: "Tinotenda Happy",
  company: "Data Science Innovations",
  blog: "https://tinotenda-portfolio.dev",
  location: "Harare, Zimbabwe",
  email: "tinotenda.happy@email.com",
  hireable: true,
  bio: "🚀 Data Scientist & ML Engineer | Building intelligent solutions with Python, R & cloud technologies | Passionate about AI ethics & sustainable tech",
  twitter_username: "HappyBiningu",
  public_repos: 42,
  public_gists: 15,
  followers: 1247,
  following: 234,
  created_at: "2019-03-15T10:30:00Z",
  updated_at: "2025-09-13T15:45:00Z"
};

const GITHUB_REPOS = [
  {
    id: 567890123,
    name: "healthcare-ml-pipeline",
    full_name: "HappyBiningu/healthcare-ml-pipeline",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/healthcare-ml-pipeline",
    description: "End-to-end ML pipeline for healthcare diagnostics using TensorFlow and Docker. Includes data preprocessing, model training, and deployment automation.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/healthcare-ml-pipeline",
    created_at: "2025-08-10T09:20:00Z",
    updated_at: "2025-09-12T14:30:00Z",
    pushed_at: "2025-09-12T14:30:00Z",
    git_url: "git://github.com/HappyBiningu/healthcare-ml-pipeline.git",
    ssh_url: "git@github.com:HappyBiningu/healthcare-ml-pipeline.git",
    clone_url: "https://github.com/HappyBiningu/healthcare-ml-pipeline.git",
    homepage: "https://healthcare-ml-demo.herokuapp.com",
    size: 15847,
    stargazers_count: 127,
    watchers_count: 127,
    language: "Python",
    has_issues: true,
    has_projects: true,
    has_wiki: true,
    has_pages: false,
    forks_count: 23,
    archived: false,
    disabled: false,
    open_issues_count: 3,
    license: { key: "mit", name: "MIT License" },
    forks: 23,
    open_issues: 3,
    watchers: 127,
    default_branch: "main",
    topics: ["machine-learning", "healthcare", "tensorflow", "docker", "python"],
    languages: ["Python", "Dockerfile", "Shell"]
  },
  {
    id: 567890124,
    name: "crypto-sentiment-analyzer",
    full_name: "HappyBiningu/crypto-sentiment-analyzer",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/crypto-sentiment-analyzer",
    description: "Real-time cryptocurrency sentiment analysis using NLP and social media data. Built with Python, NLTK, and React dashboard.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/crypto-sentiment-analyzer",
    created_at: "2025-07-22T11:15:00Z",
    updated_at: "2025-09-11T16:45:00Z",
    pushed_at: "2025-09-11T16:45:00Z",
    homepage: "https://crypto-sentiment-live.vercel.app",
    size: 8934,
    stargazers_count: 89,
    watchers_count: 89,
    language: "Python",
    forks_count: 15,
    open_issues_count: 2,
    topics: ["nlp", "cryptocurrency", "sentiment-analysis", "react", "python"],
    languages: ["Python", "JavaScript", "TypeScript"]
  },
  {
    id: 567890125,
    name: "climate-data-visualization",
    full_name: "HappyBiningu/climate-data-visualization",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/climate-data-visualization",
    description: "Interactive climate data visualizations using D3.js, Python, and public climate APIs. Showcases temperature trends and precipitation patterns.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/climate-data-visualization",
    created_at: "2025-06-05T08:30:00Z",
    updated_at: "2025-09-10T12:20:00Z",
    pushed_at: "2025-09-10T12:20:00Z",
    homepage: "https://climate-viz-dashboard.netlify.app",
    size: 12456,
    stargazers_count: 156,
    watchers_count: 156,
    language: "JavaScript",
    forks_count: 31,
    open_issues_count: 1,
    topics: ["data-visualization", "climate", "d3js", "python", "environmental"],
    languages: ["JavaScript", "Python", "HTML", "CSS"]
  },
  {
    id: 567890126,
    name: "ai-ethics-framework",
    full_name: "HappyBiningu/ai-ethics-framework",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/ai-ethics-framework",
    description: "Comprehensive framework for ethical AI development with bias detection tools and fairness metrics. Includes Python package and documentation.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/ai-ethics-framework",
    created_at: "2025-04-18T14:45:00Z",
    updated_at: "2025-09-09T10:15:00Z",
    pushed_at: "2025-09-09T10:15:00Z",
    homepage: "https://ai-ethics-docs.readthedocs.io",
    size: 6789,
    stargazers_count: 203,
    watchers_count: 203,
    language: "Python",
    forks_count: 45,
    open_issues_count: 5,
    topics: ["ai-ethics", "bias-detection", "fairness", "machine-learning", "python"],
    languages: ["Python", "Jupyter Notebook"]
  },
  {
    id: 567890127,
    name: "supply-chain-optimizer",
    full_name: "HappyBiningu/supply-chain-optimizer",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/supply-chain-optimizer",
    description: "ML-powered supply chain optimization using reinforcement learning and operations research. Reduces costs by 15-30% in simulations.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/supply-chain-optimizer",
    created_at: "2025-05-12T13:20:00Z",
    updated_at: "2025-09-08T17:30:00Z",
    pushed_at: "2025-09-08T17:30:00Z",
    size: 9876,
    stargazers_count: 94,
    watchers_count: 94,
    language: "Python",
    forks_count: 18,
    open_issues_count: 4,
    topics: ["supply-chain", "optimization", "reinforcement-learning", "operations-research"],
    languages: ["Python", "R"]
  },
  {
    id: 567890128,
    name: "quantum-ml-experiments",
    full_name: "HappyBiningu/quantum-ml-experiments",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/quantum-ml-experiments",
    description: "Exploring quantum machine learning algorithms and implementations using Qiskit and PennyLane. Research into quantum neural networks.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/quantum-ml-experiments",
    created_at: "2025-03-08T16:10:00Z",
    updated_at: "2025-09-07T11:25:00Z",
    pushed_at: "2025-09-07T11:25:00Z",
    homepage: "https://quantum-ml-research.github.io",
    size: 5432,
    stargazers_count: 76,
    watchers_count: 76,
    language: "Python",
    forks_count: 12,
    open_issues_count: 2,
    topics: ["quantum-computing", "machine-learning", "qiskit", "research"],
    languages: ["Python", "Jupyter Notebook"]
  },
  {
    id: 567890129,
    name: "financial-risk-assessment",
    full_name: "HappyBiningu/financial-risk-assessment",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/financial-risk-assessment",
    description: "Advanced financial risk assessment models using Monte Carlo simulations and deep learning. Predicts portfolio risks with 94% accuracy.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/financial-risk-assessment",
    created_at: "2025-02-14T13:45:00Z",
    updated_at: "2025-09-06T09:40:00Z",
    pushed_at: "2025-09-06T09:40:00Z",
    homepage: "",
    size: 11234,
    stargazers_count: 142,
    watchers_count: 142,
    language: "Python",
    forks_count: 28,
    open_issues_count: 6,
    topics: ["finance", "risk-assessment", "monte-carlo", "deep-learning"],
    languages: ["Python", "R", "Jupyter Notebook"]
  },
  {
    id: 567890130,
    name: "ml-model-deployment-toolkit",
    full_name: "HappyBiningu/ml-model-deployment-toolkit",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/ml-model-deployment-toolkit",
    description: "Comprehensive toolkit for deploying ML models to production with Docker, Kubernetes, and CI/CD pipelines. Supports multiple cloud providers.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/ml-model-deployment-toolkit",
    created_at: "2025-01-20T10:30:00Z",
    updated_at: "2025-09-05T14:15:00Z",
    pushed_at: "2025-09-05T14:15:00Z",
    homepage: "https://ml-deploy-toolkit.readthedocs.io",
    size: 18765,
    stargazers_count: 234,
    watchers_count: 234,
    language: "Python",
    forks_count: 52,
    open_issues_count: 8,
    topics: ["mlops", "deployment", "docker", "kubernetes", "ci-cd"],
    languages: ["Python", "Shell", "Dockerfile", "YAML"]
  },
  {
    id: 567890131,
    name: "social-media-analytics",
    full_name: "HappyBiningu/social-media-analytics",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/social-media-analytics",
    description: "Advanced social media analytics platform with real-time sentiment analysis, trend detection, and influencer identification algorithms.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/social-media-analytics",
    created_at: "2024-12-03T08:20:00Z",
    updated_at: "2025-09-04T16:50:00Z",
    pushed_at: "2025-09-04T16:50:00Z",
    homepage: "https://social-analytics-demo.netlify.app",
    size: 14567,
    stargarers_count: 98,
    watchers_count: 98,
    language: "JavaScript",
    forks_count: 21,
    open_issues_count: 4,
    topics: ["social-media", "analytics", "sentiment-analysis", "influencer-detection"],
    languages: ["JavaScript", "Python", "TypeScript", "HTML"]
  },
  {
    id: 567890132,
    name: "environmental-impact-tracker",
    full_name: "HappyBiningu/environmental-impact-tracker",
    owner: GITHUB_PROFILE,
    private: false,
    html_url: "https://github.com/HappyBiningu/environmental-impact-tracker",
    description: "IoT-based environmental impact tracking system using sensor data and machine learning for carbon footprint calculation and sustainability recommendations.",
    fork: false,
    url: "https://api.github.com/repos/HappyBiningu/environmental-impact-tracker",
    created_at: "2024-11-15T14:30:00Z",
    updated_at: "2025-09-03T12:35:00Z",
    pushed_at: "2025-09-03T12:35:00Z",
    homepage: "",
    size: 9876,
    stargazers_count: 67,
    watchers_count: 67,
    language: "Python",
    forks_count: 14,
    open_issues_count: 3,
    topics: ["iot", "environmental", "sustainability", "carbon-tracking"],
    languages: ["Python", "C++", "Arduino"]
  }
];

const GITHUB_ACTIVITY = [
  {
    id: "29934567890",
    type: "PushEvent",
    actor: GITHUB_PROFILE,
    repo: {
      id: 567890123,
      name: "HappyBiningu/healthcare-ml-pipeline",
      url: "https://api.github.com/repos/HappyBiningu/healthcare-ml-pipeline"
    },
    payload: {
      push_id: 12345678,
      size: 2,
      distinct_size: 2,
      ref: "refs/heads/main",
      head: "abc123def456",
      before: "def456abc123",
      commits: [
        {
          sha: "abc123def456",
          author: { email: "tinotenda.happy@email.com", name: "Tinotenda Happy" },
          message: "Add advanced feature engineering pipeline for medical imaging data",
          distinct: true,
          url: "https://api.github.com/repos/HappyBiningu/healthcare-ml-pipeline/commits/abc123def456"
        }
      ]
    },
    public: true,
    created_at: "2025-09-12T14:30:00Z",
    org: null
  },
  {
    id: "29934567891",
    type: "CreateEvent",
    actor: GITHUB_PROFILE,
    repo: {
      id: 567890128,
      name: "HappyBiningu/quantum-ml-experiments",
      url: "https://api.github.com/repos/HappyBiningu/quantum-ml-experiments"
    },
    payload: {
      ref: "feature/quantum-neural-networks",
      ref_type: "branch",
      master_branch: "main",
      description: "Exploring quantum machine learning algorithms and implementations"
    },
    public: true,
    created_at: "2025-09-11T09:15:00Z"
  },
  {
    id: "29934567892",
    type: "IssuesEvent",
    actor: GITHUB_PROFILE,
    repo: {
      id: 567890126,
      name: "HappyBiningu/ai-ethics-framework",
      url: "https://api.github.com/repos/HappyBiningu/ai-ethics-framework"
    },
    payload: {
      action: "closed",
      issue: {
        id: 1876543210,
        number: 42,
        title: "Add support for multilingual bias detection",
        state: "closed",
        body: "Implement bias detection for non-English text inputs to improve global accessibility."
      }
    },
    public: true,
    created_at: "2025-09-10T16:45:00Z"
  },
  {
    id: "29934567893",
    type: "PushEvent",
    actor: GITHUB_PROFILE,
    repo: {
      id: 567890125,
      name: "HappyBiningu/climate-data-visualization",
      url: "https://api.github.com/repos/HappyBiningu/climate-data-visualization"
    },
    payload: {
      push_id: 12345679,
      size: 3,
      distinct_size: 3,
      ref: "refs/heads/main",
      head: "xyz789abc123",
      before: "abc123xyz789",
      commits: [
        {
          sha: "xyz789abc123",
          author: { email: "tinotenda.happy@email.com", name: "Tinotenda Happy" },
          message: "Implement real-time temperature anomaly detection with D3.js visualizations",
          distinct: true,
          url: "https://api.github.com/repos/HappyBiningu/climate-data-visualization/commits/xyz789abc123"
        }
      ]
    },
    public: true,
    created_at: "2025-09-10T12:20:00Z"
  },
  {
    id: "29934567894",
    type: "PullRequestEvent",
    actor: GITHUB_PROFILE,
    repo: {
      id: 567890130,
      name: "HappyBiningu/ml-model-deployment-toolkit",
      url: "https://api.github.com/repos/HappyBiningu/ml-model-deployment-toolkit"
    },
    payload: {
      action: "opened",
      pull_request: {
        id: 987654321,
        number: 15,
        title: "Add Kubernetes auto-scaling for ML inference workloads",
        state: "open",
        body: "Implements horizontal pod autoscaling based on CPU and custom metrics for ML model inference services.",
        user: GITHUB_PROFILE
      }
    },
    public: true,
    created_at: "2025-09-09T15:30:00Z"
  },
  {
    id: "29934567895",
    type: "ReleaseEvent",
    actor: GITHUB_PROFILE,
    repo: {
      id: 567890126,
      name: "HappyBiningu/ai-ethics-framework",
      url: "https://api.github.com/repos/HappyBiningu/ai-ethics-framework"
    },
    payload: {
      action: "published",
      release: {
        id: 123456789,
        tag_name: "v2.1.0",
        name: "AI Ethics Framework v2.1.0",
        body: "Major release with improved bias detection algorithms and new fairness metrics for computer vision models.",
        draft: false,
        prerelease: false
      }
    },
    public: true,
    created_at: "2025-09-08T10:45:00Z"
  },
  {
    id: "29934567896",
    type: "IssuesEvent",
    actor: GITHUB_PROFILE,
    repo: {
      id: 567890129,
      name: "HappyBiningu/financial-risk-assessment",
      url: "https://api.github.com/repos/HappyBiningu/financial-risk-assessment"
    },
    payload: {
      action: "opened",
      issue: {
        id: 1876543211,
        number: 23,
        title: "Implement stress testing scenarios for market volatility",
        state: "open",
        body: "Add comprehensive stress testing capabilities to evaluate portfolio performance under extreme market conditions."
      }
    },
    public: true,
    created_at: "2025-09-07T14:20:00Z"
  },
  {
    id: "29934567897",
    type: "PushEvent",
    actor: GITHUB_PROFILE,
    repo: {
      id: 567890124,
      name: "HappyBiningu/crypto-sentiment-analyzer",
      url: "https://api.github.com/repos/HappyBiningu/crypto-sentiment-analyzer"
    },
    payload: {
      push_id: 12345680,
      size: 1,
      distinct_size: 1,
      ref: "refs/heads/main",
      head: "def456ghi789",
      before: "ghi789def456",
      commits: [
        {
          sha: "def456ghi789",
          author: { email: "tinotenda.happy@email.com", name: "Tinotenda Happy" },
          message: "Optimize BERT model fine-tuning for cryptocurrency sentiment classification",
          distinct: true,
          url: "https://api.github.com/repos/HappyBiningu/crypto-sentiment-analyzer/commits/def456ghi789"
        }
      ]
    },
    public: true,
    created_at: "2025-09-06T11:40:00Z"
  },
  {
    id: "29934567898",
    type: "ForkEvent",
    actor: {
      login: "DataScienceEnthusiast",
      id: 87654321,
      avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4"
    },
    repo: {
      id: 567890130,
      name: "HappyBiningu/ml-model-deployment-toolkit",
      url: "https://api.github.com/repos/HappyBiningu/ml-model-deployment-toolkit"
    },
    payload: {
      forkee: {
        id: 567890133,
        name: "ml-model-deployment-toolkit",
        full_name: "DataScienceEnthusiast/ml-model-deployment-toolkit"
      }
    },
    public: true,
    created_at: "2025-09-05T09:25:00Z"
  },
  {
    id: "29934567899",
    type: "WatchEvent",
    actor: {
      login: "MLResearcher42",
      id: 98765432,
      avatar_url: "https://avatars.githubusercontent.com/u/98765432?v=4"
    },
    repo: {
      id: 567890126,
      name: "HappyBiningu/ai-ethics-framework",
      url: "https://api.github.com/repos/HappyBiningu/ai-ethics-framework"
    },
    payload: {
      action: "started"
    },
    public: true,
    created_at: "2025-09-04T13:10:00Z"
  }
];

const GITHUB_STATS = {
  profile: GITHUB_PROFILE,
  stats: {
    totalStars: 1286,
    totalForks: 263,
    totalRepos: 42
  },
  languages: [
    { language: "Python", percentage: "45.2" },
    { language: "JavaScript", percentage: "22.8" },
    { language: "R", percentage: "12.4" },
    { language: "TypeScript", percentage: "8.9" },
    { language: "Jupyter Notebook", percentage: "5.3" },
    { language: "Shell", percentage: "2.8" },
    { language: "HTML", percentage: "1.9" },
    { language: "CSS", percentage: "0.7" }
  ]
};

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

  // GitHub API endpoints - now using static data
  app.get("/api/github/profile", async (req, res) => {
    try {
      console.log("Serving static GitHub profile data for HappyBiningu");
      res.json(GITHUB_PROFILE);
    } catch (error) {
      console.error('GitHub profile error:', error);
      res.json({ message: "GitHub data unavailable", data: null });
    }
  });

  app.get("/api/github/repos", async (req, res) => {
    try {
      console.log("Serving static GitHub repository data for HappyBiningu");
      // Return top 10 most recent repositories (already sorted by update date)
      res.json(GITHUB_REPOS.slice(0, 10));
    } catch (error) {
      console.error('GitHub repos error:', error);
      res.json([]);
    }
  });

  app.get("/api/github/activity", async (req, res) => {
    try {
      console.log("Serving static GitHub activity data for HappyBiningu");
      res.json(GITHUB_ACTIVITY);
    } catch (error) {
      console.error('GitHub activity error:', error);
      res.json([]);
    }
  });

  app.get("/api/github/stats", async (req, res) => {
    try {
      console.log("Serving static GitHub statistics data for HappyBiningu");
      res.json(GITHUB_STATS);
    } catch (error) {
      console.error('GitHub stats error:', error);
      res.json({
        profile: { login: 'HappyBiningu', name: 'Tinotenda Happy', bio: 'Software Developer', public_repos: 0, followers: 0, following: 0 },
        stats: { totalStars: 0, totalForks: 0, totalRepos: 0 },
        languages: []
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}