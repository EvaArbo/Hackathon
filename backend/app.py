from flask import Flask
from flask_cors import CORS
from database import init_db
from routes.food import food_bp
from routes.donations import donations_bp
from routes.users import users_bp

app = Flask(__name__)
CORS(app)
init_db(app)

app.register_blueprint(food_bp, url_prefix="/api/food")
app.register_blueprint(donations_bp, url_prefix="/api/donations")
app.register_blueprint(users_bp, url_prefix="/api/users")

@app.route("/")
def home():
    return {"message": "waste_not API is running"}


if __name__ == "__main__":
    app.run(debug=True)
