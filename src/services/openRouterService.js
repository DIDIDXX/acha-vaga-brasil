// OpenRouter API Service for CV Generation
const OPENROUTER_API_KEY = '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'
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL_NAME = 'deepseek/deepseek-chat-v3.1:free'

class OpenRouterService {
  constructor() {
    this.apiKey = OPENROUTER_API_KEY
    this.apiUrl = OPENROUTER_API_URL
    this.model = MODEL_NAME
  }

  async generateCV(jobData, userProfile) {
    try {
      const prompt = this.buildCVPrompt(jobData, userProfile)
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'JobSeeker AI - CV Generator'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `Você é um especialista em criação de currículos e otimização para sistemas ATS (Applicant Tracking Systems). 
              Sua tarefa é criar currículos personalizados e otimizados para vagas específicas, garantindo que:
              1. O currículo seja otimizado para ATS
              2. Use palavras-chave relevantes da descrição da vaga
              3. Destaque experiências e habilidades mais relevantes
              4. Mantenha um formato profissional e limpo
              5. Seja conciso mas completo
              
              Retorne o currículo em formato JSON com as seguintes seções:
              - personalInfo (informações pessoais)
              - summary (resumo profissional personalizado)
              - experience (experiências relevantes)
              - skills (habilidades técnicas)
              - education (formação)
              - keywords (palavras-chave extraídas da vaga)`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API')
      }

      const cvContent = data.choices[0].message.content
      
      // Try to parse JSON response
      try {
        const cvData = JSON.parse(cvContent)
        return {
          success: true,
          data: cvData,
          rawContent: cvContent
        }
      } catch (parseError) {
        // If JSON parsing fails, return raw content
        return {
          success: true,
          data: null,
          rawContent: cvContent
        }
      }

    } catch (error) {
      console.error('Error generating CV:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  }

  buildCVPrompt(jobData, userProfile) {
    return `
DADOS DA VAGA:
Título: ${jobData.title}
Empresa: ${jobData.company}
Localização: ${jobData.location}
Tipo: ${jobData.type}
Descrição: ${jobData.description}
Requisitos: ${jobData.requirements ? jobData.requirements.join(', ') : 'Não especificado'}
Tecnologias: ${jobData.tags ? jobData.tags.join(', ') : 'Não especificado'}

PERFIL DO USUÁRIO:
Nome: ${userProfile?.personalInfo?.fullName || 'Não informado'}
Email: ${userProfile?.personalInfo?.email || 'Não informado'}
Telefone: ${userProfile?.personalInfo?.phone || 'Não informado'}
Localização: ${userProfile?.personalInfo?.location || 'Não informado'}
LinkedIn: ${userProfile?.personalInfo?.linkedin || 'Não informado'}
Website: ${userProfile?.personalInfo?.website || 'Não informado'}

Resumo Atual: ${userProfile?.personalInfo?.summary || 'Não informado'}

Experiências:
${userProfile?.experience?.map(exp => `
- ${exp.position} na ${exp.company} (${exp.startDate} - ${exp.endDate || 'Atual'})
  ${exp.description}
`).join('\n') || 'Nenhuma experiência informada'}

Educação:
${userProfile?.education?.map(edu => `
- ${edu.degree} em ${edu.field} - ${edu.institution} (${edu.endDate})
`).join('\n') || 'Nenhuma formação informada'}

Habilidades: ${userProfile?.skills?.join(', ') || 'Nenhuma habilidade informada'}

INSTRUÇÕES:
1. Analise a descrição da vaga e extraia as palavras-chave mais importantes
2. Personalize o resumo profissional para destacar experiências relevantes para esta vaga específica
3. Reorganize e destaque as experiências mais relevantes para a posição
4. Inclua as habilidades técnicas que mais se alinham com os requisitos
5. Otimize o conteúdo para sistemas ATS usando as palavras-chave da vaga
6. Mantenha um tom profissional e objetivo
7. Se alguma informação do perfil estiver faltando, use dados genéricos mas relevantes para a área

Retorne um JSON válido com a estrutura solicitada.
`
  }

  async extractJobKeywords(jobDescription) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'JobSeeker AI - Keyword Extractor'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'Você é um especialista em análise de vagas de emprego. Extraia as palavras-chave mais importantes de uma descrição de vaga, incluindo habilidades técnicas, ferramentas, tecnologias e requisitos. Retorne apenas uma lista de palavras-chave separadas por vírgula.'
            },
            {
              role: 'user',
              content: `Extraia as palavras-chave mais importantes desta descrição de vaga:\n\n${jobDescription}`
            }
          ],
          temperature: 0.3,
          max_tokens: 200
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      const keywords = data.choices[0].message.content
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)

      return {
        success: true,
        keywords
      }
    } catch (error) {
      console.error('Error extracting keywords:', error)
      return {
        success: false,
        error: error.message,
        keywords: []
      }
    }
  }

  async optimizeForATS(cvContent, jobDescription) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'JobSeeker AI - ATS Optimizer'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'Você é um especialista em otimização de currículos para sistemas ATS. Analise um currículo e uma descrição de vaga, e forneça sugestões específicas para melhorar a compatibilidade com ATS, incluindo palavras-chave que devem ser adicionadas e formatação recomendada.'
            },
            {
              role: 'user',
              content: `CURRÍCULO:\n${cvContent}\n\nDESCRIÇÃO DA VAGA:\n${jobDescription}\n\nForneça sugestões de otimização para ATS:`
            }
          ],
          temperature: 0.5,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        suggestions: data.choices[0].message.content
      }
    } catch (error) {
      console.error('Error optimizing for ATS:', error)
      return {
        success: false,
        error: error.message,
        suggestions: ''
      }
    }
  }

  async generateCoverLetter(jobData, userProfile) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'JobSeeker AI - Cover Letter Generator'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'Você é um especialista em criação de cartas de apresentação profissionais. Crie uma carta personalizada e convincente que destaque a adequação do candidato à vaga específica.'
            },
            {
              role: 'user',
              content: `Crie uma carta de apresentação para:
              
VAGA: ${jobData.title} na ${jobData.company}
DESCRIÇÃO: ${jobData.description}

CANDIDATO: ${userProfile?.personalInfo?.fullName || 'Candidato'}
RESUMO: ${userProfile?.personalInfo?.summary || 'Profissional experiente'}

A carta deve ser profissional, concisa (máximo 3 parágrafos) e destacar por que o candidato é ideal para esta vaga específica.`
            }
          ],
          temperature: 0.7,
          max_tokens: 600
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        coverLetter: data.choices[0].message.content
      }
    } catch (error) {
      console.error('Error generating cover letter:', error)
      return {
        success: false,
        error: error.message,
        coverLetter: ''
      }
    }
  }
}

export default new OpenRouterService()

