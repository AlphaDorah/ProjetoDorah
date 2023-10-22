from flask import url_for
from flask.cli import with_appcontext


def test_index(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"<!DOCTYPE html>" in response.data


def test_hello(client):
    response = client.get("/hello")
    assert response.status_code == 200
    assert response.data == b"<h2>Hello, World!</h2>"


def test_public(client):
    response = client.get("/dorahHome/home.html")
    assert response.status_code == 200
    assert b"<!DOCTYPE html>" in response.data
