import { useState } from "react";
import { useCompanies } from "@/hooks/use-companies";
import CompanyCard from "@/components/company/company-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  
  const { data: companies = [], isLoading } = useCompanies();

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = !searchTerm || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = !industryFilter || industryFilter === "all" || company.industry === industryFilter;
    const matchesSize = !sizeFilter || sizeFilter === "all" || company.size === sizeFilter;
    
    return matchesSearch && matchesIndustry && matchesSize;
  });

  const industries = Array.from(new Set(companies.map(c => c.industry)));

  return (
    <div className="pt-16 netflix-bg min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Scopri le <span className="netflix-red">migliori aziende</span>
          </h1>
          <p className="text-xl netflix-text max-w-2xl mx-auto">
            Esplora le aziende leader nei vari settori e trova il posto di lavoro perfetto per te
          </p>
        </div>

        {/* Filters */}
        <div className="netflix-surface rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 netflix-text" />
              <Input
                placeholder="Cerca aziende..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 netflix-bg border-gray-600 focus:border-netflix-red"
              />
            </div>
            
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="netflix-bg border-gray-600 focus:border-netflix-red">
                <SelectValue placeholder="Settore" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i settori</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger className="netflix-bg border-gray-600 focus:border-netflix-red">
                <SelectValue placeholder="Dimensione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le dimensioni</SelectItem>
                <SelectItem value="startup">Startup (1-50)</SelectItem>
                <SelectItem value="medium">Media (51-500)</SelectItem>
                <SelectItem value="large">Grande (500+)</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={() => {
                setSearchTerm("");
                setIndustryFilter("all");
                setSizeFilter("all");
              }}
              variant="outline"
              className="border-gray-600 hover:border-netflix-red"
            >
              Pulisci filtri
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="netflix-text">
            {filteredCompanies.length} aziende trovate
          </p>
        </div>

        {/* Companies Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="netflix-surface rounded-xl p-6 animate-pulse">
                <div className="h-32 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                <div className="h-3 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Nessuna azienda trovata</h3>
            <p className="netflix-text">Prova a modificare i filtri di ricerca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
