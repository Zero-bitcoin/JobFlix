import { useState } from "react";
import HeroSearch from "@/components/search/hero-search";
import CategoryCarousel from "@/components/categories/category-carousel";
import JobCard from "@/components/job/job-card";
import JobFilters from "@/components/job/job-filters";
import CompanyCard from "@/components/company/company-card";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { JobFilters as JobFiltersType } from "@/lib/types";

export default function Home() {
  const [filters, setFilters] = useState<JobFiltersType>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  
  const { data: jobs = [], isLoading: jobsLoading } = useJobs(filters);
  const { data: companies = [] } = useCompanies();
  
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: featuredCompanies = [] } = useQuery({
    queryKey: ["/api/companies/featured"],
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handleSearch = (searchFilters: Partial<JobFiltersType>) => {
    setFilters({ ...filters, ...searchFilters });
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: JobFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-netflix-bg to-transparent">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600" 
          alt="Modern office workspace" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-bg via-netflix-bg/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Trova il lavoro dei tuoi{" "}
              <span className="netflix-red">sogni</span>
            </h1>
            <p className="text-xl netflix-text mb-8 animate-slide-up">
              Scopri migliaia di opportunità professionali dalle migliori aziende
            </p>
            <div className="animate-slide-up">
              <HeroSearch onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Categorie Popolari</h2>
          <a href="#" className="netflix-red hover:text-netflix-dark-red transition-colors duration-200 font-medium">
            Vedi tutte
          </a>
        </div>
        <CategoryCarousel categories={categories} onCategorySelect={(category) => handleSearch({ category })} />
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="netflix-surface rounded-xl p-6 sticky top-24">
              <JobFilters filters={filters} onFiltersChange={handleFilterChange} />
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Offerte di Lavoro</h2>
                <p className="netflix-text mt-1">{jobs.length} posizioni trovate</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px] netflix-surface border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Ordina per: Più recenti</SelectItem>
                    <SelectItem value="salary">Ordina per: Stipendio</SelectItem>
                    <SelectItem value="relevance">Ordina per: Rilevanza</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex netflix-surface rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    onClick={() => setViewMode("grid")}
                    className="px-3 py-1"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "ghost"}
                    onClick={() => setViewMode("list")}
                    className="px-3 py-1"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Job Cards Grid */}
            {jobsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="netflix-surface rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                      <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {currentJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="netflix-text hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-netflix-red text-white" : "netflix-text hover:text-white"}
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 netflix-text">...</span>;
                  }
                  return null;
                })}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="netflix-text hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Companies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Aziende in Evidenza</h2>
          <a href="#" className="netflix-red hover:text-netflix-dark-red transition-colors duration-200 font-medium">
            Esplora tutte
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-netflix-red to-netflix-dark-red py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Non perdere le migliori opportunità</h2>
          <p className="text-xl mb-8 opacity-90">
            Ricevi le offerte di lavoro più interessanti direttamente nella tua email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="La tua email" 
              className="flex-1 bg-white text-black border-0"
            />
            <Button className="bg-white text-netflix-red hover:bg-gray-100 px-8">
              Iscriviti
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            Più di 50.000 professionisti si affidano a JobFlix per la loro carriera
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="netflix-surface border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold netflix-red mb-4">JobFlix</h3>
              <p className="netflix-text mb-4">
                La piattaforma leader per la ricerca di lavoro in Italia. 
                Connetti il tuo talento con le migliori opportunità.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="netflix-text hover:text-netflix-red transition-colors duration-200">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="netflix-text hover:text-netflix-red transition-colors duration-200">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="netflix-text hover:text-netflix-red transition-colors duration-200">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="netflix-text hover:text-netflix-red transition-colors duration-200">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Per i Candidati</h4>
              <ul className="space-y-2 netflix-text">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Cerca Lavoro</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Crea Profilo</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Le Mie Candidature</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Consigli per il CV</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Guida ai Colloqui</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Per le Aziende</h4>
              <ul className="space-y-2 netflix-text">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pubblica Annuncio</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Cerca Candidati</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Profilo Aziendale</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Prezzi</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Supporto</h4>
              <ul className="space-y-2 netflix-text">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Centro Assistenza</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contattaci</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Termini di Servizio</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="netflix-text text-sm">© 2024 JobFlix. Tutti i diritti riservati.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="netflix-text text-sm">🇮🇹 Italia</span>
              <span className="netflix-text text-sm">€ EUR</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
