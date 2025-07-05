import pytest
from app import create_app, db
from app.models import User, Category, Vendor, Sku

@pytest.fixture(scope="session")
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "JWT_SECRET_KEY": "test-secret",
        "JWT_ACCESS_TOKEN_EXPIRES": 1,  # short for expiry tests
        "JWT_REFRESH_TOKEN_EXPIRES": 10
    })
    with app.app_context():
        db.create_all()
        # seed roles, users, categories, vendors, skus
        manager = User.seed("mgr", "pass", "manager")
        clerk   = User.seed("clrk","pass","clerk")
        db.session.add_all([manager, clerk])
        c = Category(name="Cat1"); v = Vendor(name="Vend1")
        db.session.add_all([c, v]); db.session.commit()
        sku = Sku.create_from_dict({
            "name":"Test","sku_code":"T001","stock":5,"price":9.99,
            "category_id": c.id, "vendor_id": v.id
        })
        db.session.add(sku); db.session.commit()
    yield app

@pytest.fixture
def client(app):
    return app.test_client()