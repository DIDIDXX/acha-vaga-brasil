import { useState } from 'react'
import { 
  Filter, 
  MapPin, 
  Clock, 
  Briefcase, 
  DollarSign, 
  Calendar,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'

export function SearchFilters({ isOpen, onToggle, filters, onFiltersChange }) {
  const [localFilters, setLocalFilters] = useState(filters)

  const experienceLevels = [
    'Estagiário',
    'Júnior',
    'Pleno',
    'Sênior',
    'Especialista',
    'Gerente',
    'Diretor'
  ]

  const workModes = [
    'Remoto',
    'Híbrido',
    'Presencial'
  ]

  const contractTypes = [
    'CLT',
    'PJ',
    'Freelancer',
    'Temporário'
  ]

  const locations = [
    'Brasil',
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
    'Porto Alegre, RS',
    'Curitiba, PR',
    'Recife, PE',
    'Salvador, BA',
    'Brasília, DF',
    'Fortaleza, CE',
    'Latam',
    'Europa',
    'América do Norte',
    'Work from anywhere'
  ]

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = localFilters[key] || []
    let newArray
    
    if (checked) {
      newArray = [...currentArray, value]
    } else {
      newArray = currentArray.filter(item => item !== value)
    }
    
    handleFilterChange(key, newArray)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      experienceLevels: [],
      workModes: [],
      contractTypes: [],
      locations: [],
      technologies: '',
      excludeTerms: '',
      dateRange: '',
      salaryRange: ''
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (localFilters.experienceLevels?.length > 0) count++
    if (localFilters.workModes?.length > 0) count++
    if (localFilters.contractTypes?.length > 0) count++
    if (localFilters.locations?.length > 0) count++
    if (localFilters.technologies?.trim()) count++
    if (localFilters.excludeTerms?.trim()) count++
    if (localFilters.dateRange) count++
    if (localFilters.salaryRange) count++
    return count
  }

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        onClick={onToggle}
        className="glass-button relative"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filtros avançados
        {getActiveFiltersCount() > 0 && (
          <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-blue-600 text-white text-xs">
            {getActiveFiltersCount()}
          </Badge>
        )}
      </Button>
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros Avançados
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Limpar tudo
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggle}
              className="glass-button"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Nível de Experiência
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {experienceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`exp-${level}`}
                  checked={localFilters.experienceLevels?.includes(level) || false}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('experienceLevels', level, checked)
                  }
                />
                <Label 
                  htmlFor={`exp-${level}`} 
                  className="text-sm cursor-pointer"
                >
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Work Mode */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Modalidade de Trabalho
          </Label>
          <div className="flex flex-wrap gap-2">
            {workModes.map((mode) => (
              <div key={mode} className="flex items-center space-x-2">
                <Checkbox
                  id={`work-${mode}`}
                  checked={localFilters.workModes?.includes(mode) || false}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('workModes', mode, checked)
                  }
                />
                <Label 
                  htmlFor={`work-${mode}`} 
                  className="text-sm cursor-pointer"
                >
                  {mode}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Localização
          </Label>
          <Select 
            value={localFilters.locations?.[0] || ''} 
            onValueChange={(value) => handleFilterChange('locations', value ? [value] : [])}
          >
            <SelectTrigger className="glass-button">
              <SelectValue placeholder="Selecione uma localização" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contract Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Tipo de Contrato
          </Label>
          <div className="flex flex-wrap gap-2">
            {contractTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`contract-${type}`}
                  checked={localFilters.contractTypes?.includes(type) || false}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('contractTypes', type, checked)
                  }
                />
                <Label 
                  htmlFor={`contract-${type}`} 
                  className="text-sm cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies/Skills */}
        <div className="space-y-3">
          <Label htmlFor="technologies" className="text-sm font-medium">
            Tecnologias/Habilidades
          </Label>
          <Input
            id="technologies"
            placeholder="Ex: Python, SQL, AWS, Machine Learning (separados por vírgula)"
            value={localFilters.technologies || ''}
            onChange={(e) => handleFilterChange('technologies', e.target.value)}
            className="glass-button"
          />
          <p className="text-xs text-gray-500">
            Digite as tecnologias separadas por vírgula
          </p>
        </div>

        {/* Exclude Terms */}
        <div className="space-y-3">
          <Label htmlFor="excludeTerms" className="text-sm font-medium">
            Excluir Termos
          </Label>
          <Input
            id="excludeTerms"
            placeholder="Ex: US Only jobs, Apenas EUA (separados por vírgula)"
            value={localFilters.excludeTerms || ''}
            onChange={(e) => handleFilterChange('excludeTerms', e.target.value)}
            className="glass-button"
          />
          <p className="text-xs text-gray-500">
            Termos que devem ser excluídos da busca
          </p>
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Data de Publicação
          </Label>
          <Select 
            value={localFilters.dateRange || ''} 
            onValueChange={(value) => handleFilterChange('dateRange', value)}
          >
            <SelectTrigger className="glass-button">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="3days">Últimos 3 dias</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="2weeks">Últimas 2 semanas</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Faixa Salarial
          </Label>
          <Select 
            value={localFilters.salaryRange || ''} 
            onValueChange={(value) => handleFilterChange('salaryRange', value)}
          >
            <SelectTrigger className="glass-button">
              <SelectValue placeholder="Selecione a faixa salarial" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-3000">Até R$ 3.000</SelectItem>
              <SelectItem value="3000-5000">R$ 3.000 - R$ 5.000</SelectItem>
              <SelectItem value="5000-8000">R$ 5.000 - R$ 8.000</SelectItem>
              <SelectItem value="8000-12000">R$ 8.000 - R$ 12.000</SelectItem>
              <SelectItem value="12000-20000">R$ 12.000 - R$ 20.000</SelectItem>
              <SelectItem value="20000+">Acima de R$ 20.000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <div className="pt-4 border-t border-white/20">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">
                Filtros Ativos ({getActiveFiltersCount()})
              </Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {localFilters.experienceLevels?.map((level) => (
                <Badge key={level} variant="secondary" className="glass-badge">
                  {level}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleArrayFilterChange('experienceLevels', level, false)}
                  />
                </Badge>
              ))}
              {localFilters.workModes?.map((mode) => (
                <Badge key={mode} variant="secondary" className="glass-badge">
                  {mode}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleArrayFilterChange('workModes', mode, false)}
                  />
                </Badge>
              ))}
              {localFilters.locations?.map((location) => (
                <Badge key={location} variant="secondary" className="glass-badge">
                  {location}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('locations', [])}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

