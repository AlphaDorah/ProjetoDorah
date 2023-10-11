from app import create_app


def test_create_app_has_debug_false(app):
    assert app.config["DEBUG"] == False


def test_create_app_has_testing_true(app):
    assert app.config["TESTING"] == True
