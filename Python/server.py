from flask import Flask, request, jsonify
from cryptic_utils import create_authorisation_header, request_body_raw_text, request_body_dict
from dotenv import load_dotenv
import os
import requests
import uuid
import json
from datetime import datetime, timedelta
import httpx

app = Flask(__name__)
load_dotenv()


@app.route('/search', methods=['POST'])
def search():
    print("Entering search function")
    
    request_body_dict = request.get_json()
    print(f"Request Body: {json.dumps(request_body_dict, indent=2)}")

    #Create Header
    auth_header = create_authorisation_header(json.dumps(request_body_dict))
    print(f"Authorization Header: {auth_header}")

    response = requests.post(
        "https://staging.gateway.proteantech.in/search",
        json=request_body_dict,
        headers={
            "Authorization": auth_header,
            "Content-Type": "application/json"
        }
    )
    
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")

    return jsonify(response.json())

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
