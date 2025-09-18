import { useState } from 'react'
import { 
  User, 
  Save, 
  Upload, 
  Download, 
  Edit3, 
  Plus,
  Trash2,
  MapPin,
  Mail,
  Phone,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Code
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'

export function UserProfile() {
  const [profile, setProfile] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: []
  })

  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  const handlePersonalInfoChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        technologies: []
      }]
    }))
  }

  const updateExperience = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
        description: ''
      }]
    }))
  }

  const updateEducation = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = (skill) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }

  const removeSkill = (skill) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const saveProfile = () => {
    // TODO: Save to localStorage or backend
    localStorage.setItem('userProfile', JSON.stringify(profile))
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  const loadProfile = () => {
    const saved = localStorage.getItem('userProfile')
    if (saved) {
      setProfile(JSON.parse(saved))
    }
  }

  const exportProfile = () => {
    const dataStr = JSON.stringify(profile, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'profile.json'
    link.click()
  }

  const importProfile = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result)
          setProfile(imported)
        } catch (error) {
          console.error('Error importing profile:', error)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                Meu Perfil
              </CardTitle>
              <CardDescription>
                Complete seu perfil para gerar currículos personalizados e otimizados
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={exportProfile}
                className="glass-button"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <label>
                <Button
                  variant="outline"
                  className="glass-button cursor-pointer"
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importProfile}
                  className="hidden"
                />
              </label>
              <Button
                onClick={isEditing ? saveProfile : () => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 glass-container">
          <TabsTrigger value="personal">Pessoal</TabsTrigger>
          <TabsTrigger value="experience">Experiência</TabsTrigger>
          <TabsTrigger value="education">Educação</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="additional">Adicional</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    value={profile.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    disabled={!isEditing}
                    className="glass-button"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="glass-button"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profile.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="glass-button"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={profile.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="glass-button"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.personalInfo.website}
                    onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="glass-button"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profile.personalInfo.linkedin}
                    onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                    disabled={!isEditing}
                    className="glass-button"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Resumo Profissional</Label>
                <Textarea
                  id="summary"
                  rows={4}
                  value={profile.personalInfo.summary}
                  onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                  disabled={!isEditing}
                  className="glass-button"
                  placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience */}
        <TabsContent value="experience">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Experiência Profissional
                </CardTitle>
                {isEditing && (
                  <Button onClick={addExperience} className="glass-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.experience.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma experiência adicionada ainda</p>
                  {isEditing && (
                    <Button onClick={addExperience} className="mt-4 glass-button">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Primeira Experiência
                    </Button>
                  )}
                </div>
              ) : (
                profile.experience.map((exp) => (
                  <Card key={exp.id} className="border border-gray-200">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Empresa</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            disabled={!isEditing}
                            className="glass-button"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Cargo</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            disabled={!isEditing}
                            className="glass-button"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Data de Início</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            disabled={!isEditing}
                            className="glass-button"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Data de Fim</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={!isEditing || exp.current}
                            className="glass-button"
                          />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label>Descrição</Label>
                        <Textarea
                          rows={3}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          disabled={!isEditing}
                          className="glass-button"
                        />
                      </div>
                      {isEditing && (
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education */}
        <TabsContent value="education">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Educação
                </CardTitle>
                {isEditing && (
                  <Button onClick={addEducation} className="glass-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.education.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma formação adicionada ainda</p>
                  {isEditing && (
                    <Button onClick={addEducation} className="mt-4 glass-button">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Primeira Formação
                    </Button>
                  )}
                </div>
              ) : (
                profile.education.map((edu) => (
                  <Card key={edu.id} className="border border-gray-200">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Instituição</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            disabled={!isEditing}
                            className="glass-button"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Grau</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            disabled={!isEditing}
                            className="glass-button"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Área de Estudo</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            disabled={!isEditing}
                            className="glass-button"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Ano de Conclusão</Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            disabled={!isEditing}
                            className="glass-button"
                          />
                        </div>
                      </div>
                      {isEditing && (
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Habilidades e Tecnologias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Digite uma habilidade e pressione Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(e.target.value.trim())
                        e.target.value = ''
                      }
                    }}
                    className="glass-button"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="glass-badge"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {profile.skills.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma habilidade adicionada ainda</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional */}
        <TabsContent value="additional">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Informações Adicionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Certificações, idiomas e outras informações em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

