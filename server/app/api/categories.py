from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models import Category

bp = Blueprint("categories", __name__, url_prefix="/api/categories")

@bp.route("", methods=["GET"])
@jwt_required()
def list_categories():
    cats = Category.query.order_by(Category.name).all()
    return jsonify([{"id": c.id, "name": c.name} for c in cats])