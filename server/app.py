from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore 

app = Flask(__name__)
CORS(app)

@app.route('/api/hello')
def hello():
    name = request.args.get('name', 'World')
    return jsonify(message=f'Hello, {name}!')   
if __name__ == '__main__':
    app.run(port=5000)