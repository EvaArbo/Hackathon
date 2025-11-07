from flask import Blueprint, request, jsonify

users_bp = Blueprint("users", __name__)

# Simple in-memory store for demo
users = []

@users_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if any(u["username"] == username for u in users):
        return jsonify({"error": "User already exists"}), 400
    users.append({"username": username, "password": password})
    return jsonify({"message": "User registered successfully"}), 201


@users_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    for u in users:
        if u["username"] == username and u["password"] == password:
            return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid credentials"}), 401
