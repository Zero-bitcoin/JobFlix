import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertJobSchema, insertCompanySchema, insertApplicationSchema, insertBookmarkSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Jobs endpoints
  app.get("/api/jobs", async (req, res) => {
    try {
      const filters = {
        search: req.query.search as string,
        location: req.query.location as string,
        type: req.query.type as string,
        level: req.query.level as string,
        category: req.query.category as string,
        salaryMin: req.query.salaryMin ? parseInt(req.query.salaryMin as string) : undefined,
        salaryMax: req.query.salaryMax ? parseInt(req.query.salaryMax as string) : undefined,
      };

      const jobs = await storage.getJobs(filters);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJob(id);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid job data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create job" });
      }
    }
  });

  // Companies endpoints
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const company = await storage.getCompany(id);
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  app.get("/api/companies/:id/jobs", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const jobs = await storage.getJobsByCompany(id);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company jobs" });
    }
  });

  app.post("/api/companies", async (req, res) => {
    try {
      const companyData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(companyData);
      res.status(201).json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid company data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create company" });
      }
    }
  });

  // Categories endpoint
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getJobCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Featured companies endpoint
  app.get("/api/companies/featured", async (req, res) => {
    try {
      const companies = await storage.getFeaturedCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured companies" });
    }
  });

  // Applications endpoints (would require authentication in real app)
  app.post("/api/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(applicationData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid application data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create application" });
      }
    }
  });

  // Bookmarks endpoints (would require authentication in real app)
  app.post("/api/bookmarks", async (req, res) => {
    try {
      const bookmarkData = insertBookmarkSchema.parse(req.body);
      const bookmark = await storage.createBookmark(bookmarkData);
      res.status(201).json(bookmark);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid bookmark data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create bookmark" });
      }
    }
  });

  app.delete("/api/bookmarks", async (req, res) => {
    try {
      const { userId, jobId } = req.body;
      const success = await storage.deleteBookmark(userId, jobId);
      
      if (success) {
        res.json({ message: "Bookmark removed" });
      } else {
        res.status(404).json({ message: "Bookmark not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to remove bookmark" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
