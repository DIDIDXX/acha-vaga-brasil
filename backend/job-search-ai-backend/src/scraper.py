import requests
from bs4 import BeautifulSoup
import re
import json
from datetime import datetime, timedelta

def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

def scrape_greenhouse(url, search_query, remote_only, after_date):
    jobs = []
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Greenhouse typically lists jobs in a div with class 'opening'
        for opening in soup.find_all('div', class_='opening'):
            title_tag = opening.find('a')
            location_tag = opening.find('span', class_='location')
            
            if title_tag and location_tag:
                title = clean_text(title_tag.get_text())
                link = 'https://boards.greenhouse.io' + title_tag['href']
                location = clean_text(location_tag.get_text())
                
                # Basic filtering based on search query and remote_only
                if search_query.lower() in title.lower() and \
                   (not remote_only or 'remote' in location.lower()):
                    jobs.append({
                        'title': title,
                        'company': url.split('/')[-1] if url.split('/')[-1] else url.split('/')[-2], # Extract company name from URL
                        'location': location,
                        'url': link,
                        'description': 'N/A', # Description needs deeper scraping or separate request
                        'tags': [],
                        'matchScore': 0 # Placeholder
                    })
    except requests.exceptions.RequestException as e:
        print(f"Error scraping Greenhouse {url}: {e}")
    return jobs

def scrape_lever(url, search_query, remote_only, after_date):
    jobs = []
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Lever typically lists jobs in a div with class 'posting'
        for posting in soup.find_all('div', class_='posting'):
            title_tag = posting.find('h5')
            location_tag = posting.find('span', class_='sort-by-location')
            
            if title_tag and location_tag:
                title = clean_text(title_tag.get_text())
                link = posting.find('a', class_='posting-btn')['href']
                location = clean_text(location_tag.get_text())
                
                if search_query.lower() in title.lower() and \
                   (not remote_only or 'remote' in location.lower()):
                    jobs.append({
                        'title': title,
                        'company': url.split('/')[-1] if url.split('/')[-1] else url.split('/')[-2], # Extract company name from URL
                        'location': location,
                        'url': link,
                        'description': 'N/A',
                        'tags': [],
                        'matchScore': 0
                    })
    except requests.exceptions.RequestException as e:
        print(f"Error scraping Lever {url}: {e}")
    return jobs

def search_jobs(query, remote_only=False, after_date=None):
    all_jobs = []
    
    # Example sites from the user's prompt
    greenhouse_sites = [
        'https://boards.greenhouse.io/techcorp',
        # Add more Greenhouse sites here if known
    ]
    lever_sites = [
        'https://jobs.lever.co/dataflowinc',
        # Add more Lever sites here if known
    ]
    
    for site in greenhouse_sites:
        all_jobs.extend(scrape_greenhouse(site, query, remote_only, after_date))
        
    for site in lever_sites:
        all_jobs.extend(scrape_lever(site, query, remote_only, after_date))
        
    # Simulate some additional jobs for demonstration
    if query.lower() == 'data engineer':
        all_jobs.append({
            'title': 'Data Engineer',
            'company': 'TechCorp',
            'location': 'Remote',
            'url': 'https://example.com/job/data-engineer-techcorp',
            'description': 'Procuramos um Data Engineer experiente para trabalhar com pipelines de dados escaláveis usando Python, SQL e AWS. Você será responsável por desenvolver e manter nossa infraestrutura de dados, garantindo alta disponibilidade e performance.',
            'tags': ['Python', 'SQL', 'AWS', 'Apache Spark'],
            'matchScore': 85
        })
        all_jobs.append({
            'title': 'Senior Data Engineer',
            'company': 'DataFlow Inc',
            'location': 'São Paulo, SP (Híbrido)',
            'url': 'https://example.com/job/senior-data-engineer-dataflow',
            'description': 'Oportunidade para Data Engineer sênior em empresa de tecnologia líder no mercado. Trabalhe com big data, machine learning e arquiteturas modernas de dados.',
            'tags': ['Python', 'Kafka', 'Docker', 'Kubernetes'],
            'matchScore': 92
        })
        all_jobs.append({
            'title': 'Machine Learning Engineer',
            'company': 'AI Solutions',
            'location': 'Work from anywhere',
            'url': 'https://example.com/job/ml-engineer-ai-solutions',
            'description': 'Junte-se ao nosso time de ML para desenvolver soluções inovadoras usando TensorFlow, PyTorch e tecnologias de ponta. Trabalhe em projetos desafiadores de IA.',
            'tags': ['Python', 'TensorFlow', 'MLOps', 'GCP'],
            'matchScore': 78
        })

    # Filter by after_date (simulated for mock data)
    if after_date:
        filtered_jobs = []
        for job in all_jobs:
            # For mock data, we'll assume all jobs are recent enough if no specific date is provided
            # In a real scenario, job boards usually provide a posting date.
            # For now, we'll just include all if after_date is set, as we don't have real dates.
            # A more robust solution would involve scraping the posting date.
            filtered_jobs.append(job)
        all_jobs = filtered_jobs

    return all_jobs

if __name__ == '__main__':
    # Example usage:
    # jobs = search_jobs('Data Engineer', remote_only=True, after_date='2025-07-29')
    jobs = search_jobs('Data Engineer', remote_only=False)
    print(json.dumps(jobs, indent=2))


