from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

food_bp = Blueprint("food", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@food_bp.route("/upload", methods=["POST"])
def upload_food():
    # Handle food image upload and return AI-detected info (mocked or real).
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # --- AI recognition (mocked for hackathon demo) ---
    # You can later plug in OpenAI Vision or a ML model
    detected_food = "Pasta"  # Replace with real detection

    return jsonify({
        "message": "Image received",
        "detected_food": detected_food,
        "file_path": filepath
    }), 200
