from flask import Blueprint, request, jsonify
import os
import requests

bugfinder_bp = Blueprint('bugfinder', __name__)

OLLAMA_API_URL = os.getenv('OLLAMA_API_URL', 'http://localhost:11434')

@bugfinder_bp.route('/', methods=['POST'])
def find_bugs():
    """
    Sends code to a lightweight LLM model (e.g. qwen2.5-coder) for bug detection.
    Expected JSON: { "code": "full code string" }
    """
    data = request.json
    code = data.get('code')

    if not code:
        return jsonify({"error": "Missing code"}), 400

    prompt = f"Analyze this code and list any bugs, errors, or issues:\n\n{code}\n\nList them clearly."

    payload = {
        "model": "qwen2.5-coder:1.5b",
        "prompt": prompt,
        "max_tokens": 500,
        "temperature": 0.0
    }

    try:
        response = requests.post(f"{OLLAMA_API_URL}/api/generate", json=payload)
        response.raise_for_status()
        result = response.json()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
