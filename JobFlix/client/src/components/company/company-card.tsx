import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Users } from "lucide-react";
import type { Company } from "@shared/schema";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const getSizeLabel = (size: string) => {
    switch (size) {
      case "startup": return "1-50 dipendenti";
      case "medium": return "51-500 dipendenti";
      case "large": return "500+ dipendenti";
      default: return "Dimensione non specificata";
    }
  };

  const getSizeIcon = (size: string) => {
    switch (size) {
      case "startup": return "🚀";
      case "medium": return "🏢";
      case "large": return "🏭";
      default: return "🏪";
    }
  };

  return (
    <div className="netflix-surface rounded-xl p-6 border border-gray-700 hover:border-netflix-red cursor-pointer transition-all duration-300 group">
      <img 
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200" 
        alt={`${company.name} team`}
        className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
      />
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-netflix-red to-netflix-dark-red rounded-lg flex items-center justify-center text-white font-bold text-lg">
          {company.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{company.name}</h3>
          <p className="netflix-text text-sm">{company.industry}</p>
        </div>
      </div>
      
      <p className="netflix-text text-sm mb-4 line-clamp-2">
        {company.description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm netflix-text">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{getSizeLabel(company.size)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-gray-600 text-xs">
            {getSizeIcon(company.size)} {company.size}
          </Badge>
          {company.founded && (
            <Badge variant="outline" className="border-gray-600 text-xs">
              Dal {company.founded}
            </Badge>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="netflix-red hover:bg-netflix-red hover:text-white border-netflix-red text-xs"
        >
          Scopri di più
        </Button>
      </div>
    </div>
  );
}
