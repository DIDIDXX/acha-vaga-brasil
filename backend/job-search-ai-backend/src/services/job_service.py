import requests
import json

class JobService:
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
    
    def search_jobs(self, query, remote_only=False, after_date=None):
        """
        Search for jobs using the backend API
        """
        params = {
            "query": query,
            "remote_only": str(remote_only).lower()
        }
        
        if after_date:
            params["after_date"] = after_date
            
        try:
            response = requests.get(f"{self.base_url}/api/jobs/search", params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error searching jobs: {e}")
            return []

# Example usage
if __name__ == "__main__":
    service = JobService()
    jobs = service.search_jobs("Data Engineer", remote_only=False)
    print(json.dumps(jobs, indent=2))

