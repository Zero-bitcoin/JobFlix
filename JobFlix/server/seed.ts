import { db } from "./db";
import { users, companies, jobs, applications, bookmarks } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Seed users
  const seedUsers = await db.insert(users).values([
    {
      username: "marco_rossi",
      email: "marco.rossi@email.com",
      password: "password123",
      fullName: "Marco Rossi",
      location: "Milano, IT",
      bio: "Sviluppatore Full Stack con 5 anni di esperienza in React e Node.js. Appassionato di tecnologie innovative e sempre alla ricerca di nuove sfide.",
      experience: "Senior Full Stack Developer",
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "PostgreSQL"],
      isRecruiter: false,
      profileImage: null
    },
    {
      username: "giulia_bianchi",
      email: "giulia.bianchi@email.com", 
      password: "password123",
      fullName: "Giulia Bianchi",
      location: "Roma, IT",
      bio: "UX/UI Designer specializzata in interfacce user-friendly e design thinking. Lavoro per creare esperienze digitali coinvolgenti.",
      experience: "Senior UX/UI Designer",
      skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping"],
      isRecruiter: false,
      profileImage: null
    }
  ]).returning();

  // Seed companies
  const seedCompanies = await db.insert(companies).values([
    {
      name: "TechInnovate",
      description: "Azienda leader nell'innovazione tecnologica, specializzata in soluzioni cloud e intelligenza artificiale.",
      industry: "Tecnologia",
      size: "100-500 dipendenti",
      location: "Milano, IT",
      website: "https://techinnovate.it",
      founded: 2015,
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "CreativeHub",
      description: "Studio di design e marketing digitale che aiuta le aziende a costruire brand memorabili.",
      industry: "Design & Marketing",
      size: "50-100 dipendenti", 
      location: "Roma, IT",
      website: "https://creativehub.it",
      founded: 2018,
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "FinanceForward",
      description: "Consulenza finanziaria moderna con focus su fintech e innovazione nei servizi bancari.",
      industry: "Finanza",
      size: "200-500 dipendenti",
      location: "Milano, IT", 
      website: "https://financeforward.it",
      founded: 2012,
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "CloudTech Solutions",
      description: "Specialisti in infrastrutture cloud e DevOps per aziende di ogni dimensione.",
      industry: "Cloud Computing",
      size: "150-300 dipendenti",
      location: "Torino, IT",
      website: "https://cloudtech.it", 
      founded: 2016,
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ]).returning();

  // Seed jobs
  const seedJobs = await db.insert(jobs).values([
    {
      title: "Senior Frontend Developer",
      description: "Cerchiamo un Senior Frontend Developer per unirsi al nostro team di sviluppo. Esperienza richiesta con React, TypeScript e tecnologie moderne.",
      company: "TechInnovate",
      companyId: seedCompanies[0].id,
      location: "Milano, IT",
      type: "full-time",
      level: "senior",
      category: "Sviluppo Software",
      salaryMin: 45000,
      salaryMax: 65000,
      skills: ["React", "TypeScript", "JavaScript", "CSS", "Git"],
      requirements: ["5+ anni esperienza Frontend", "Conoscenza React avanzata", "Esperienza con TypeScript"],
      benefits: ["Lavoro ibrido", "Formazione continua", "Assicurazione sanitaria"]
    },
    {
      title: "UX/UI Designer",
      description: "Posizione per UX/UI Designer creativo con passione per il design user-centered. Lavorerai su progetti innovativi per clienti internazionali.",
      company: "CreativeHub", 
      companyId: seedCompanies[1].id,
      location: "Roma, IT",
      type: "full-time",
      level: "mid",
      category: "Design & UX",
      salaryMin: 35000,
      salaryMax: 50000,
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      requirements: ["3+ anni esperienza UX/UI", "Portfolio solido", "Conoscenza Design System"],
      benefits: ["Ambiente creativo", "Progetti internazionali", "Flessibilità orari"]
    },
    {
      title: "Backend Developer",
      description: "Sviluppatore Backend per architetture scalabili e microservizi. Esperienza con Node.js e database relazionali.",
      company: "CloudTech Solutions",
      companyId: seedCompanies[3].id,
      location: "Torino, IT", 
      type: "full-time",
      level: "mid",
      category: "Sviluppo Software",
      salaryMin: 40000,
      salaryMax: 58000,
      skills: ["Node.js", "PostgreSQL", "Docker", "AWS", "API REST"],
      requirements: ["3+ anni esperienza Backend", "Conoscenza Cloud", "Esperienza microservizi"],
      benefits: ["Tecnologie moderne", "Team internazionale", "Crescita professionale"]
    },
    {
      title: "Financial Analyst",
      description: "Analista finanziario per supportare decisioni strategiche e analisi di mercato nel settore fintech.",
      company: "FinanceForward",
      companyId: seedCompanies[2].id,
      location: "Milano, IT",
      type: "full-time", 
      level: "junior",
      category: "Finanza",
      salaryMin: 30000,
      salaryMax: 45000,
      skills: ["Excel", "Power BI", "Analisi Finanziaria", "Python", "SQL"],
      requirements: ["Laurea in Economia/Finanza", "Conoscenza Excel avanzato", "Inglese fluente"],
      benefits: ["Settore innovativo", "Mentorship", "Bonus performance"]
    },
    {
      title: "Digital Marketing Manager",
      description: "Responsabile marketing digitale per gestire campagne multi-canale e strategie di crescita online.",
      company: "CreativeHub",
      companyId: seedCompanies[1].id,
      location: "Roma, IT",
      type: "full-time",
      level: "senior", 
      category: "Marketing",
      salaryMin: 40000,
      salaryMax: 55000,
      skills: ["Google Ads", "Social Media", "Analytics", "SEO", "Email Marketing"],
      requirements: ["5+ anni esperienza Marketing", "Conoscenza tools digitali", "Capacità analitiche"],
      benefits: ["Budget marketing", "Formazione Google", "Team giovane"]
    }
  ]).returning();

  console.log("✅ Database seeded successfully!");
  console.log(`Created ${seedUsers.length} users, ${seedCompanies.length} companies, and ${seedJobs.length} jobs.`);
}

// Run seed if called directly
seedDatabase().catch(console.error);

export { seedDatabase };