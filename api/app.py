import os
import requests
from flask import Flask, request
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env.local')  

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.getenv('UNSPLASH_KEY', '')
DEBUG = bool(os.getenv('DEBUG', True))

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file and insert there UNSPLASH_KEY")

app = Flask(__name__)

@app.route("/new-image")
def new_image():
    query = request.args.get("query")
    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {UNSPLASH_KEY}"
    }
    params = {"query": query}

    r = requests.get(UNSPLASH_URL, headers=headers, params=params)
    
    return r.json()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=DEBUG)