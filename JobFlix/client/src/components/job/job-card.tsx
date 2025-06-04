import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Euro, Bookmark } from "lucide-react";
import type { Job } from "@shared/schema";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return "Stipendio da concordare";
    if (min && max) return `€${min.toLocaleString()} - €${max.toLocaleString()}`;
    if (min) return `Da €${min.toLocaleString()}`;
    return `Fino a €${max!.toLocaleString()}`;
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "oggi";
    if (diffDays === 2) return "ieri";
    if (diffDays <= 7) return `${diffDays - 1} giorni fa`;
    return `${Math.ceil(diffDays / 7)} settimane fa`;
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Link href={`/job/${job.id}`}>
      <div className="job-card netflix-surface rounded-xl p-6 border border-gray-700 hover:border-netflix-red cursor-pointer transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="netflix-text">{job.company}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`transition-colors duration-200 ${
              isBookmarked ? "netflix-red" : "netflix-text hover:text-netflix-red"
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm netflix-text mb-4">
          <span className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace('-', ' ')}
          </span>
          {(job.salaryMin || job.salaryMax) && (
            <span className="flex items-center">
              <Euro className="h-4 w-4 mr-1" />
              {formatSalary(job.salaryMin, job.salaryMax)}
            </span>
          )}
        </div>
        
        <p className="netflix-text mb-4 line-clamp-3 text-sm leading-relaxed">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills?.slice(0, 3).map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="netflix-bg netflix-red text-xs font-medium"
            >
              {skill}
            </Badge>
          ))}
          {job.skills && job.skills.length > 3 && (
            <Badge variant="outline" className="border-gray-600 text-xs">
              +{job.skills.length - 3} altro
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="netflix-text text-sm">
            Pubblicato {formatDate(job.postedAt!)}
          </span>
          <Button 
            className="bg-netflix-red hover:bg-netflix-dark-red text-white text-sm font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Candidati
          </Button>
        </div>
      </div>
    </Link>
  );
}
