from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()
db = SQLAlchemy()

def init_db(app: Flask):
    # Configure the Postgres connection
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Bind app to SQLAlchemy
    db.init_app(app)

    # Create tables if not exist
    with app.app_context():
        db.create_all()
        print("Database connected and tables created.")
