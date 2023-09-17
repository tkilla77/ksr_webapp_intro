from flask import Flask

app = Flask("example app")

@app.route("/hello/<name>")
def hello(name):
    return f"Nice to meet you, {name}!"

@app.route("/api/bodensee")
def json_api():
    response = { 'becken': 'Bodensee', 'temp' : 33.3}
    return response

