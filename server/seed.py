from app import create_app, db
from app.models import User, Category, Vendor, Sku
from werkzeug.security import generate_password_hash

app = create_app()
with app.app_context():
    db.drop_all()
    db.create_all()

    # seed users
    db.session.add_all([
        User.seed("manager1", "securepass", "manager"),
        User.seed("clerk1",   "clerkpass",   "clerk")
    ])

    # seed categories & vendors
    c1 = Category(name="Apparel")
    c2 = Category(name="Footwear")
    v1 = Vendor(name="Acme Co")
    v2 = Vendor(name="Global Threads")
    db.session.add_all([c1, c2, v1, v2])
    db.session.commit()

    # seed SKUs linked to category & vendor
    items = [
        {
          "name":"Red Hoodie", "sku_code":"RH001", "stock":50,
          "price":39.99, "color":"red","size":"L",
          "category_id":c1.id, "vendor_id":v1.id
        },
        {
          "name":"Blue Sneakers","sku_code":"BS002","stock":30,
          "price":59.99,"color":"blue","size":"10",
          "category_id":c2.id,"vendor_id":v2.id
        }
    ]
    for data in items:
        db.session.add(Sku.create_from_dict(data))
    db.session.commit()
    print("Database seeded.")