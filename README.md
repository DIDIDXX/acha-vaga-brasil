# JobSeeker AI - Frontend

![JobSeeker AI Screenshot](https://raw.githubusercontent.com/DIDIDXX/acha-vaga-brasil/master/screenshot.png)

## 🚀 Visão Geral

Bem-vindo ao frontend do **JobSeeker AI**! Esta é uma aplicação web moderna e inteligente projetada para revolucionar a busca de vagas de emprego e a preparação de currículos. Desenvolvido com React e um design inspirado no elegante "Liquid Glass" da Apple, o JobSeeker AI oferece uma experiência de usuário intuitiva e visualmente atraente.

Nossa missão é simplificar o processo de candidatura a empregos, permitindo que você encontre vagas relevantes e gere currículos personalizados e otimizados para ATS (Applicant Tracking Systems) com o clique de um botão, tudo isso impulsionado por inteligência artificial.

## ✨ Características Principais

-   **🤖 Geração de CV com IA:**
    -   Integração robusta com a OpenRouter API, utilizando o poderoso modelo DeepSeek Chat v3.1 para inteligência artificial.
    -   Geração automática de currículos altamente personalizados para cada vaga específica.
    -   Otimização inteligente para sistemas ATS, aumentando suas chances de ser notado.
    -   Extração precisa de palavras-chave relevantes das descrições de vagas.

-   **🎨 Design "Liquid Glass":**
    -   Interface de usuário moderna e sofisticada, inspirada no conceito "Liquid Glass" da Apple.
    -   Efeitos visuais de vidro translúcido e blur que criam uma sensação de profundidade e elegância.
    -   Gradientes suaves e transições fluidas para uma navegação agradável.
    -   Design totalmente responsivo, garantindo uma experiência impecável em qualquer dispositivo (desktop, tablet, mobile).

-   **🔍 Busca de Vagas Avançada:**
    -   Filtros flexíveis por localização, tipo de trabalho (remoto, híbrido, presencial), faixa salarial e nível de experiência.
    -   Capacidade de busca por palavras-chave para refinar os resultados.
    -   Opções de filtragem por data de publicação da vaga.

-   **👤 Perfil do Usuário Completo:**
    -   Gerenciamento intuitivo de todas as suas informações pessoais e profissionais.
    -   Seções dedicadas para histórico de experiências, formação acadêmica e habilidades técnicas.
    -   Funcionalidades de exportação e importação de dados do perfil para facilitar a gestão.

-   **📋 Histórico de Currículos:**
    -   Um painel centralizado para visualizar e gerenciar todos os currículos gerados.
    -   Opções para marcar currículos como favoritos e adicionar tags para organização.
    -   Estatísticas de compatibilidade para cada CV gerado.
    -   Funcionalidades de download e compartilhamento rápido.

## 🛠️ Tecnologias Utilizadas

### Frontend
-   **React 18:** Biblioteca JavaScript para construção de interfaces de usuário.
-   **Vite:** Ferramenta de build rápida para desenvolvimento frontend.
-   **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
-   **Shadcn/UI:** Coleção de componentes de UI reutilizáveis e acessíveis.
-   **Lucide React:** Biblioteca de ícones moderna e personalizável.

### Integrações
-   **OpenRouter API:** Plataforma para acesso a diversos modelos de IA.
-   **DeepSeek Chat v3.1:** Modelo de linguagem utilizado para a geração de CVs.
-   **LocalStorage:** Armazenamento de dados local no navegador para persistência de perfil e histórico.

## 📂 Estrutura do Projeto

```
job-search-ai-frontend/
├── public/                   # Arquivos estáticos
├── src/
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── SearchFilters.jsx # Componente para filtros de busca
│   │   ├── JobCard.jsx       # Componente para exibir uma vaga e gerar CV
│   │   ├── UserProfile.jsx   # Componente para gerenciar o perfil do usuário
│   │   └── CVHistory.jsx     # Componente para o histórico de currículos
│   ├── services/             # Serviços de integração (ex: OpenRouter API)
│   │   └── openRouterService.js
│   ├── App.jsx               # Componente principal da aplicação
│   ├── App.css               # Estilos globais e do Liquid Glass
│   └── main.jsx              # Ponto de entrada da aplicação
├── .gitignore                # Arquivos e diretórios a serem ignorados pelo Git
├── index.html                # Arquivo HTML principal
├── package.json              # Dependências e scripts do projeto
├── postcss.config.js         # Configuração do PostCSS
├── tailwind.config.js        # Configuração do Tailwind CSS
└── vite.config.js            # Configuração do Vite
```

## ⚙️ Configuração da API (OpenRouter)

Para que a funcionalidade de geração de CV com IA funcione, você precisará de uma chave de API do OpenRouter. Esta chave é configurada no arquivo `src/services/openRouterService.js`.

```javascript
const OPENROUTER_API_KEY = 'YOUR_OPENROUTER_API_KEY_HERE'; // Substitua pela sua chave
const MODEL_NAME = 'deepseek/deepseek-chat-v3.1:free';
```

**Importante:** Substitua `'YOUR_OPENROUTER_API_KEY_HERE'` pela sua chave real do OpenRouter. Recomenda-se usar variáveis de ambiente para chaves de API em produção.

## ▶️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js) ou [pnpm](https://pnpm.io/) (gerenciador de pacotes alternativo)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/DIDIDXX/acha-vaga-brasil.git
    cd acha-vaga-brasil/job-search-ai-frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    pnpm install
    ```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento e visualizar a aplicação em seu navegador:

```bash
npm run dev --host
# ou
pnpm run dev --host
```

A aplicação estará disponível em `http://localhost:5173/` (ou outra porta disponível).

### Build para Produção

Para gerar uma versão otimizada da aplicação para deploy em produção:

```bash
npm run build
# ou
pnpm run build
```

Os arquivos de build serão gerados na pasta `dist/`.

## 🛣️ Próximos Passos (Backend e Melhorias)

Este repositório contém apenas o frontend. Os próximos passos para uma aplicação completa incluem:

-   **Integração com Backend:**
    -   Implementar a busca real de vagas utilizando a query fornecida no prompt original.
    -   Integração com APIs de job boards (ex: LinkedIn, Indeed, Glassdoor).
    -   Desenvolvimento de um sistema de autenticação de usuários.
    -   Criação de um banco de dados para persistência de dados de usuários, vagas salvas e histórico de CVs.

-   **Melhorias de UX/UI:**
    -   Implementação de modo escuro/claro.
    -   Notificações push para novas vagas ou atualizações.
    -   Funcionalidades de compartilhamento social.
    -   Sistema de feedback de usuário.

-   **Funcionalidades Avançadas de IA:**
    -   Análise de compatibilidade de perfil com vagas em tempo real.
    -   Sugestões proativas para melhoria do perfil e do currículo.
    -   Alertas personalizados para novas vagas que correspondam aos critérios do usuário.
    -   Integração mais profunda com plataformas como LinkedIn para importação de dados.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para bugs ou sugestões, e enviar pull requests com melhorias.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---




## 🛠️ Backend - JobSeeker AI

O backend do JobSeeker AI é uma API RESTful desenvolvida em Flask, projetada para ser o cérebro por trás da aplicação. Ele é responsável por realizar a busca de vagas em múltiplos job boards, processar os dados e fornecer os resultados para o frontend de forma estruturada.

### ✨ Características Principais

-   **🔍 Busca de Vagas:**
    -   API REST para busca de vagas em múltiplos job boards.
    -   Suporte a filtros avançados (localização, tipo de trabalho, data).
    -   Web scraping de sites como Greenhouse, Lever e outros.
    -   Agregação de resultados de múltiplas fontes.

-   **🌐 API RESTful:**
    -   Endpoints bem estruturados e documentados.
    -   Suporte a CORS para integração com frontend.
    -   Tratamento de erros robusto.
    -   Respostas em formato JSON.

### 🛠️ Tecnologias Utilizadas

-   **Flask 3.1.1:** Framework web principal.
-   **Flask-CORS 6.0.0:** Suporte a Cross-Origin Resource Sharing.
-   **Requests 2.32.5:** Cliente HTTP para requisições.
-   **BeautifulSoup4 4.13.5:** Parser HTML para web scraping.

### 📂 Estrutura do Projeto

```
backend/
├── src/
│   ├── models/                    # Modelos de banco de dados (ex: user.py)
│   ├── routes/                   # Rotas da API (ex: user.py, jobs.py)
│   ├── scraper.py              # Lógica de web scraping
│   └── main.py                 # Ponto de entrada da aplicação Flask
├── venv/                       # Ambiente virtual Python
├── requirements.txt            # Dependências do projeto
└── README.md                   # Documentação do projeto
```

### ▶️ Como Executar o Projeto

1.  **Navegue até o diretório do backend:**
    ```bash
    cd backend
    ```

2.  **Ative o ambiente virtual:**
    ```bash
    source venv/bin/activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Execute a aplicação:**
    ```bash
    python src/main.py
    ```

A API estará disponível em `http://localhost:5000`.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para bugs ou sugestões, e enviar pull requests com melhorias.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.


