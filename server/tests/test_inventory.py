import json

def get_headers(token):
    return {"Authorization": f"Bearer {token}"}

def test_list_skus_requires_auth(client):
    resp = client.get("/api/skus")
    assert resp.status_code == 401

def test_list_skus_as_clerk(client):
    login = client.post(
        "/api/auth/login", json={"username":"clrk","password":"pass"}
    ).get_json()
    resp = client.get("/api/skus", headers=get_headers(login["access_token"]))
    assert resp.status_code == 200
    assert isinstance(resp.get_json()["items"], list)

def test_create_sku_forbidden_for_clerk(client):
    login = client.post(
        "/api/auth/login", json={"username":"clrk","password":"pass"}
    ).get_json()
    resp = client.post(
        "/api/skus",
        headers=get_headers(login["access_token"]),
        json={"name":"New", "sku_code":"N001", "stock":1, "price":1.23}
    )
    assert resp.status_code == 403

def test_create_update_delete_sku_as_manager(client):
    login = client.post(
        "/api/auth/login", json={"username":"mgr","password":"pass"}
    ).get_json()
    headers = get_headers(login["access_token"])
    # Create
    new = client.post(
        "/api/skus",
        headers=headers,
        json={"name":"X","sku_code":"X01","stock":2,"price":2.0}
    )
    assert new.status_code == 200
    new_id = new.get_json()["id"]
    # Update
    upd = client.put(
        f"/api/skus/{new_id}",
        headers=headers,
        json={"stock":5}
    )
    assert upd.status_code == 200
    # Delete
    rem = client.delete(f"/api/skus/{new_id}", headers=headers)
    assert rem.status_code == 200