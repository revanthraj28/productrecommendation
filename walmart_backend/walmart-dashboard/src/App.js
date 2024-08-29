import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const fetchRecommendations = (customerId) => {
    axios.get(`http://127.0.0.1:5000/api/recommendations/${customerId}`)
      .then(response => setRecommendations(response.data))
      .catch(error => console.error('Error fetching recommendations:', error));
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.product_id}>
            {product.product_name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <h2>Recommendations for Customer 1</h2>
      <button onClick={() => fetchRecommendations('customer_1')}>
        Get Recommendations
      </button>
      <ul>
        {recommendations.map(product => (
          <li key={product.product_id}>
            {product.product_name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

