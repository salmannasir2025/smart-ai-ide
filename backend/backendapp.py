from flask import Flask
from routes.chat import chat_bp
from routes.bugfinder import bugfinder_bp
from routes.github import github_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Register blueprints for modular route handling
app.register_blueprint(chat_bp, url_prefix='/chat')
app.register_blueprint(bugfinder_bp, url_prefix='/bugfinder')
app.register_blueprint(github_bp, url_prefix='/github')

if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
