export interface ProjectType {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

export interface CertificationType {
  title: string;
  issuer: string;
  description: string;
  link: string;
}

// Enhanced Code Lab Types
export type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Expert";
export type ChallengeCategory = "Data Science" | "Machine Learning" | "Algorithms" | "Web Development";
export type LanguageType = "python" | "javascript" | "sql" | "r";

export interface TestCase {
  id: string;
  input: string;
  expected: string;
  explanation: string;
  isHidden?: boolean;
}

export interface Hint {
  id: string;
  title: string;
  content: string;
  unlockCondition?: "failure" | "time" | "always";
}

export interface SampleSolution {
  language: LanguageType;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface PerformanceMetrics {
  timeComplexity: string;
  spaceComplexity: string;
  executionTime: number;
  memoryUsage: number;
  codeQuality: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  earned?: boolean;
  earnedAt?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: DifficultyLevel;
  tags: string[];
  estimatedTime: number; // in minutes
  language: LanguageType;
  startCode: string;
  testCases: TestCase[];
  hints: Hint[];
  sampleSolution: SampleSolution;
  points: number;
  isPremium?: boolean;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  message?: string;
  executionTime?: number;
}

export interface UserProgress {
  challengesCompleted: string[];
  currentStreak: number;
  maxStreak: number;
  totalPoints: number;
  achievements: Achievement[];
  lastActivityDate: Date;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  totalPoints: number;
  challengesCompleted: number;
  currentStreak: number;
  averageTime: number;
  achievements: number;
  isCurrentUser?: boolean;
}

export interface CodeSubmission {
  challengeId: string;
  code: string;
  language: LanguageType;
  submittedAt: Date;
  performance: PerformanceMetrics;
  testResults: TestResult[];
  passed: boolean;
}
