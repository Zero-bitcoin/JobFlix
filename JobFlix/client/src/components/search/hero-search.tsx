import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Briefcase, MapPin } from "lucide-react";
import type { JobFilters } from "@/lib/types";

interface HeroSearchProps {
  onSearch: (filters: Partial<JobFilters>) => void;
}

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const handleSearch = () => {
    onSearch({
      search: searchTerm || undefined,
      location: location || undefined,
      type: jobType && jobType !== "all" ? jobType : undefined,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="netflix-surface/90 backdrop-blur-sm rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Posizione lavorativa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full netflix-bg border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-netflix-red focus:border-netflix-red pr-10"
          />
          <Briefcase className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 netflix-text" />
        </div>
        
        <div className="relative">
          <Input
            type="text"
            placeholder="Località"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full netflix-bg border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-netflix-red focus:border-netflix-red pr-10"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 netflix-text" />
        </div>
        
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger className="netflix-bg border-gray-600 text-white focus:ring-2 focus:ring-netflix-red focus:border-netflix-red">
            <SelectValue placeholder="Tipo di contratto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i tipi</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Freelance</SelectItem>
            <SelectItem value="remote">Remoto</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          onClick={handleSearch}
          className="bg-netflix-red hover:bg-netflix-dark-red text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Cerca
        </Button>
      </div>
    </div>
  );
}
