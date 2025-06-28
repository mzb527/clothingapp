from flask import Flask
from .extensions import jwt
from .api.auth import bp as auth_bp
from .api.inventory import bp as inv_bp

def create_app():
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = "super-secret"  # replace in prod
    jwt.init_app(app)
    app.register_blueprint(auth_bp)
    app.register_blueprint(inv_bp)
    return app