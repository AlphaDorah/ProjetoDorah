from flask.testing import FlaskClient


def test_if_receive_200(client: FlaskClient):
    response = client.get("/api/generate/")
    assert response.status_code == 200
