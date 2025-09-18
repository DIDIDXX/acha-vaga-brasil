import { useState, useEffect } from 'react'
import { 
  History, 
  Download, 
  Eye, 
  Trash2, 
  Calendar,
  Briefcase,
  Building,
  Star,
  StarOff,
  Search,
  Filter,
  MoreVertical,
  Share2,
  Copy
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'

export function CVHistory() {
  const [cvHistory, setCvHistory] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [filterBy, setFilterBy] = useState('all')

  // Mock data for demonstration
  const mockCVHistory = [
    {
      id: 1,
      jobTitle: 'Data Engineer',
      company: 'TechCorp',
      generatedAt: '2024-01-15T10:30:00Z',
      status: 'downloaded',
      matchScore: 85,
      favorite: true,
      tags: ['Python', 'SQL', 'AWS'],
      fileName: 'CV_Data_Engineer_TechCorp.pdf',
      jobUrl: 'https://example.com/job/1',
      notes: 'Currículo otimizado para vaga remota com foco em big data'
    },
    {
      id: 2,
      jobTitle: 'Senior Data Engineer',
      company: 'DataFlow Inc',
      generatedAt: '2024-01-14T15:45:00Z',
      status: 'generated',
      matchScore: 92,
      favorite: false,
      tags: ['Python', 'Kafka', 'Docker'],
      fileName: 'CV_Senior_Data_Engineer_DataFlow.pdf',
      jobUrl: 'https://example.com/job/2',
      notes: 'Enfatizou experiência com Apache Kafka e liderança técnica'
    },
    {
      id: 3,
      jobTitle: 'Machine Learning Engineer',
      company: 'AI Solutions',
      generatedAt: '2024-01-13T09:15:00Z',
      status: 'viewed',
      matchScore: 78,
      favorite: true,
      tags: ['Python', 'TensorFlow', 'MLOps'],
      fileName: 'CV_ML_Engineer_AI_Solutions.pdf',
      jobUrl: 'https://example.com/job/3',
      notes: 'Destacou projetos de machine learning e deployment de modelos'
    },
    {
      id: 4,
      jobTitle: 'Backend Developer',
      company: 'StartupXYZ',
      generatedAt: '2024-01-12T14:20:00Z',
      status: 'generated',
      matchScore: 71,
      favorite: false,
      tags: ['Node.js', 'MongoDB', 'API'],
      fileName: 'CV_Backend_Developer_StartupXYZ.pdf',
      jobUrl: 'https://example.com/job/4',
      notes: 'Adaptado para startup com foco em desenvolvimento ágil'
    },
    {
      id: 5,
      jobTitle: 'DevOps Engineer',
      company: 'CloudTech',
      generatedAt: '2024-01-11T11:00:00Z',
      status: 'downloaded',
      matchScore: 88,
      favorite: false,
      tags: ['AWS', 'Docker', 'Kubernetes'],
      fileName: 'CV_DevOps_Engineer_CloudTech.pdf',
      jobUrl: 'https://example.com/job/5',
      notes: 'Enfoque em infraestrutura como código e CI/CD'
    }
  ]

  useEffect(() => {
    // Load CV history from localStorage or API
    const saved = localStorage.getItem('cvHistory')
    if (saved) {
      setCvHistory(JSON.parse(saved))
    } else {
      setCvHistory(mockCVHistory)
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'downloaded': return 'bg-green-100 text-green-800'
      case 'viewed': return 'bg-blue-100 text-blue-800'
      case 'generated': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'downloaded': return 'Baixado'
      case 'viewed': return 'Visualizado'
      case 'generated': return 'Gerado'
      default: return 'Desconhecido'
    }
  }

  const toggleFavorite = (id) => {
    setCvHistory(prev => 
      prev.map(cv => 
        cv.id === id ? { ...cv, favorite: !cv.favorite } : cv
      )
    )
  }

  const deleteCv = (id) => {
    setCvHistory(prev => prev.filter(cv => cv.id !== id))
  }

  const downloadCv = (cv) => {
    // Simulate download
    console.log('Downloading CV:', cv.fileName)
    setCvHistory(prev => 
      prev.map(item => 
        item.id === cv.id ? { ...item, status: 'downloaded' } : item
      )
    )
  }

  const viewCv = (cv) => {
    // Simulate view
    console.log('Viewing CV:', cv.fileName)
    setCvHistory(prev => 
      prev.map(item => 
        item.id === cv.id ? { ...item, status: 'viewed' } : item
      )
    )
  }

  const shareCv = (cv) => {
    // Simulate share
    navigator.clipboard.writeText(`Currículo para ${cv.jobTitle} na ${cv.company}`)
    console.log('CV link copied to clipboard')
  }

  const filteredAndSortedCVs = cvHistory
    .filter(cv => {
      const matchesSearch = cv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           cv.company.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'favorites' && cv.favorite) ||
                           (filterBy === 'downloaded' && cv.status === 'downloaded') ||
                           (filterBy === 'recent' && new Date(cv.generatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.generatedAt) - new Date(a.generatedAt)
        case 'company':
          return a.company.localeCompare(b.company)
        case 'match':
          return b.matchScore - a.matchScore
        case 'title':
          return a.jobTitle.localeCompare(b.jobTitle)
        default:
          return 0
      }
    })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <History className="h-6 w-6 mr-2 text-blue-600" />
            Histórico de Currículos
          </CardTitle>
          <CardDescription>
            Gerencie todos os currículos que você criou para diferentes vagas
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por cargo ou empresa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-button"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40 glass-button">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="favorites">Favoritos</SelectItem>
                  <SelectItem value="downloaded">Baixados</SelectItem>
                  <SelectItem value="recent">Recentes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 glass-button">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Data</SelectItem>
                  <SelectItem value="company">Empresa</SelectItem>
                  <SelectItem value="match">Compatibilidade</SelectItem>
                  <SelectItem value="title">Cargo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CV List */}
      <div className="space-y-4">
        {filteredAndSortedCVs.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <History className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery || filterBy !== 'all' ? 'Nenhum resultado encontrado' : 'Nenhum currículo gerado ainda'}
              </h3>
              <p className="text-gray-500">
                {searchQuery || filterBy !== 'all' 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece gerando seu primeiro currículo personalizado'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedCVs.map((cv) => (
            <Card key={cv.id} className="glass-card hover:shadow-lg transition-all duration-200">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          {cv.jobTitle}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(cv.id)}
                            className="ml-2 p-1 h-auto"
                          >
                            {cv.favorite ? (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            ) : (
                              <StarOff className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </h3>
                        <p className="text-blue-600 font-medium flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {cv.company}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => viewCv(cv)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => downloadCv(cv)}>
                            <Download className="h-4 w-4 mr-2" />
                            Baixar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareCv(cv)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Compartilhar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteCv(cv.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(cv.generatedAt)}
                      </span>
                      <Badge className={`${getStatusColor(cv.status)} border-0`}>
                        {getStatusText(cv.status)}
                      </Badge>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-blue-600">
                          {cv.matchScore}% compatível
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cv.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="glass-badge text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {cv.notes && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {cv.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <Button
                      onClick={() => downloadCv(cv)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => viewCv(cv)}
                      className="glass-button"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Statistics */}
      {cvHistory.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{cvHistory.length}</div>
                <div className="text-sm text-gray-500">Total de CVs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {cvHistory.filter(cv => cv.status === 'downloaded').length}
                </div>
                <div className="text-sm text-gray-500">Baixados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {cvHistory.filter(cv => cv.favorite).length}
                </div>
                <div className="text-sm text-gray-500">Favoritos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(cvHistory.reduce((acc, cv) => acc + cv.matchScore, 0) / cvHistory.length)}%
                </div>
                <div className="text-sm text-gray-500">Compatibilidade Média</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

