from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import Sku, Category, Vendor

bp = Blueprint("inventory", __name__, url_prefix="/api/skus")

@bp.route("", methods=["GET"])
@jwt_required()
def list_skus():
    q            = request.args.get("q", "")
    page         = request.args.get("page", 1, type=int)
    per          = request.args.get("per_page", 25, type=int)
    sort_by      = request.args.get("sort_by", "name")
    order        = request.args.get("order", "asc")
    category_id  = request.args.get("category_id", type=int)
    vendor_id    = request.args.get("vendor_id", type=int)

    query = Sku.query
    if q:
        query = query.filter(Sku.name.ilike(f"%{q}%"))
    if category_id:
        query = query.filter(Sku.category_id == category_id)
    if vendor_id:
        query = query.filter(Sku.vendor_id == vendor_id)

    col = getattr(Sku, sort_by, Sku.name)
    direction = col.desc() if order == "desc" else col.asc()
    pagination = query.order_by(direction).paginate(page, per, False)

    items = [sku.to_dict() for sku in pagination.items]
    return jsonify({
        "items": items,
        "total": pagination.total,
        "page": pagination.page,
        "per_page": pagination.per_page
    })