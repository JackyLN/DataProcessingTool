from flask import Flask, request, jsonify
from flask_cors import CORS

from config import FlaskConfig
import os

app = Flask(__name__)
app.config.from_object(FlaskConfig())
cors = CORS(app)

# import routes
#import services.FileProcessingServices
import src.services.FileProcessingServices

@app.route("/", methods=['GET'])
def hello():
  return index_hello()

# @app.route("/upload", methods=['POST'])
# def upload():

#   data = request.get_json()
#   convert = show_data(data)

        
#   return convert

def index_hello():
  #return response.json("OK", status=200)
  return "<h1 style='color:blue'>Hello There!</h1>"


if __name__ == "__main__":
    #app.run(host='0.0.0.0', port=7701)
    app.run()

