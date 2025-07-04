from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)
from models import User

bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify(msg="Missing credentials"), 400

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify(msg="Bad credentials"), 401

    access = create_access_token(identity={"id": user.id, "role": user.role}, fresh=True)
    refresh = create_refresh_token(identity={"id": user.id, "role": user.role})
    return jsonify(
        access_token=access,
        refresh_token=refresh,
        user={"id": user.id, "username": user.username, "role": user.role}
    ), 200

@bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    new_access = create_access_token(identity=identity, fresh=False)
    return jsonify(access_token=new_access), 200