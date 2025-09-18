import { useState } from 'react'
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  ExternalLink, 
  Download, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  Bookmark,
  BookmarkCheck,
  FileText,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import openRouterService from '../services/openRouterService.js'

export function JobCard({ job, onGenerateCV, onSaveJob }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStatus, setGenerationStatus] = useState('')
  const [cvGenerated, setCvGenerated] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleGenerateCV = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationStatus('Carregando perfil do usuário...')
    
    try {
      // Get user profile from localStorage
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
      
      // Step 1: Load user profile
      setGenerationProgress(20)
      setGenerationStatus('Analisando descrição da vaga...')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Step 2: Extract keywords
      setGenerationProgress(40)
      setGenerationStatus('Extraindo palavras-chave...')
      const keywordResult = await openRouterService.extractJobKeywords(job.description)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Step 3: Generate CV
      setGenerationProgress(60)
      setGenerationStatus('Gerando currículo personalizado com IA...')
      const cvResult = await openRouterService.generateCV(job, userProfile)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Step 4: Optimize for ATS
      setGenerationProgress(80)
      setGenerationStatus('Otimizando para sistemas ATS...')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Step 5: Complete
      setGenerationProgress(100)
      
      if (cvResult.success) {
        setGenerationStatus('Currículo gerado com sucesso!')
        setCvGenerated(true)
        
        // Save to history
        const cvHistoryItem = {
          id: Date.now(),
          jobTitle: job.title,
          company: job.company,
          generatedAt: new Date().toISOString(),
          status: 'generated',
          matchScore: job.matchScore || 85,
          favorite: false,
          tags: job.tags || [],
          fileName: `CV_${job.title.replace(/\s+/g, '_')}_${job.company.replace(/\s+/g, '_')}.pdf`,
          jobUrl: job.url || '#',
          notes: `Currículo gerado automaticamente com IA para a vaga de ${job.title}`,
          cvData: cvResult.data,
          rawContent: cvResult.rawContent,
          keywords: keywordResult.keywords || []
        }
        
        // Save to localStorage
        const existingHistory = JSON.parse(localStorage.getItem('cvHistory') || '[]')
        existingHistory.unshift(cvHistoryItem)
        localStorage.setItem('cvHistory', JSON.stringify(existingHistory))
        
        // Call parent callback
        if (onGenerateCV) {
          onGenerateCV(job, cvHistoryItem)
        }
      } else {
        throw new Error(cvResult.error || 'Erro ao gerar currículo')
      }
      
    } catch (error) {
      console.error('Error generating CV:', error)
      setGenerationStatus('Erro ao gerar currículo. Tente novamente.')
      setGenerationProgress(0)
      
      // Show error for a few seconds then reset
      setTimeout(() => {
        setIsGenerating(false)
        setGenerationStatus('')
        setGenerationProgress(0)
      }, 3000)
      return
    }
    
    setIsGenerating(false)
  }

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
    if (onSaveJob) {
      onSaveJob(job, !isSaved)
    }
  }

  const handleDownloadCV = () => {
    // Simulate CV download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `CV_${job.title.replace(/\s+/g, '_')}_${job.company.replace(/\s+/g, '_')}.pdf`
    link.click()
  }

  return (
    <Card className="glass-card hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveJob}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-blue-600" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <CardDescription className="text-lg font-medium text-blue-600">
              {job.company}
            </CardDescription>
            
            <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {job.posted}
              </span>
              <Badge variant="outline" className="glass-badge">
                <Briefcase className="h-3 w-3 mr-1" />
                {job.type}
              </Badge>
              {job.salary && (
                <Badge variant="secondary" className="glass-badge">
                  {job.salary}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 ml-4">
            {!cvGenerated ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      'Gerar CV'
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-0">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                      Gerar Currículo com IA
                    </DialogTitle>
                    <DialogDescription>
                      Vamos criar um currículo otimizado para a vaga de {job.title} na {job.company} usando inteligência artificial
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    {!isGenerating && !cvGenerated && (
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                            <Sparkles className="h-4 w-4 mr-2" />
                            O que nossa IA fará:
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Analisar os requisitos da vaga com DeepSeek AI</li>
                            <li>• Extrair palavras-chave importantes automaticamente</li>
                            <li>• Personalizar seu currículo para esta vaga específica</li>
                            <li>• Otimizar para sistemas ATS (Applicant Tracking Systems)</li>
                            <li>• Destacar suas experiências mais relevantes</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            <strong>Dica:</strong> Complete seu perfil para obter currículos mais personalizados e precisos.
                          </p>
                        </div>
                        
                        <Button 
                          onClick={handleGenerateCV}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Gerar com IA
                        </Button>
                      </div>
                    )}
                    
                    {isGenerating && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                          <span className="text-sm font-medium">{generationStatus}</span>
                        </div>
                        <Progress value={generationProgress} className="w-full" />
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>• Usando modelo DeepSeek Chat v3.1 via OpenRouter</p>
                          <p>• Processamento pode levar 10-30 segundos...</p>
                        </div>
                      </div>
                    )}
                    
                    {cvGenerated && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Currículo gerado com sucesso!</span>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700 mb-3">
                            Seu currículo foi personalizado com IA usando o modelo DeepSeek. 
                            Ele inclui as palavras-chave mais relevantes e está otimizado para 
                            sistemas de rastreamento de candidatos (ATS).
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-green-600">
                            <Sparkles className="h-3 w-3" />
                            <span>Powered by DeepSeek AI via OpenRouter</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={handleDownloadCV}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Baixar PDF
                          </Button>
                          <Button variant="outline" className="glass-button">
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleDownloadCV}
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Baixar CV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="glass-button"
                  onClick={() => setCvGenerated(false)}
                >
                  Gerar Novo
                </Button>
              </div>
            )}
            
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="glass-button">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-0 max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl">{job.title}</DialogTitle>
                  <DialogDescription className="text-lg font-medium text-blue-600">
                    {job.company}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </span>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Descrição da Vaga</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  
                  {job.requirements && (
                    <div>
                      <h4 className="font-medium mb-2">Requisitos</h4>
                      <ul className="text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Tecnologias</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="glass-badge">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={() => window.open(job.url || '#', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Vaga Original
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSaveJob}
                      className="glass-button"
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck className="h-4 w-4 mr-2" />
                          Salva
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4 mr-2" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {job.tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="secondary" className="glass-badge">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 4 && (
            <Badge variant="secondary" className="glass-badge">
              +{job.tags.length - 4} mais
            </Badge>
          )}
        </div>
        
        {job.matchScore && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                Compatibilidade com seu perfil
              </span>
              <span className="text-sm font-bold text-blue-600">
                {job.matchScore}%
              </span>
            </div>
            <Progress value={job.matchScore} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

