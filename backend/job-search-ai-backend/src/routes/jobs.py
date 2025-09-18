from flask import Blueprint, request, jsonify
from src.scraper import search_jobs

jobs_bp = Blueprint("jobs", __name__)

@jobs_bp.route("/search", methods=["GET"])
def search():
    query = request.args.get("query", "")
    remote_only = request.args.get("remote_only", "false").lower() == "true"
    after_date = request.args.get("after_date") # YYYY-MM-DD format

    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    try:
        jobs = search_jobs(query, remote_only, after_date)
        return jsonify(jobs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


