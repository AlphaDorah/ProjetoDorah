def test_index(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"<!DOCTYPE html>" in response.data


def test_hello(client):
    response = client.get("/hello")
    assert response.status_code == 200
    assert response.data == b"<h2>Hello, World!</h2>"


def test_public(client):
    response = client.get("/mind-map-page/css/mind-map-style.css")
    assert response.status_code == 200
    assert b"body {" in response.data
