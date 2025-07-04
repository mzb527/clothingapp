from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models import Vendor

bp = Blueprint("vendors", __name__, url_prefix="/api/vendors")

@bp.route("", methods=["GET"])
@jwt_required()
def list_vendors():
    vens = Vendor.query.order_by(Vendor.name).all()
    return jsonify([{"id": v.id, "name": v.name} for v in vens])