from database import db
from datetime import datetime

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    food_name = db.Column(db.String(100))
    quantity = db.Column(db.String(50))
    donor = db.Column(db.String(100))
    receiver = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
