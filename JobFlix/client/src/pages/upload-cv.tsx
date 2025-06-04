import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
  Plus,
  X,
  FileText,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UploadCV() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Dati personali
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    dateOfBirth: "",
    bio: "",
    
    // Preferenze lavorative
    jobTypes: [] as string[],
    preferredLocations: [] as string[],
    salaryExpectation: "",
    availability: "",
    
    // Skills e badges
    skills: [] as string[],
    badges: [] as string[],
    
    // Esperienza
    experience: "",
    education: "",
    languages: [] as string[]
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [newBadge, setNewBadge] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
    } else {
      toast({
        title: "Errore",
        description: "Il file deve essere in formato PDF",
        variant: "destructive"
      });
    }
  };

  const addItem = (type: 'skills' | 'badges' | 'languages', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      
      if (type === 'skills') setNewSkill("");
      if (type === 'badges') setNewBadge("");
      if (type === 'languages') setNewLanguage("");
    }
  };

  const removeItem = (type: 'skills' | 'badges' | 'languages' | 'jobTypes' | 'preferredLocations', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      jobTypes: checked 
        ? [...prev.jobTypes, jobType]
        : prev.jobTypes.filter(type => type !== jobType)
    }));
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredLocations: checked 
        ? [...prev.preferredLocations, location]
        : prev.preferredLocations.filter(loc => loc !== location)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !cvFile) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori e carica il CV",
        variant: "destructive"
      });
      return;
    }

    try {
      // Qui invieresti i dati al backend
      toast({
        title: "Successo!",
        description: "Il tuo CV è stato pubblicato con successo",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il caricamento",
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
            Pubblica il tuo <span className="netflix-red">CV</span>
          </h1>
          <p className="text-xl netflix-text">
            Fatti trovare dalle migliori aziende
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dati Personali */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-netflix-red" />
                Dati Personali
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">Nome *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Il tuo nome"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">Cognome *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Il tuo cognome"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="la.tua.email@esempio.com"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">Telefono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+39 123 456 7890"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-gray-700 font-medium">Località</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Milano, IT"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium">Data di nascita</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio" className="text-gray-700 font-medium">Presentazione personale</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Racconta qualcosa di te, delle tue passioni e dei tuoi obiettivi professionali..."
                  className="mt-2 min-h-24 border-gray-300 focus:border-netflix-red"
                />
              </div>
            </CardContent>
          </Card>

          {/* Upload CV */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-netflix-red" />
                Curriculum Vitae
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-netflix-red transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="cv-upload"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {cvFile ? (
                    <div>
                      <p className="text-lg font-medium text-gray-900">{cvFile.name}</p>
                      <p className="text-sm text-gray-500">Clicca per sostituire</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-gray-900">Carica il tuo CV</p>
                      <p className="text-sm text-gray-500">Solo file PDF - Max 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Preferenze Lavorative */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-netflix-red" />
                Preferenze Lavorative
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label className="text-gray-700 font-medium mb-3 block">Tipo di contratto preferito</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Full-time", "Part-time", "Freelance", "Stage"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.jobTypes.includes(type)}
                        onCheckedChange={(checked) => handleJobTypeChange(type, checked as boolean)}
                      />
                      <Label htmlFor={type} className="text-gray-700">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-medium mb-3 block">Località preferite</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Milano", "Roma", "Torino", "Napoli", "Bologna", "Remoto"].map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={formData.preferredLocations.includes(location)}
                        onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                      />
                      <Label htmlFor={location} className="text-gray-700">{location}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="salaryExpectation" className="text-gray-700 font-medium">Aspettativa salariale (€/anno)</Label>
                  <Input
                    id="salaryExpectation"
                    value={formData.salaryExpectation}
                    onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                    placeholder="Es. 35.000 - 45.000"
                    className="mt-2 border-gray-300 focus:border-netflix-red"
                  />
                </div>
                
                <div>
                  <Label htmlFor="availability" className="text-gray-700 font-medium">Disponibilità</Label>
                  <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger className="mt-2 border-gray-300 focus:border-netflix-red">
                      <SelectValue placeholder="Quando puoi iniziare?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediata</SelectItem>
                      <SelectItem value="1-month">Entro 1 mese</SelectItem>
                      <SelectItem value="2-months">Entro 2 mesi</SelectItem>
                      <SelectItem value="3-months">Entro 3 mesi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Star className="h-5 w-5 mr-2 text-netflix-red" />
                Competenze Tecniche
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

          {/* Badges Personalizzabili */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2 text-netflix-red" />
                Badge Personalizzabili
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">Aggiungi badge che ti descrivono meglio (es. "Team Leader", "Problem Solver", "Innovativo")</p>
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  placeholder="Aggiungi un badge..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('badges', newBadge))}
                  className="border-gray-300 focus:border-netflix-red"
                />
                <Button 
                  type="button"
                  onClick={() => addItem('badges', newBadge)}
                  className="bg-netflix-red hover:bg-red-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.badges.map((badge, index) => (
                  <Badge 
                    key={index}
                    className="bg-netflix-red text-white hover:bg-red-600 transition-colors"
                  >
                    {badge}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-red-200" 
                      onClick={() => removeItem('badges', index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lingue */}
          <Card className="bg-white border-gray-300 shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-netflix-red" />
                Lingue
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Aggiungi una lingua..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('languages', newLanguage))}
                  className="border-gray-300 focus:border-netflix-red"
                />
                <Button 
                  type="button"
                  onClick={() => addItem('languages', newLanguage)}
                  className="bg-netflix-red hover:bg-red-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="border-blue-400 text-blue-800 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    {language}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-600" 
                      onClick={() => removeItem('languages', index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card className="bg-gradient-to-r from-netflix-red to-red-600 border-none shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Pronto a farti trovare?</h3>
              <p className="text-red-100 mb-6">Il tuo profilo sarà visibile alle migliori aziende</p>
              
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
                  Pubblica CV
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}