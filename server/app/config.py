import os
from dotenv import load_dotenv

# load .env from project root
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '..', '.env'))

class Config:
    # Flask / SQLAlchemy
    SQLALCHEMY_DATABASE_URI   = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT
    JWT_SECRET_KEY            = os.getenv('JWT_SECRET_KEY', 'fallback-secret')
    JWT_ACCESS_TOKEN_EXPIRES  = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600))
    JWT_REFRESH_TOKEN_EXPIRES    = int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES', 86400))  # e.g. 1 day
