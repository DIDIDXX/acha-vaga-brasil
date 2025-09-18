# JobSeeker AI - Backend Documentation

## Visão Geral

O **JobSeeker AI Backend** é uma API REST desenvolvida em Flask que fornece funcionalidades de busca de vagas de emprego e integração com inteligência artificial. O backend serve como ponte entre o frontend React e os diversos job boards, oferecendo endpoints para busca de vagas e geração de currículos personalizados.

## Características Principais

### 🔍 Busca de Vagas
- API REST para busca de vagas em múltiplos job boards
- Suporte a filtros avançados (localização, tipo de trabalho, data)
- Web scraping de sites como Greenhouse, Lever e outros
- Agregação de resultados de múltiplas fontes

### 🤖 Integração com IA
- Preparado para integração com OpenRouter API
- Endpoints para geração de currículos personalizados
- Otimização para sistemas ATS
- Extração de palavras-chave das descrições de vagas

### 🌐 API RESTful
- Endpoints bem estruturados e documentados
- Suporte a CORS para integração com frontend
- Tratamento de erros robusto
- Respostas em formato JSON

### 📊 Agregação de Dados
- Coleta de vagas de múltiplas fontes
- Normalização de dados de diferentes job boards
- Sistema de pontuação de compatibilidade
- Cache de resultados para melhor performance

## Tecnologias Utilizadas

### Backend Framework
- **Flask 3.1.1** - Framework web principal
- **Flask-CORS 6.0.0** - Suporte a Cross-Origin Resource Sharing
- **SQLAlchemy** - ORM para banco de dados
- **SQLite** - Banco de dados local

### Web Scraping
- **Requests 2.32.5** - Cliente HTTP para requisições
- **BeautifulSoup4 4.13.5** - Parser HTML para web scraping
- **urllib3 2.5.0** - Biblioteca HTTP de baixo nível

### Outras Dependências
- **Werkzeug 3.1.3** - Utilitários WSGI
- **Jinja2 3.1.6** - Engine de templates
- **Click 8.2.1** - Interface de linha de comando

## Estrutura do Projeto

```
job-search-ai-backend/
├── src/
│   ├── models/                    # Modelos de banco de dados
│   │   └── user.py               # Modelo de usuário
│   ├── routes/                   # Rotas da API
│   │   ├── user.py              # Rotas de usuário
│   │   └── jobs.py              # Rotas de busca de vagas
│   ├── services/                # Serviços de negócio
│   │   └── job_service.py       # Serviço de integração de vagas
│   ├── static/                  # Arquivos estáticos (frontend build)
│   ├── database/                # Banco de dados SQLite
│   │   └── app.db              # Arquivo do banco
│   ├── scraper.py              # Lógica de web scraping
│   └── main.py                 # Ponto de entrada da aplicação
├── venv/                       # Ambiente virtual Python
├── requirements.txt            # Dependências do projeto
└── README.md                   # Documentação do projeto
```

## Endpoints da API

### Busca de Vagas

#### `GET /api/jobs/search`

Busca vagas de emprego com base nos parâmetros fornecidos.

**Parâmetros de Query:**
- `query` (string, obrigatório): Termo de busca (ex: "Data Engineer")
- `remote_only` (boolean, opcional): Filtrar apenas vagas remotas (default: false)
- `after_date` (string, opcional): Data mínima de publicação no formato YYYY-MM-DD

**Exemplo de Requisição:**
```
GET /api/jobs/search?query=Data%20Engineer&remote_only=false&after_date=2025-01-01
```

**Exemplo de Resposta:**
```json
[
  {
    "title": "Data Engineer",
    "company": "TechCorp",
    "location": "Remote",
    "url": "https://example.com/job/data-engineer-techcorp",
    "description": "Procuramos um Data Engineer experiente...",
    "tags": ["Python", "SQL", "AWS", "Apache Spark"],
    "matchScore": 85
  }
]
```

### Usuários

#### `GET /api/users`
Lista todos os usuários (endpoint de exemplo do template)

#### `POST /api/users`
Cria um novo usuário (endpoint de exemplo do template)

## Funcionalidades de Web Scraping

### Sites Suportados

O sistema foi projetado para fazer scraping dos seguintes tipos de job boards:

1. **Greenhouse** (`boards.greenhouse.io`)
   - Estrutura HTML padrão para listagem de vagas
   - Extração de título, localização e link da vaga

2. **Lever** (`jobs.lever.co`)
   - Estrutura HTML específica do Lever
   - Extração de informações básicas da vaga

3. **Outros Job Boards**
   - Workable (`apply.workable.com`)
   - iCIMS (`careers.icims.com`)
   - Recruitee (`jobs.recruitee.com`)
   - E muitos outros conforme a query original

### Lógica de Scraping

```python
def search_jobs(query, remote_only=False, after_date=None):
    """
    Busca vagas em múltiplos job boards
    
    Args:
        query (str): Termo de busca
        remote_only (bool): Filtrar apenas vagas remotas
        after_date (str): Data mínima no formato YYYY-MM-DD
    
    Returns:
        list: Lista de vagas encontradas
    """
```

### Tratamento de Dados

- **Limpeza de Texto**: Remoção de espaços extras e caracteres especiais
- **Normalização**: Padronização de formatos de data e localização
- **Filtragem**: Aplicação de filtros de busca e localização
- **Agregação**: Combinação de resultados de múltiplas fontes

## Configuração e Execução

### Pré-requisitos

- Python 3.11+
- pip (gerenciador de pacotes Python)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/DIDIDXX/acha-vaga-brasil.git
   cd acha-vaga-brasil/job-search-ai-backend
   ```

2. **Ative o ambiente virtual:**
   ```bash
   source venv/bin/activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

### Execução

#### Desenvolvimento
```bash
python src/main.py
```

A aplicação estará disponível em `http://localhost:5000`

#### Produção
Para produção, recomenda-se usar um servidor WSGI como Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
```

## Integração com Frontend

### CORS Configuration

O backend está configurado com Flask-CORS para permitir requisições do frontend:

```python
from flask_cors import CORS
CORS(app)  # Permite requisições de qualquer origem
```

### Servindo Arquivos Estáticos

O Flask está configurado para servir os arquivos do frontend React buildado:

```python
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # Serve arquivos estáticos do frontend ou index.html
```

### Estrutura de Resposta

Todas as respostas da API seguem um formato JSON consistente:

- **Sucesso**: Array de objetos ou objeto único
- **Erro**: `{"error": "Mensagem de erro"}`
- **Status Codes**: 200 (sucesso), 400 (bad request), 500 (erro interno)

## Banco de Dados

### SQLite Configuration

```python
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

### Modelos Disponíveis

- **User**: Modelo de usuário (exemplo do template)
- Preparado para expansão com modelos de Job, CV, etc.

## Tratamento de Erros

### Web Scraping Errors

```python
try:
    response = requests.get(url)
    response.raise_for_status()
    # Processar resposta
except requests.exceptions.RequestException as e:
    print(f"Error scraping {url}: {e}")
    return []
```

### API Errors

```python
try:
    jobs = search_jobs(query, remote_only, after_date)
    return jsonify(jobs)
except Exception as e:
    return jsonify({"error": str(e)}), 500
```

## Performance e Otimização

### Caching
- Implementar cache Redis para resultados de busca
- Cache de sessão para dados de usuário
- TTL configurável para diferentes tipos de dados

### Rate Limiting
- Implementar rate limiting para evitar sobrecarga
- Throttling de requisições de web scraping
- Monitoramento de uso da API

### Async Processing
- Considerar implementação de processamento assíncrono
- Queue system para jobs de scraping pesados
- Background tasks para atualizações de dados

## Segurança

### Validação de Entrada
- Sanitização de parâmetros de query
- Validação de formatos de data
- Escape de caracteres especiais

### CORS Policy
- Configuração adequada para produção
- Whitelist de domínios permitidos
- Headers de segurança

### Rate Limiting
- Proteção contra ataques DDoS
- Limites por IP e por usuário
- Monitoramento de padrões suspeitos

## Monitoramento e Logs

### Logging
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

### Métricas
- Tempo de resposta da API
- Taxa de sucesso do web scraping
- Número de vagas encontradas por busca
- Erros e exceções

## Próximos Passos

### Melhorias Planejadas

1. **Expansão de Job Boards**
   - Integração com LinkedIn API
   - Suporte a Indeed, Glassdoor
   - APIs oficiais quando disponíveis

2. **IA e Machine Learning**
   - Implementação completa da geração de CV
   - Sistema de recomendação de vagas
   - Análise de compatibilidade avançada

3. **Performance**
   - Implementação de cache Redis
   - Processamento assíncrono
   - Otimização de queries de banco

4. **Funcionalidades Avançadas**
   - Sistema de alertas de vagas
   - Histórico de candidaturas
   - Analytics e relatórios

### Deployment

- Containerização com Docker
- Deploy em cloud (AWS, GCP, Azure)
- CI/CD pipeline
- Monitoramento em produção

## Conclusão

O backend do JobSeeker AI fornece uma base sólida para a aplicação de busca de vagas com IA. Com uma arquitetura modular e extensível, está preparado para crescer e incorporar novas funcionalidades conforme a demanda.

A integração com o frontend React está funcionando perfeitamente, e o sistema de web scraping oferece uma alternativa viável para agregação de vagas de múltiplas fontes até que APIs oficiais estejam disponíveis.

