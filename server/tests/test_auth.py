import json
from flask_jwt_extended import decode_token

def test_login_success(client):
    resp = client.post(
        "/api/auth/login",
        json={"username":"mgr","password":"pass"}
    )
    data = resp.get_json()
    assert resp.status_code == 200
    assert "access_token" in data and "refresh_token" in data

def test_login_failure(client):
    resp = client.post(
        "/api/auth/login",
        json={"username":"mgr","password":"wrong"}
    )
    assert resp.status_code == 401

def test_refresh_token(client):
    login = client.post(
        "/api/auth/login",
        json={"username":"mgr","password":"pass"}
    ).get_json()
    # wait for access token expiry (if needed), then:
    refresh = client.post(
        "/api/auth/refresh",
        headers={"Authorization": f"Bearer {login['refresh_token']}"}
    )
    assert refresh.status_code == 200
    new_access = refresh.get_json()["access_token"]
    payload = decode_token(new_access)
    assert payload["sub"]["role"] == "manager"