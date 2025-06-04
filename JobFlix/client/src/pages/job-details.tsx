import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  Euro, 
  Bookmark, 
  Share2, 
  Building, 
  Calendar,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import type { Job } from "@shared/schema";

export default function JobDetails() {
  const { id } = useParams();
  
  const { data: job, isLoading } = useQuery<Job>({
    queryKey: [`/api/jobs/${id}`],
  });

  if (isLoading) {
    return (
      <div className="pt-16 netflix-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded mb-8 w-1/3"></div>
            <div className="h-32 bg-gray-700 rounded mb-8"></div>
            <div className="h-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-16 netflix-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Offerta di lavoro non trovata</h1>
            <Link href="/">
              <Button>Torna alla ricerca</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    
    if (diffDays === 1) return "Pubblicato oggi";
    if (diffDays === 2) return "Pubblicato ieri";
    if (diffDays <= 7) return `Pubblicato ${diffDays - 1} giorni fa`;
    return `Pubblicato il ${d.toLocaleDateString('it-IT')}`;
  };

  return (
    <div className="pt-16 netflix-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 netflix-text hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla ricerca
          </Button>
        </Link>

        {/* Job header */}
        <div className="netflix-surface rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                alt={job.company}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex items-center space-x-2 netflix-text">
                  <Building className="h-4 w-4" />
                  <span className="text-lg">{job.company}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2 netflix-text">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2 netflix-text">
              <Clock className="h-4 w-4" />
              <span className="capitalize">{job.type.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center space-x-2 netflix-text">
              <Euro className="h-4 w-4" />
              <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
            </div>
            <div className="flex items-center space-x-2 netflix-text">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(job.postedAt!)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="netflix-bg netflix-red">
              {job.category}
            </Badge>
            <Badge variant="outline" className="border-gray-600">
              {job.level.charAt(0).toUpperCase() + job.level.slice(1)} Level
            </Badge>
            {job.skills?.map((skill) => (
              <Badge key={skill} variant="outline" className="border-gray-600">
                {skill}
              </Badge>
            ))}
          </div>

          <Button className="bg-netflix-red hover:bg-netflix-dark-red text-white px-8">
            Candidati Ora
          </Button>
        </div>

        {/* Job description and details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="netflix-surface rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Descrizione del lavoro</h2>
              <div className="prose prose-invert max-w-none">
                <p className="netflix-text leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <>
                  <Separator className="my-8 bg-gray-700" />
                  <h3 className="text-xl font-bold mb-4">Requisiti</h3>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 netflix-red mt-0.5 flex-shrink-0" />
                        <span className="netflix-text">{req}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <>
                  <Separator className="my-8 bg-gray-700" />
                  <h3 className="text-xl font-bold mb-4">Cosa offriamo</h3>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="netflix-text">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="netflix-surface rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Dettagli Posizione</h3>
              <div className="space-y-4">
                <div>
                  <span className="netflix-text text-sm">Tipo di contratto</span>
                  <p className="font-medium capitalize">{job.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="netflix-text text-sm">Livello di esperienza</span>
                  <p className="font-medium capitalize">{job.level} Level</p>
                </div>
                <div>
                  <span className="netflix-text text-sm">Categoria</span>
                  <p className="font-medium">{job.category}</p>
                </div>
                <div>
                  <span className="netflix-text text-sm">Località</span>
                  <p className="font-medium">{job.location}</p>
                </div>
                {job.salaryMin && job.salaryMax && (
                  <div>
                    <span className="netflix-text text-sm">Stipendio</span>
                    <p className="font-medium">{formatSalary(job.salaryMin, job.salaryMax)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="netflix-surface rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Informazioni Azienda</h3>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60" 
                  alt={job.company}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium">{job.company}</h4>
                  <p className="netflix-text text-sm">Software Development</p>
                </div>
              </div>
              <p className="netflix-text text-sm mb-4">
                Azienda leader nello sviluppo di soluzioni software innovative.
              </p>
              <Button variant="outline" className="w-full border-gray-600 hover:border-netflix-red">
                Vedi profilo azienda
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
