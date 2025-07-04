# backend/app/models.py

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

db = SQLAlchemy()

# Add lookup tables for categories and vendors
class Category(db.Model):
    __tablename__ = "categories"
    id   = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    skus = db.relationship("Sku", back_populates="category")

class Vendor(db.Model):
    __tablename__ = "vendors"
    id   = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    skus = db.relationship("Sku", back_populates="vendor")

class User(db.Model):
    __tablename__ = "users"
    id            = db.Column(db.Integer, primary_key=True)
    username      = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role          = db.Column(db.String(32), nullable=False)
    created_at    = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at    = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @classmethod
    def seed(cls, username, password, role):
        return cls(
            username=username,
            password_hash=generate_password_hash(password),
            role=role
        )

class Sku(db.Model):
    __tablename__ = "skus"
    id         = db.Column(db.Integer, primary_key=True)
    name       = db.Column(db.String(128), nullable=False)
    sku_code   = db.Column(db.String(32), unique=True, nullable=False)
    stock      = db.Column(db.Integer, nullable=False, default=0)
    price      = db.Column(db.Float, nullable=False)
    color      = db.Column(db.String(32))
    size       = db.Column(db.String(16))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Foreign keys & relationships
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    vendor_id   = db.Column(db.Integer, db.ForeignKey("vendors.id"))
    category    = db.relationship("Category", back_populates="skus")
    vendor      = db.relationship("Vendor",   back_populates="skus")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "sku_code": self.sku_code,
            "stock": self.stock,
            "price": self.price,
            "color": self.color,
            "size": self.size,
            "category": self.category.name if self.category else None,
            "vendor": self.vendor.name if self.vendor else None,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

    @classmethod
    def create_from_dict(cls, data):
        return cls(
            name       = data.get("name"),
            sku_code   = data.get("sku_code"),
            stock      = data.get("stock", 0),
            price      = data.get("price", 0.0),
            color      = data.get("color"),
            size       = data.get("size"),
            category_id= data.get("category_id"),
            vendor_id  = data.get("vendor_id"),
        )

    def update_from_dict(self, data):
        for field in ["name","sku_code","stock","price","color","size","category_id","vendor_id"]:
            if field in data:
                setattr(self, field, data[field])