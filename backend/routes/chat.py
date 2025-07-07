from flask import Blueprint, request, jsonify
import os
import requests

chat_bp = Blueprint('chat', __name__)

OLLAMA_API_URL = os.getenv('OLLAMA_API_URL', 'http://localhost:11434')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

@chat_bp.route('/local', methods=['POST'])
def chat_local():
    """
    Proxy chat requests to local Ollama model API.
    Expected JSON: { "model": "model_name", "prompt": "text" }
    """
    data = request.json
    model = data.get('model')
    prompt = data.get('prompt')

    if not model or not prompt:
        return jsonify({"error": "Missing model or prompt"}), 400

    payload = {
        "model": model,
        "prompt": prompt,
        "max_tokens": 500,
        "temperature": 0.2
    }

    try:
        response = requests.post(f"{OLLAMA_API_URL}/api/generate", json=payload)
        response.raise_for_status()
        result = response.json()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@chat_bp.route('/openai', methods=['POST'])
def chat_openai():
    """
    Proxy chat requests to OpenAI API.
    Expected JSON: { "prompt": "text" }
    """
    if not OPENAI_API_KEY:
        return jsonify({"error": "OpenAI API key not set"}), 500

    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "Missing prompt"}), 400

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 500,
        "temperature": 0.2
    }

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
