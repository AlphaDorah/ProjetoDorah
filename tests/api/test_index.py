from flask.testing import FlaskClient


def test_index(client: FlaskClient):
    response = client.get("/")
    assert response.status_code == 200
    assert b"<!DOCTYPE html>" in response.data


def test_open_login_route(client: FlaskClient):
    response = client.get("/login")
    assert response.status_code == 200


def test_open_login_template(client: FlaskClient):
    response = client.get("/login")
    assert "<!DOCTYPE html>" in response.data.decode()


def test_hello(client: FlaskClient):
    response = client.get("/hello")
    assert response.status_code == 200
    assert response.data == b"<h2>Hello, World!</h2>"


def test_public(client):
    response = client.get("/dorahHome/home.html")
    assert response.status_code == 200
    assert b"<!DOCTYPE html>" in response.data
