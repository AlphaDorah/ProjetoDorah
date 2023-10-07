from flask import Flask, send_file, send_from_directory

app = Flask(__name__)


@app.route("/")
def hello_world():
    return send_file("public/mind-map-page.html")


@app.route("/<path:path>")
def public(path):
    return send_from_directory("public", path)


if __name__ == "__main__":
    app.run(debug=True)
