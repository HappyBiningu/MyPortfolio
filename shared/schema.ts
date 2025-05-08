import { pgTable, text, serial, varchar, timestamp, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  avatarUrl: true,
});

export const codeSnippets = pgTable("code_snippets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  language: text("language").notNull(),
  code: text("code").notNull(),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCodeSnippetSchema = createInsertSchema(codeSnippets).pick({
  userId: true,
  title: true,
  description: true,
  language: true,
  code: true,
});

export const codeChallenges = pgTable("code_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  startCode: text("start_code"),
  testCases: json("test_cases").notNull(),
  solution: text("solution"),
  language: text("language").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCodeChallengeSchema = createInsertSchema(codeChallenges).pick({
  title: true,
  description: true,
  difficulty: true,
  startCode: true,
  testCases: true,
  solution: true,
  language: true,
  isActive: true,
});

export const challengeResults = pgTable("challenge_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  challengeId: integer("challenge_id").references(() => codeChallenges.id),
  code: text("code").notNull(),
  passed: boolean("passed").notNull(),
  executionTime: integer("execution_time"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChallengeResultSchema = createInsertSchema(challengeResults).pick({
  userId: true,
  challengeId: true,
  code: true,
  passed: true,
  executionTime: true,
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'dataset', 'starter_code', 'tutorial'
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  type: true,
  url: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCodeSnippet = z.infer<typeof insertCodeSnippetSchema>;
export type CodeSnippet = typeof codeSnippets.$inferSelect;

export type InsertCodeChallenge = z.infer<typeof insertCodeChallengeSchema>;
export type CodeChallenge = typeof codeChallenges.$inferSelect;

export type InsertChallengeResult = z.infer<typeof insertChallengeResultSchema>;
export type ChallengeResult = typeof challengeResults.$inferSelect;

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;
