import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  profileImage: text("profile_image"),
  bio: text("bio"),
  location: text("location"),
  skills: text("skills").array(),
  experience: text("experience"),
  isRecruiter: boolean("is_recruiter").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  industry: text("industry").notNull(),
  size: text("size").notNull(), // "startup", "medium", "large"
  logo: text("logo"),
  website: text("website"),
  location: text("location").notNull(),
  founded: integer("founded"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  companyId: integer("company_id").references(() => companies.id),
  location: text("location").notNull(),
  type: text("type").notNull(), // "full-time", "part-time", "contract", "remote"
  level: text("level").notNull(), // "entry", "mid", "senior", "executive"
  category: text("category").notNull(),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  skills: text("skills").array(),
  requirements: text("requirements").array(),
  benefits: text("benefits").array(),
  isActive: boolean("is_active").default(true),
  postedAt: timestamp("posted_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  status: text("status").notNull().default("pending"), // "pending", "reviewing", "interviewed", "rejected", "accepted"
  coverLetter: text("cover_letter"),
  appliedAt: timestamp("applied_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  postedAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  appliedAt: true,
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
