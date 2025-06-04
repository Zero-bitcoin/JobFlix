import { 
  users, companies, jobs, applications, bookmarks,
  type User, type InsertUser,
  type Company, type InsertCompany,
  type Job, type InsertJob,
  type Application, type InsertApplication,
  type Bookmark, type InsertBookmark
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Companies
  getCompany(id: number): Promise<Company | undefined>;
  getCompanies(): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: number, company: Partial<InsertCompany>): Promise<Company | undefined>;

  // Jobs
  getJob(id: number): Promise<Job | undefined>;
  getJobs(filters?: {
    search?: string;
    location?: string;
    type?: string;
    level?: string;
    category?: string;
    salaryMin?: number;
    salaryMax?: number;
  }): Promise<Job[]>;
  getJobsByCompany(companyId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: number): Promise<boolean>;

  // Applications
  getApplication(id: number): Promise<Application | undefined>;
  getApplicationsByUser(userId: number): Promise<Application[]>;
  getApplicationsByJob(jobId: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined>;

  // Bookmarks
  getBookmarksByUser(userId: number): Promise<Bookmark[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(userId: number, jobId: number): Promise<boolean>;
  isJobBookmarked(userId: number, jobId: number): Promise<boolean>;

  // Categories and Stats
  getJobCategories(): Promise<{ name: string; count: number; icon: string }[]>;
  getFeaturedCompanies(): Promise<Company[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private companies: Map<number, Company> = new Map();
  private jobs: Map<number, Job> = new Map();
  private applications: Map<number, Application> = new Map();
  private bookmarks: Map<number, Bookmark> = new Map();
  private currentUserId = 1;
  private currentCompanyId = 1;
  private currentJobId = 1;
  private currentApplicationId = 1;
  private currentBookmarkId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed companies
    const sampleCompanies: InsertCompany[] = [
      {
        name: "TechInnovate",
        description: "Azienda leader nello sviluppo di soluzioni software innovative per il settore fintech.",
        industry: "Software Development",
        size: "medium",
        location: "Milano, IT",
        website: "https://techinnovate.it",
        founded: 2018,
      },
      {
        name: "CreativeHub",
        description: "Agenzia creativa specializzata in branding, design digitale e strategie di marketing innovative.",
        industry: "Digital Agency",
        size: "startup",
        location: "Roma, IT",
        website: "https://creativehub.it",
        founded: 2020,
      },
      {
        name: "FinanceForward",
        description: "Consulenza finanziaria e servizi di investimento con focus su tecnologie blockchain e AI.",
        industry: "Financial Services",
        size: "large",
        location: "Milano, IT",
        website: "https://financeforward.it",
        founded: 2015,
      },
      {
        name: "CloudTech Solutions",
        description: "Soluzioni cloud enterprise e servizi di trasformazione digitale per le aziende.",
        industry: "Cloud Computing",
        size: "medium",
        location: "Torino, IT",
        website: "https://cloudtech.it",
        founded: 2017,
      },
    ];

    sampleCompanies.forEach(company => this.createCompany(company));

    // Seed jobs
    const sampleJobs: InsertJob[] = [
      {
        title: "Senior Frontend Developer",
        description: "Stiamo cercando un Senior Frontend Developer per unirsi al nostro team dinamico. Lavorerai su progetti innovativi utilizzando React, TypeScript e tecnologie moderne. Opportunità di crescita in un ambiente stimolante e collaborativo.",
        company: "TechInnovate",
        companyId: 1,
        location: "Milano, IT",
        type: "full-time",
        level: "senior",
        category: "Sviluppo Software",
        salaryMin: 45000,
        salaryMax: 65000,
        skills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
        requirements: [
          "5+ anni di esperienza in sviluppo frontend",
          "Esperienza approfondita con React e TypeScript",
          "Conoscenza di Next.js e architetture moderne",
          "Capacità di lavorare in team agile"
        ],
        benefits: ["Smart working", "Assicurazione sanitaria", "Formazione continua", "Bonus performance"],
        isActive: true,
      },
      {
        title: "UX/UI Designer",
        description: "Cerchiamo un UX/UI Designer creativo per progettare esperienze digitali eccezionali. Lavorerai su progetti per clienti di alto profilo utilizzando Figma, Adobe Creative Suite e metodologie di design thinking.",
        company: "CreativeHub",
        companyId: 2,
        location: "Roma, IT",
        type: "full-time",
        level: "mid",
        category: "Design & UX",
        salaryMin: 35000,
        salaryMax: 50000,
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
        requirements: [
          "3+ anni di esperienza in UX/UI design",
          "Portfolio dimostrabile",
          "Competenze in user research",
          "Conoscenza di design systems"
        ],
        benefits: ["Ambiente creativo", "Progetti internazionali", "Flessibilità oraria", "Budget formazione"],
        isActive: true,
      },
      {
        title: "Digital Marketing Manager",
        description: "Unisciti al nostro team di marketing per gestire campagne digitali innovative. Gestirai strategie multi-canale, SEO/SEM, social media marketing e analytics avanzati per clienti enterprise.",
        company: "CreativeHub",
        companyId: 2,
        location: "Roma, IT",
        type: "full-time",
        level: "mid",
        category: "Marketing",
        salaryMin: 40000,
        salaryMax: 55000,
        skills: ["Google Ads", "SEO", "Analytics", "Social Media", "Content Marketing"],
        requirements: [
          "4+ anni di esperienza in digital marketing",
          "Certificazioni Google Ads e Analytics",
          "Esperienza con campagne multi-canale",
          "Capacità analitiche avanzate"
        ],
        benefits: ["Bonus su obiettivi", "Corsi di aggiornamento", "Team giovane", "Progetti stimolanti"],
        isActive: true,
      },
      {
        title: "Backend Developer",
        description: "Sviluppa soluzioni scalabili per la nostra piattaforma cloud. Lavorerai con microservizi, API RESTful, database distribuiti e tecnologie cloud native per servire milioni di utenti.",
        company: "CloudTech Solutions",
        companyId: 4,
        location: "Torino, IT",
        type: "full-time",
        level: "senior",
        category: "Sviluppo Software",
        salaryMin: 50000,
        salaryMax: 70000,
        skills: ["Node.js", "AWS", "MongoDB", "Docker", "Kubernetes"],
        requirements: [
          "5+ anni di esperienza backend",
          "Competenze in architetture cloud",
          "Esperienza con microservizi",
          "Conoscenza di DevOps"
        ],
        benefits: ["Tecnologie cutting-edge", "Stock options", "Ambiente internazionale", "Crescita rapida"],
        isActive: true,
      },
      {
        title: "Financial Analyst",
        description: "Analizza mercati finanziari e sviluppa modelli di investimento utilizzando AI e machine learning. Opportunità unica di lavorare con tecnologie innovative nel settore fintech.",
        company: "FinanceForward",
        companyId: 3,
        location: "Milano, IT",
        type: "full-time",
        level: "mid",
        category: "Finanza",
        salaryMin: 45000,
        salaryMax: 60000,
        skills: ["Python", "SQL", "Financial Modeling", "Machine Learning", "Bloomberg Terminal"],
        requirements: [
          "Laurea in Economia o Finanza",
          "3+ anni di esperienza in analisi finanziaria",
          "Competenze in Python e SQL",
          "Conoscenza mercati finanziari"
        ],
        benefits: ["Bonus performance elevati", "Formazione continua", "Ambiente dinamico", "Tecnologie avanzate"],
        isActive: true,
      },
      {
        title: "DevOps Engineer",
        description: "Gestisci infrastrutture cloud scalabili e processi CI/CD per supportare la nostra crescita. Lavorerai con Kubernetes, AWS e strumenti di automazione all'avanguardia.",
        company: "CloudTech Solutions",
        companyId: 4,
        location: "Torino, IT",
        type: "full-time",
        level: "senior",
        category: "Ingegneria",
        salaryMin: 55000,
        salaryMax: 75000,
        skills: ["Kubernetes", "AWS", "Terraform", "Jenkins", "Monitoring"],
        requirements: [
          "5+ anni di esperienza DevOps",
          "Certificazioni AWS",
          "Esperienza con Infrastructure as Code",
          "Competenze in monitoring e observability"
        ],
        benefits: ["Tecnologie all'avanguardia", "Team internazionale", "Autonomia tecnica", "Crescita professionale"],
        isActive: true,
      },
    ];

    sampleJobs.forEach(job => this.createJob(job));
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updateData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Companies
  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = { 
      ...insertCompany, 
      id, 
      createdAt: new Date(),
    };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: number, updateData: Partial<InsertCompany>): Promise<Company | undefined> {
    const company = this.companies.get(id);
    if (!company) return undefined;
    
    const updatedCompany = { ...company, ...updateData };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }

  // Jobs
  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobs(filters?: {
    search?: string;
    location?: string;
    type?: string;
    level?: string;
    category?: string;
    salaryMin?: number;
    salaryMax?: number;
  }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values()).filter(job => job.isActive);

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.skills?.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    if (filters?.location) {
      jobs = jobs.filter(job => job.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }

    if (filters?.type) {
      jobs = jobs.filter(job => job.type === filters.type);
    }

    if (filters?.level) {
      jobs = jobs.filter(job => job.level === filters.level);
    }

    if (filters?.category) {
      jobs = jobs.filter(job => job.category === filters.category);
    }

    if (filters?.salaryMin) {
      jobs = jobs.filter(job => job.salaryMax && job.salaryMax >= filters.salaryMin!);
    }

    if (filters?.salaryMax) {
      jobs = jobs.filter(job => job.salaryMin && job.salaryMin <= filters.salaryMax!);
    }

    return jobs.sort((a, b) => b.postedAt!.getTime() - a.postedAt!.getTime());
  }

  async getJobsByCompany(companyId: number): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .filter(job => job.companyId === companyId && job.isActive)
      .sort((a, b) => b.postedAt!.getTime() - a.postedAt!.getTime());
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { 
      ...insertJob, 
      id, 
      postedAt: new Date(),
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, updateData: Partial<InsertJob>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updateData };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJob(id: number): Promise<boolean> {
    return this.jobs.delete(id);
  }

  // Applications
  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationsByUser(userId: number): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter(app => app.userId === userId)
      .sort((a, b) => b.appliedAt!.getTime() - a.appliedAt!.getTime());
  }

  async getApplicationsByJob(jobId: number): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter(app => app.jobId === jobId)
      .sort((a, b) => b.appliedAt!.getTime() - a.appliedAt!.getTime());
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = { 
      ...insertApplication, 
      id, 
      appliedAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplication(id: number, updateData: Partial<InsertApplication>): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, ...updateData };
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Bookmarks
  async getBookmarksByUser(userId: number): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values())
      .filter(bookmark => bookmark.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.currentBookmarkId++;
    const bookmark: Bookmark = { 
      ...insertBookmark, 
      id, 
      createdAt: new Date(),
    };
    this.bookmarks.set(id, bookmark);
    return bookmark;
  }

  async deleteBookmark(userId: number, jobId: number): Promise<boolean> {
    const bookmark = Array.from(this.bookmarks.values())
      .find(b => b.userId === userId && b.jobId === jobId);
    
    if (bookmark) {
      return this.bookmarks.delete(bookmark.id);
    }
    return false;
  }

  async isJobBookmarked(userId: number, jobId: number): Promise<boolean> {
    return Array.from(this.bookmarks.values())
      .some(bookmark => bookmark.userId === userId && bookmark.jobId === jobId);
  }

  // Categories and Stats
  async getJobCategories(): Promise<{ name: string; count: number; icon: string }[]> {
    const jobs = Array.from(this.jobs.values()).filter(job => job.isActive);
    const categoryMap = new Map<string, number>();
    
    jobs.forEach(job => {
      const current = categoryMap.get(job.category) || 0;
      categoryMap.set(job.category, current + 1);
    });

    const iconMap: Record<string, string> = {
      "Sviluppo Software": "fas fa-code",
      "Design & UX": "fas fa-paint-brush",
      "Marketing": "fas fa-chart-line",
      "Risorse Umane": "fas fa-users",
      "Ingegneria": "fas fa-cogs",
      "Vendite": "fas fa-handshake",
      "Sanità": "fas fa-heartbeat",
      "Educazione": "fas fa-graduation-cap",
      "Finanza": "fas fa-dollar-sign",
      "Altro": "fas fa-briefcase"
    };

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
      icon: iconMap[name] || "fas fa-briefcase",
    }));
  }

  async getFeaturedCompanies(): Promise<Company[]> {
    const companies = Array.from(this.companies.values());
    return companies.slice(0, 6); // Return first 6 companies as featured
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getCompany(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company || undefined;
  }

  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db
      .insert(companies)
      .values(insertCompany)
      .returning();
    return company;
  }

  async updateCompany(id: number, updateData: Partial<InsertCompany>): Promise<Company | undefined> {
    const [company] = await db
      .update(companies)
      .set(updateData)
      .where(eq(companies.id, id))
      .returning();
    return company || undefined;
  }

  async getJob(id: number): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job || undefined;
  }

  async getJobs(filters?: {
    search?: string;
    location?: string;
    type?: string;
    level?: string;
    category?: string;
    salaryMin?: number;
    salaryMax?: number;
  }): Promise<Job[]> {
    let query = db.select().from(jobs);
    
    if (filters) {
      const conditions = [];
      
      if (filters.search) {
        conditions.push(
          sql`${jobs.title} ILIKE ${'%' + filters.search + '%'} OR ${jobs.description} ILIKE ${'%' + filters.search + '%'} OR ${jobs.company} ILIKE ${'%' + filters.search + '%'}`
        );
      }
      
      if (filters.location) {
        conditions.push(ilike(jobs.location, `%${filters.location}%`));
      }
      
      if (filters.type) {
        conditions.push(eq(jobs.type, filters.type));
      }
      
      if (filters.level) {
        conditions.push(eq(jobs.level, filters.level));
      }
      
      if (filters.category) {
        conditions.push(eq(jobs.category, filters.category));
      }
      
      if (filters.salaryMin) {
        conditions.push(gte(jobs.salaryMin, filters.salaryMin));
      }
      
      if (filters.salaryMax) {
        conditions.push(lte(jobs.salaryMax, filters.salaryMax));
      }
      
      if (conditions.length > 0) {
        query = query.where(sql`${conditions.reduce((acc, condition) => sql`${acc} AND ${condition}`)}`);
      }
    }
    
    return await query;
  }

  async getJobsByCompany(companyId: number): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.companyId, companyId));
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const [job] = await db
      .insert(jobs)
      .values(insertJob)
      .returning();
    return job;
  }

  async updateJob(id: number, updateData: Partial<InsertJob>): Promise<Job | undefined> {
    const [job] = await db
      .update(jobs)
      .set(updateData)
      .where(eq(jobs.id, id))
      .returning();
    return job || undefined;
  }

  async deleteJob(id: number): Promise<boolean> {
    const result = await db.delete(jobs).where(eq(jobs.id, id));
    return result.rowCount > 0;
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application || undefined;
  }

  async getApplicationsByUser(userId: number): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.userId, userId));
  }

  async getApplicationsByJob(jobId: number): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.jobId, jobId));
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db
      .insert(applications)
      .values(insertApplication)
      .returning();
    return application;
  }

  async updateApplication(id: number, updateData: Partial<InsertApplication>): Promise<Application | undefined> {
    const [application] = await db
      .update(applications)
      .set(updateData)
      .where(eq(applications.id, id))
      .returning();
    return application || undefined;
  }

  async getBookmarksByUser(userId: number): Promise<Bookmark[]> {
    return await db.select().from(bookmarks).where(eq(bookmarks.userId, userId));
  }

  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const [bookmark] = await db
      .insert(bookmarks)
      .values(insertBookmark)
      .returning();
    return bookmark;
  }

  async deleteBookmark(userId: number, jobId: number): Promise<boolean> {
    const result = await db
      .delete(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.jobId, jobId)));
    return result.rowCount > 0;
  }

  async isJobBookmarked(userId: number, jobId: number): Promise<boolean> {
    const [bookmark] = await db
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.jobId, jobId)));
    return !!bookmark;
  }

  async getJobCategories(): Promise<{ name: string; count: number; icon: string }[]> {
    const categoryData = await db
      .select({
        category: jobs.category,
        count: sql<number>`count(*)`.as('count')
      })
      .from(jobs)
      .groupBy(jobs.category);

    const iconMap: Record<string, string> = {
      "Sviluppo Software": "fas fa-code",
      "Design & UX": "fas fa-paint-brush",
      "Marketing": "fas fa-chart-line",
      "Risorse Umane": "fas fa-users",
      "Ingegneria": "fas fa-cogs",
      "Vendite": "fas fa-handshake",
      "Sanità": "fas fa-heartbeat",
      "Educazione": "fas fa-graduation-cap",
      "Finanza": "fas fa-dollar-sign",
      "Altro": "fas fa-briefcase"
    };

    return categoryData.map(({ category, count }) => ({
      name: category,
      count,
      icon: iconMap[category] || "fas fa-briefcase"
    }));
  }

  async getFeaturedCompanies(): Promise<Company[]> {
    return await db.select().from(companies).limit(6);
  }
}

export const storage = new DatabaseStorage();
