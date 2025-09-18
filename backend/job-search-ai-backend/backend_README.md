# JobSeeker AI - Backend

## 🚀 Visão Geral

Bem-vindo ao backend do **JobSeeker AI**! Esta é uma API RESTful desenvolvida em Flask, responsável por processar a lógica de busca de vagas, web scraping e integração com o frontend.

## ✨ Características Principais

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

## 🛠️ Tecnologias Utilizadas

### Backend Framework
-   **Flask 3.1.1:** Framework web principal.
-   **Flask-CORS 6.0.0:** Suporte a Cross-Origin Resource Sharing.

### Web Scraping
-   **Requests 2.32.5:** Cliente HTTP para requisições.
-   **BeautifulSoup4 4.13.5:** Parser HTML para web scraping.

## 📂 Estrutura do Projeto

```
job-search-ai-backend/
├── src/
│   ├── models/                    # Modelos de banco de dados (ex: user.py)
│   ├── routes/                   # Rotas da API (ex: user.py, jobs.py)
│   ├── scraper.py              # Lógica de web scraping
│   └── main.py                 # Ponto de entrada da aplicação Flask
├── venv/                       # Ambiente virtual Python
├── requirements.txt            # Dependências do projeto
└── README.md                   # Documentação do projeto
```

## ▶️ Como Executar o Projeto

### Pré-requisitos

-   [Python](https://www.python.org/) (versão 3.11 ou superior)
-   [pip](https://pip.pypa.io/en/stable/) (gerenciador de pacotes Python)

### Instalação

1.  **Navegue até o diretório do backend:**
    ```bash
    cd job-search-ai-backend
    ```

2.  **Ative o ambiente virtual:**
    ```bash
    source venv/bin/activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

### Execução

Para iniciar o servidor de desenvolvimento:

```bash
python src/main.py
```

A API estará disponível em `http://localhost:5000`.

## 🛣️ Próximos Passos

-   **Expansão do Web Scraping:** Adicionar suporte a mais job boards e refinar a lógica de extração.
-   **Integração com IA:** Implementar a lógica de IA para aprimorar a busca e a geração de CVs.
-   **Autenticação e Banco de Dados:** Desenvolver um sistema de autenticação de usuários e persistência de dados.
-   **Deployment:** Preparar a aplicação para deploy em ambientes de produção (ex: Docker, Gunicorn).

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para bugs ou sugestões, e enviar pull requests com melhorias.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

