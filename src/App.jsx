import { useState } from 'react'
import { Search, User, History, Settings, Briefcase, MapPin, Clock, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { SearchFilters } from './components/SearchFilters.jsx'
import { JobCard } from './components/JobCard.jsx'
import { UserProfile } from './components/UserProfile.jsx'
import { CVHistory } from './components/CVHistory.jsx'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('search')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    experienceLevels: [],
    workModes: [],
    contractTypes: [],
    locations: [],
    technologies: '',
    excludeTerms: '',
    dateRange: '',
    salaryRange: ''
  })

  // Enhanced mock data for demonstration
  const mockJobs = [
    {
      id: 1,
      title: 'Data Engineer',
      company: 'TechCorp',
      location: 'Remote',
      type: 'Full-time',
      posted: '2 dias atrás',
      salary: 'R$ 8.000 - R$ 12.000',
      description: 'Procuramos um Data Engineer experiente para trabalhar com pipelines de dados escaláveis usando Python, SQL e AWS. Você será responsável por desenvolver e manter nossa infraestrutura de dados, garantindo alta disponibilidade e performance.',
      tags: ['Python', 'SQL', 'AWS', 'Apache Spark', 'Docker', 'Kubernetes'],
      requirements: [
        'Experiência com Python e SQL',
        'Conhecimento em AWS (S3, EC2, RDS)',
        'Experiência com Apache Spark',
        'Conhecimento em Docker e Kubernetes',
        'Inglês intermediário'
      ],
      matchScore: 85,
      url: 'https://example.com/job/1'
    },
    {
      id: 2,
      title: 'Senior Data Engineer',
      company: 'DataFlow Inc',
      location: 'São Paulo, SP',
      type: 'Híbrido',
      posted: '1 semana atrás',
      salary: 'R$ 12.000 - R$ 18.000',
      description: 'Oportunidade para Data Engineer sênior em empresa de tecnologia líder no mercado. Trabalhe com big data, machine learning e arquiteturas modernas de dados.',
      tags: ['Python', 'Kafka', 'Docker', 'Kubernetes', 'Airflow', 'Snowflake'],
      requirements: [
        '5+ anos de experiência em engenharia de dados',
        'Expertise em Apache Kafka',
        'Conhecimento em Airflow',
        'Experiência com Snowflake ou similar',
        'Liderança técnica'
      ],
      matchScore: 92,
      url: 'https://example.com/job/2'
    },
    {
      id: 3,
      title: 'Machine Learning Engineer',
      company: 'AI Solutions',
      location: 'Work from anywhere',
      type: 'Full-time',
      posted: '3 dias atrás',
      salary: 'R$ 10.000 - R$ 15.000',
      description: 'Junte-se ao nosso time de ML para desenvolver soluções inovadoras usando TensorFlow, PyTorch e tecnologias de ponta. Trabalhe em projetos desafiadores de IA.',
      tags: ['Python', 'TensorFlow', 'MLOps', 'GCP', 'PyTorch', 'Kubernetes'],
      requirements: [
        'Experiência com TensorFlow e PyTorch',
        'Conhecimento em MLOps',
        'Experiência com GCP',
        'Conhecimento em estatística e matemática',
        'Experiência com deployment de modelos'
      ],
      matchScore: 78,
      url: 'https://example.com/job/3'
    }
  ]

  const handleSearch = () => {
    // TODO: Implement actual search functionality
    console.log('Searching for:', searchQuery, 'with filters:', filters)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    // TODO: Trigger search with new filters
  }

  const handleGenerateCV = (job) => {
    console.log('Generating CV for job:', job.title, 'at', job.company)
    // TODO: Implement actual CV generation
  }

  const handleSaveJob = (job, saved) => {
    console.log(saved ? 'Saved job:' : 'Unsaved job:', job.title)
    // TODO: Implement job saving functionality
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header with Liquid Glass effect */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  JobSeeker AI
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant={activeTab === 'search' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('search')}
                className="glass-button"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('profile')}
                className="glass-button"
              >
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
              <Button
                variant={activeTab === 'history' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('history')}
                className="glass-button"
              >
                <History className="h-4 w-4 mr-2" />
                Histórico
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'search' && (
          <div className="space-y-8">
            {/* Hero Section with Search */}
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Encontre sua vaga ideal
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Busque vagas de emprego com IA e gere currículos personalizados com um clique
              </p>
              
              {/* Search Bar with Liquid Glass effect */}
              <div className="max-w-2xl mx-auto">
                <div className="relative glass-container p-6 rounded-2xl">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Ex: Data Engineer, Product Manager, Frontend Developer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-12 text-lg border-0 bg-white/50 backdrop-blur-sm"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button 
                      size="lg" 
                      className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={handleSearch}
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Buscar
                    </Button>
                  </div>
                  
                  {/* Quick Filters */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge 
                      variant="secondary" 
                      className="glass-badge cursor-pointer"
                      onClick={() => handleFiltersChange({...filters, workModes: ['Remoto']})}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      Remoto
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className="glass-badge cursor-pointer"
                      onClick={() => handleFiltersChange({...filters, dateRange: 'week'})}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Últimos 7 dias
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className="glass-badge cursor-pointer"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-3 w-3 mr-1" />
                      Mais filtros
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="max-w-4xl mx-auto">
              <SearchFilters
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Job Results */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Vagas encontradas ({mockJobs.length})
                </h2>
                {!showFilters && (
                  <SearchFilters
                    isOpen={false}
                    onToggle={() => setShowFilters(true)}
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                  />
                )}
              </div>

              <div className="grid gap-6">
                {mockJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onGenerateCV={handleGenerateCV}
                    onSaveJob={handleSaveJob}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <UserProfile />
        )}

        {activeTab === 'history' && (
          <CVHistory />
        )}
      </main>
    </div>
  )
}

export default App

