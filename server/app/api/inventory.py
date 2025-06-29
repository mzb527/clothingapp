from functools import wraps
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .inventory import bp  # existing blueprint

# Dummy in-memory SKU store for demonstration
SKUS = [
    {"id": 1, "name": "T-Shirt", "stock": 100},
    {"id": 2, "name": "Jeans", "stock": 50},
]

def role_required(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            identity = get_jwt_identity()
            if identity.get("role") != role:
                return jsonify(msg="Forbidden"), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

@bp.route("", methods=["GET"])
@jwt_required()
def list_skus():
    return jsonify(SKUS)

@bp.route("", methods=["POST"])
@jwt_required()
@role_required("manager")
def create_sku():
    data = request.get_json()
    if not data or "name" not in data or "stock" not in data:
        return jsonify(msg="Missing fields"), 400
    new_id = max([sku["id"] for sku in SKUS], default=0) + 1
    sku = {"id": new_id, "name": data["name"], "stock": data["stock"]}
    SKUS.append(sku)
    return jsonify(sku), 201

@bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
@role_required("manager")
def update_sku(id):
    data = request.get_json()
    for sku in SKUS:
        if sku["id"] == id:
            sku.update({k: v for k, v in data.items() if k in ["name", "stock"]})
            return jsonify(sku)
    return jsonify(msg="SKU not found"), 404

@bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("manager")
def delete_sku(id):
    global SKUS
    for sku in SKUS:
        if sku["id"] == id:
            SKUS = [s for s in SKUS if s["id"] != id]
            return jsonify(msg="Deleted")
    return jsonify(msg="SKU not found"), 404