from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the product data
product_df = pd.read_csv('product_data.csv')

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(product_df.to_dict(orient='records'))

@app.route('/api/recommendations/<customer_id>', methods=['GET'])
def get_recommendations(customer_id):
    recommendations = pd.read_csv(f'{customer_id}_recommendations.csv')
    return jsonify(recommendations.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
