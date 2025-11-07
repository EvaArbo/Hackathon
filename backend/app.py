from flask import Flask
from flask_cors import CORS
from routes.food import food_bp
from routes.donations import donations_bp
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(_name_)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
db.init_app(app)

app.register_blueprint(food_bp, url_prefix="/api/food")
app.register_blueprint(donations_bp, url_prefix="/api/donations")

@app.route("/")
def home():
    return {"message": "Waste Not API running"}

if __name__== "_main_":
    app.run(debug=True)