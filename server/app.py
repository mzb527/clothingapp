from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS # type: ignore 
from .models import Sku  # SQLAlchemy model

app = Flask(__name__)
CORS(app)

@app.route('/api/hello')
def hello():
    name = request.args.get('name', 'World')
    return jsonify(message=f'Hello, {name}!')   
if __name__ == '__main__':
    app.run(port=5000)

    # app/api/inventory.py
from flask import Blueprint, request, jsonify
from models import Sku  # SQLAlchemy model

bp = Blueprint("inventory", __name__, url_prefix="/api/skus")

@bp.route("", methods=["GET"])
def list_skus():
    q       = request.args.get("q", type=str, default="")
    page    = request.args.get("page", type=int, default=1)
    per     = request.args.get("per_page", type=int, default=25)
    sort_by = request.args.get("sort_by",   type=str, default="name")
    order   = request.args.get("order",     type=str, default="asc")
    # filters: color=red, size=XL, stock_min=10, …
    filters = { k:v for k, v in request.args.items() if k not in ["q","page","per_page","sort_by","order"] }

    query = Sku.query
    if q:
        query = query.filter(Sku.name.ilike(f"%{q}%"))
    for field, val in filters.items():
        query = query.filter(getattr(Sku, field)==val)
    # apply sorting
    direction = getattr(Sku, sort_by)
    if order=="desc": direction = direction.desc()
    query = query.order_by(direction)
    pagination = query.paginate(page, per, error_out=False)
    items = [sku.to_dict() for sku in pagination.items]
    return jsonify({
      "items": items,
      "total": pagination.total,
      "page": pagination.page,
      "per_page": pagination.per_page
    })