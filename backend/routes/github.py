from flask import Blueprint, request, jsonify
import os
import requests

github_bp = Blueprint('github', __name__)
GITHUB_PAT = os.getenv('GITHUB_PAT')

GITHUB_API_BASE = "https://api.github.com"

headers = {
    "Authorization": f"token {GITHUB_PAT}",
    "Accept": "application/vnd.github.v3+json"
}

@github_bp.route('/repos', methods=['GET'])
def list_repos():
    """
    Lists repos accessible to the user via the PAT.
    """
    try:
        response = requests.get(f"{GITHUB_API_BASE}/user/repos", headers=headers)
        response.raise_for_status()
        repos = response.json()
        repo_list = [{"name": repo["name"], "full_name": repo["full_name"], "private": repo["private"]} for repo in repos]
        return jsonify(repo_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@github_bp.route('/repos/<owner>/<repo>/contents', methods=['GET'])
def list_repo_contents(owner, repo):
    """
    Lists contents of a repo path (root by default).
    Use ?path=foldername for subfolders.
    """
    path = request.args.get('path', '')
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/contents/{path}"
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        contents = response.json()
        return jsonify(contents)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@github_bp.route('/repos/<owner>/<repo>/contents/<path:file_path>', methods=['GET'])
def get_file_content(owner, repo, file_path):
    """
    Returns raw content of a file in the repo.
    """
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/contents/{file_path}"
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        content_json = response.json()
        if 'content' in content_json:
            import base64
            import codecs
            content = base64.b64decode(content_json['content']).decode('utf-8')
            return jsonify({"content": content})
        else:
            return jsonify({"error": "No content found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
