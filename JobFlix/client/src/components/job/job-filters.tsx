import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import type { JobFilters } from "@/lib/types";

interface JobFiltersProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
}

export default function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const handleSalaryChange = (value: string) => {
    const [min, max] = value.split('-').map(v => v === 'null' ? null : parseInt(v));
    onFiltersChange({
      ...filters,
      salaryMin: min || undefined,
      salaryMax: max || undefined,
    });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.type ? filters.type.split(',') : [];
    const updatedTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter(t => t !== type);
    
    onFiltersChange({
      ...filters,
      type: updatedTypes.length > 0 ? updatedTypes.join(',') : undefined,
    });
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    const currentLevels = filters.level ? filters.level.split(',') : [];
    const updatedLevels = checked
      ? [...currentLevels, level]
      : currentLevels.filter(l => l !== level);
    
    onFiltersChange({
      ...filters,
      level: updatedLevels.length > 0 ? updatedLevels.join(',') : undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const selectedTypes = filters.type ? filters.type.split(',') : [];
  const selectedLevels = filters.level ? filters.level.split(',') : [];

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Filtri</h3>
      
      {/* Job Type */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Tipo di Lavoro</h4>
        <div className="space-y-2">
          {[
            { value: "full-time", label: "Full-time" },
            { value: "part-time", label: "Part-time" },
            { value: "remote", label: "Remoto" },
            { value: "contract", label: "Freelance" },
          ].map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.value}`}
                checked={selectedTypes.includes(type.value)}
                onCheckedChange={(checked) => handleTypeChange(type.value, checked as boolean)}
              />
              <Label htmlFor={`type-${type.value}`} className="text-sm cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="bg-gray-700 mb-6" />
      
      {/* Experience Level */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Livello di Esperienza</h4>
        <div className="space-y-2">
          {[
            { value: "entry", label: "Entry Level" },
            { value: "mid", label: "Mid Level" },
            { value: "senior", label: "Senior Level" },
            { value: "executive", label: "Executive" },
          ].map((level) => (
            <div key={level.value} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${level.value}`}
                checked={selectedLevels.includes(level.value)}
                onCheckedChange={(checked) => handleLevelChange(level.value, checked as boolean)}
              />
              <Label htmlFor={`level-${level.value}`} className="text-sm cursor-pointer">
                {level.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={clearFilters}
          className="w-full bg-netflix-red hover:bg-netflix-dark-red text-white"
        >
          Pulisci Filtri
        </Button>
      </div>
    </div>
  );
}
