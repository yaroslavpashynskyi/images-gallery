import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path='.env.local')

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.getenv('UNSPLASH_KEY', '')
DEBUG = bool(os.getenv('DEBUG', "True"))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)


@app.route("/new-image")
def new_image():
    query = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": f"Client-ID {UNSPLASH_KEY}"}
    params = {"query": query}

    data = requests.get(UNSPLASH_URL, headers=headers, params=params, timeout=10)

    return data.json()


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        images_data = images_collection.find({})

        print(images_data)
        return jsonify([img for img in images_data])
    if request.method == "POST":
        image = request.get_json()
        image["_id"] = image.get("id")

        return jsonify({"inserted_id": images_collection.insert_one(image).inserted_id})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=DEBUG)
