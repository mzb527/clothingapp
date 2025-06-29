from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .config import Config

db  = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(Config)

    # init extensions
    db.init_app(app)
    jwt.init_app(app)

    # register blueprints
    from .api.auth import bp as auth_bp
    from .api.inventory import bp as inv_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(inv_bp)

    return app