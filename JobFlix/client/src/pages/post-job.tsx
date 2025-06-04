import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Building,
  Plus,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PostJob() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    type: "",
    level: "",
    category: "",
    salaryMin: "",
    salaryMax: "",
    skills: [] as string[],
    requirements: [] as string[],
    benefits: [] as string[]
  });

  const [newSkill, setNewSkill] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItem = (type: 'skills' | 'requirements' | 'benefits', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      
      if (type === 'skills') setNewSkill("");
      if (type === 'requirements') setNewRequirement("");
      if (type === 'benefits') setNewBenefit("");
    }
  };

  const removeItem = (type: 'skills' | 'requirements' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validazione base
    if (!formData.title || !formData.description || !formData.company || !formData.location) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }

    try {
      // Qui invieresti i dati al backend
      toast({
        title: "Successo!",
        description: "Il lavoro è stato pubblicato con successo",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
        type: "",
        level: "",
        category: "",
        salaryMin: "",
        salaryMax: "",
        skills: [],
        requirements: [],
        benefits: []
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la pubblicazione",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="pt-16 netflix-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Pubblica un <span className="netflix-red">lavoro</span>
          </h1>
          <p className="text-xl netflix-text">
            Trova i migliori talenti per la tua azienda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-netflix-red" />
                Informazioni Generali
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title" className="text-gray-700 font-medium">Titolo del lavoro *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Es. Senior Frontend Developer"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
                
                <div>
                  <Label htmlFor="company" className="text-gray-700 font-medium">Nome azienda *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Es. TechInnovate"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-700 font-medium">Descrizione del lavoro *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descrivi il ruolo, le responsabilità e l'ambiente di lavoro..."
                  className="mt-2 min-h-32 border-gray-300 focus:border-netflix-red"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="location" className="text-gray-700 font-medium">Località *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Es. Milano, IT"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-gray-700 font-medium">Tipo di contratto</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="mt-2 border-gray-300 focus:border-netflix-red">
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Freelance</SelectItem>
                      <SelectItem value="remote">Remoto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level" className="text-gray-700 font-medium">Livello esperienza</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger className="mt-2 border-gray-300 focus:border-netflix-red">
                      <SelectValue placeholder="Seleziona livello" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid-level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category and Salary */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-netflix-red" />
                Categoria e Compenso
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="category" className="text-gray-700 font-medium">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="mt-2 border-gray-300 focus:border-netflix-red">
                      <SelectValue placeholder="Seleziona categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sviluppo Software">Sviluppo Software</SelectItem>
                      <SelectItem value="Design & UX">Design & UX</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Risorse Umane">Risorse Umane</SelectItem>
                      <SelectItem value="Ingegneria">Ingegneria</SelectItem>
                      <SelectItem value="Vendite">Vendite</SelectItem>
                      <SelectItem value="Finanza">Finanza</SelectItem>
                      <SelectItem value="Altro">Altro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="salaryMin" className="text-gray-700 font-medium">Stipendio minimo (€)</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    placeholder="Es. 35000"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>

                <div>
                  <Label htmlFor="salaryMax" className="text-gray-700 font-medium">Stipendio massimo (€)</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    placeholder="Es. 50000"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-netflix-red" />
                Competenze Richieste
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Aggiungi una competenza..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', newSkill))}
                  className="border-gray-300 focus:border-netflix-red"
                />
                <Button 
                  type="button"
                  onClick={() => addItem('skills', newSkill)}
                  className="bg-netflix-red hover:bg-red-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="border-gray-400 text-gray-800 bg-gray-50 hover:bg-red-50 transition-colors"
                  >
                    {skill}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-netflix-red" 
                      onClick={() => removeItem('skills', index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-netflix-red" />
                Requisiti
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Aggiungi un requisito..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('requirements', newRequirement))}
                  className="border-gray-300 focus:border-netflix-red"
                />
                <Button 
                  type="button"
                  onClick={() => addItem('requirements', newRequirement)}
                  className="bg-netflix-red hover:bg-red-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-800">{req}</span>
                    <X 
                      className="h-4 w-4 cursor-pointer hover:text-netflix-red text-gray-500" 
                      onClick={() => removeItem('requirements', index)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Building className="h-5 w-5 mr-2 text-netflix-red" />
                Benefici Offerti
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Aggiungi un beneficio..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('benefits', newBenefit))}
                  className="border-gray-300 focus:border-netflix-red"
                />
                <Button 
                  type="button"
                  onClick={() => addItem('benefits', newBenefit)}
                  className="bg-netflix-red hover:bg-red-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-800">{benefit}</span>
                    <X 
                      className="h-4 w-4 cursor-pointer hover:text-netflix-red text-gray-500" 
                      onClick={() => removeItem('benefits', index)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <Card className="bg-gradient-to-r from-netflix-red to-red-600 border-none shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Pronto a pubblicare?</h3>
              <p className="text-red-100 mb-6">Il tuo annuncio sarà visibile a migliaia di candidati qualificati</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-netflix-red transition-all duration-200"
                >
                  Salva come bozza
                </Button>
                <Button
                  type="submit"
                  className="bg-white text-netflix-red hover:bg-gray-100 font-semibold px-8 py-2 transform hover:scale-105 transition-all duration-200"
                >
                  Pubblica lavoro
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}