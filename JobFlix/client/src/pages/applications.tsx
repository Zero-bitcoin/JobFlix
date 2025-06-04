import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Building, 
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data delle candidature
  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechInnovate",
      location: "Milano, IT",
      appliedDate: "2024-01-15",
      status: "in-review",
      statusLabel: "In revisione",
      salary: "€45.000 - €65.000",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 2,
      jobTitle: "UX/UI Designer",
      company: "CreativeHub",
      location: "Roma, IT",
      appliedDate: "2024-01-10",
      status: "interview",
      statusLabel: "Colloquio programmato",
      salary: "€35.000 - €50.000",
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 3,
      jobTitle: "Backend Developer",
      company: "CloudTech Solutions",
      location: "Torino, IT",
      appliedDate: "2024-01-08",
      status: "pending",
      statusLabel: "In attesa",
      salary: "€50.000 - €70.000",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 4,
      jobTitle: "Digital Marketing Manager",
      company: "CreativeHub",
      location: "Roma, IT",
      appliedDate: "2024-01-05",
      status: "rejected",
      statusLabel: "Non selezionato",
      salary: "€40.000 - €55.000",
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 5,
      jobTitle: "Financial Analyst",
      company: "FinanceForward",
      location: "Milano, IT",
      appliedDate: "2024-01-03",
      status: "accepted",
      statusLabel: "Accettato",
      salary: "€45.000 - €60.000",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "in-review": return <Eye className="h-4 w-4 text-blue-500" />;
      case "interview": return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "accepted": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "in-review": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "interview": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "accepted": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    "in-review": applications.filter(a => a.status === "in-review").length,
    interview: applications.filter(a => a.status === "interview").length,
    accepted: applications.filter(a => a.status === "accepted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  return (
    <div className="pt-16 netflix-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Le mie <span className="netflix-red">candidature</span>
          </h1>
          <p className="text-xl netflix-text">
            Monitora lo stato delle tue candidature e gestisci le opportunità
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="netflix-surface border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{statusCounts.all}</div>
              <p className="netflix-text text-sm">Totali</p>
            </CardContent>
          </Card>
          <Card className="netflix-surface border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{statusCounts.pending}</div>
              <p className="netflix-text text-sm">In attesa</p>
            </CardContent>
          </Card>
          <Card className="netflix-surface border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{statusCounts["in-review"]}</div>
              <p className="netflix-text text-sm">In revisione</p>
            </CardContent>
          </Card>
          <Card className="netflix-surface border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">{statusCounts.interview}</div>
              <p className="netflix-text text-sm">Colloqui</p>
            </CardContent>
          </Card>
          <Card className="netflix-surface border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{statusCounts.accepted}</div>
              <p className="netflix-text text-sm">Accettate</p>
            </CardContent>
          </Card>
          <Card className="netflix-surface border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{statusCounts.rejected}</div>
              <p className="netflix-text text-sm">Rifiutate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="netflix-surface border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 netflix-text" />
                <Input
                  placeholder="Cerca candidature..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 netflix-bg border-gray-600 focus:border-netflix-red"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="netflix-bg border-gray-600 focus:border-netflix-red">
                  <SelectValue placeholder="Filtra per stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="pending">In attesa</SelectItem>
                  <SelectItem value="in-review">In revisione</SelectItem>
                  <SelectItem value="interview">Colloquio</SelectItem>
                  <SelectItem value="accepted">Accettato</SelectItem>
                  <SelectItem value="rejected">Rifiutato</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                variant="outline"
                className="border-gray-600 hover:border-netflix-red"
              >
                <Filter className="h-4 w-4 mr-2" />
                Pulisci filtri
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card className="netflix-surface border-gray-700">
              <CardContent className="p-12 text-center">
                <h3 className="text-xl font-semibold mb-2">Nessuna candidatura trovata</h3>
                <p className="netflix-text">Prova a modificare i filtri di ricerca</p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((application) => (
              <Card key={application.id} className="netflix-surface border-gray-700 hover:border-netflix-red transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={application.logo} 
                        alt={application.company}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{application.jobTitle}</h3>
                        <div className="flex items-center space-x-4 netflix-text mb-2">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{application.company}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{application.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Candidatura: {formatDate(application.appliedDate)}</span>
                          </div>
                        </div>
                        <p className="netflix-text">{application.salary}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getStatusColor(application.status)} border`}>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <span>{application.statusLabel}</span>
                        </div>
                      </Badge>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-600 hover:border-netflix-red">
                          Vedi dettagli
                        </Button>
                        {application.status === "interview" && (
                          <Button size="sm" className="bg-netflix-red hover:bg-netflix-dark-red">
                            Gestisci colloquio
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <Card className="netflix-surface border-gray-700 mt-8">
          <CardHeader>
            <CardTitle>Azioni rapide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-netflix-red hover:bg-netflix-dark-red h-16">
                <div className="text-center">
                  <div className="font-semibold">Cerca nuovi lavori</div>
                  <div className="text-sm opacity-80">Esplora nuove opportunità</div>
                </div>
              </Button>
              <Button variant="outline" className="border-gray-600 hover:border-netflix-red h-16">
                <div className="text-center">
                  <div className="font-semibold">Aggiorna profilo</div>
                  <div className="text-sm opacity-80">Migliora le tue possibilità</div>
                </div>
              </Button>
              <Button variant="outline" className="border-gray-600 hover:border-netflix-red h-16">
                <div className="text-center">
                  <div className="font-semibold">Scarica report</div>
                  <div className="text-sm opacity-80">Analisi delle candidature</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}