import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, MapPin, Briefcase, Edit, Save, X } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Mario Rossi",
    email: "mario.rossi@email.com",
    location: "Milano, IT",
    bio: "Sviluppatore Full Stack con 5+ anni di esperienza in React, Node.js e tecnologie cloud. Appassionato di innovazione e sempre alla ricerca di nuove sfide.",
    experience: "Senior Full Stack Developer",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  return (
    <div className="pt-16 netflix-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="netflix-surface border-gray-700 mb-8">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6 text-[#000000] pl-[0px] pr-[0px]">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-netflix-red rounded-full flex items-center justify-center text-2xl font-bold">
                  MR
                </div>
                <div>
                  {isEditing ? (
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="text-2xl font-bold bg-gray-800 border-gray-600 text-white mb-2"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold mb-2 text-[#3c445c]">{formData.fullName}</h1>
                  )}
                  
                  {isEditing ? (
                    <Input
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white mb-2"
                    />
                  ) : (
                    <p className="text-lg text-gray-300 mb-2">{formData.experience}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 netflix-text">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      {isEditing ? (
                        <Input
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white text-sm"
                        />
                      ) : (
                        <span className="text-gray-800 font-medium">{formData.email}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      {isEditing ? (
                        <Input
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white text-sm"
                        />
                      ) : (
                        <span className="text-gray-800 font-medium">{formData.location}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm" className="bg-netflix-red hover:bg-netflix-dark-red">
                      <Save className="h-4 w-4 mr-2" />
                      Salva
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm" className="border-gray-600">
                      <X className="h-4 w-4 mr-2" />
                      Annulla
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="border-gray-600">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifica
                  </Button>
                )}
              </div>
            </div>

            <Separator className="bg-gray-700 mb-6" />

            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-netflix-red pb-2">Bio Professionale</h3>
              {isEditing ? (
                <Textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed text-lg">{formData.bio}</p>
              )}
            </div>

            <Separator className="bg-gray-300 my-8" />

            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-netflix-red pb-2">Competenze Tecniche</h3>
              {isEditing ? (
                <div>
                  <Input
                    value={formData.skills.join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    placeholder="Inserisci le competenze separate da virgola"
                    className="bg-gray-800 border-gray-600 text-white mb-2"
                  />
                  <p className="text-sm text-gray-600">Separa le competenze con una virgola</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {formData.skills.map((skill, index) => {
                    const getSkillCategory = (skill: string) => {
                      const lowerSkill = skill.toLowerCase();
                      if (lowerSkill.includes('javascript') || lowerSkill.includes('typescript') || lowerSkill.includes('react') || lowerSkill.includes('vue') || lowerSkill.includes('angular') || lowerSkill.includes('node') || lowerSkill.includes('python') || lowerSkill.includes('java') || lowerSkill.includes('html') || lowerSkill.includes('css')) {
                        return 'programming'; // Blu chiaro
                      }
                      if (lowerSkill.includes('design') || lowerSkill.includes('ui') || lowerSkill.includes('ux') || lowerSkill.includes('figma') || lowerSkill.includes('photoshop') || lowerSkill.includes('illustrator')) {
                        return 'design'; // Verde chiaro
                      }
                      if (lowerSkill.includes('marketing') || lowerSkill.includes('seo') || lowerSkill.includes('social') || lowerSkill.includes('content') || lowerSkill.includes('copywriting')) {
                        return 'marketing'; // Arancione chiaro
                      }
                      if (lowerSkill.includes('project') || lowerSkill.includes('management') || lowerSkill.includes('scrum') || lowerSkill.includes('agile') || lowerSkill.includes('leadership')) {
                        return 'management'; // Viola chiaro
                      }
                      if (lowerSkill.includes('sales') || lowerSkill.includes('business') || lowerSkill.includes('finance') || lowerSkill.includes('accounting')) {
                        return 'business'; // Giallo chiaro
                      }
                      return 'other'; // Grigio chiaro
                    };

                    const getCategoryColor = (category: string) => {
                      switch (category) {
                        case 'programming': return 'bg-blue-100 text-blue-800 border-blue-200';
                        case 'design': return 'bg-green-100 text-green-800 border-green-200';
                        case 'marketing': return 'bg-orange-100 text-orange-800 border-orange-200';
                        case 'management': return 'bg-purple-100 text-purple-800 border-purple-200';
                        case 'business': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                        default: return 'bg-gray-100 text-gray-800 border-gray-200';
                      }
                    };

                    const category = getSkillCategory(skill);
                    const colorClass = getCategoryColor(category);

                    return (
                      <Badge 
                        key={`${skill}-${index}`} 
                        variant="outline" 
                        className={`${colorClass} cursor-default px-3 py-1 text-sm font-medium`}
                      >
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-gray-300 hover:shadow-xl hover:border-netflix-red transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 font-medium">Candidature Inviate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
              <p className="text-green-600 text-sm font-medium">+3 questo mese</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-300 hover:shadow-xl hover:border-netflix-red transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 font-medium">Lavori Salvati</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
              <p className="text-blue-600 text-sm font-medium">+2 questa settimana</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-300 hover:shadow-xl hover:border-netflix-red transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 font-medium">Visualizzazioni Profilo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">147</div>
              <p className="text-purple-600 text-sm font-medium">+15 questo mese</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card className="bg-white border-gray-300 hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-900 text-xl font-bold">Candidature Recenti</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {[
                {
                  company: "TechInnovate",
                  position: "Senior Frontend Developer",
                  status: "In revisione",
                  date: "2 giorni fa",
                  statusColor: "bg-yellow-500"
                },
                {
                  company: "CreativeHub",
                  position: "UX/UI Designer",
                  status: "Colloquio programmato",
                  date: "1 settimana fa",
                  statusColor: "bg-blue-500"
                },
                {
                  company: "CloudTech Solutions",
                  position: "Backend Developer",
                  status: "Inviata",
                  date: "2 settimane fa",
                  statusColor: "bg-gray-500"
                }
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center group-hover:from-netflix-red group-hover:to-red-600 transition-all duration-300">
                      <Briefcase className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-netflix-red transition-colors duration-200">{application.position}</h4>
                      <p className="text-gray-600 text-sm">{application.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${application.statusColor} shadow-sm`}></div>
                      <span className="text-sm text-gray-900 font-medium">{application.status}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{application.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 text-center border-t border-gray-200">
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:border-netflix-red hover:text-netflix-red hover:bg-red-50 transform hover:scale-105 transition-all duration-200"
              >
                Vedi tutte le candidature
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
