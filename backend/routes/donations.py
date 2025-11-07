from flask import Blueprint, request, jsonify
from database import db
from models.donation import Donation

donations_bp = Blueprint("donations", __name__)

@donations_bp.route("/", methods=["GET"])
def get_donations():
    donations = Donation.query.all()
    data = [
        {
            "id": d.id,
            "food_name": d.food_name,
            "quantity": d.quantity,
            "donor": d.donor,
            "receiver": d.receiver,
            "created_at": d.created_at
        }
        for d in donations
    ]
    return jsonify(data), 200


@donations_bp.route("/", methods=["POST"])
def create_donation():
    data = request.get_json()
    new_donation = Donation(
        food_name=data.get("food_name"),
        quantity=data.get("quantity"),
        donor=data.get("donor"),
        receiver=data.get("receiver")
    )
    db.session.add(new_donation)
    db.session.commit()
    return jsonify({"message": "Donation created successfully"}), 201


@donations_bp.route("/match", methods=["GET"])
def find_matches():
    """
    Mock matching logic — in future use Google Maps API.
    """
    mock_matches = [
        {"shelter": "Sunrise Shelter", "distance": "1.2 km"},
        {"shelter": "Community Kitchen", "distance": "2.5 km"}
    ]
    return jsonify(mock_matches), 200
