// src/components/ProductSearchScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useProducts } from '../hooks/useProducts';
import styles from '../css/ProductSearchScreen.module.css';
import AIRecommendation from '../components/AIRecommendation';

const ProductSearchScreen = ({ onAddItem, onClose }) => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeRecommendation, setActiveRecommendation] = useState(null);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleAIRecommend = async (productId) => {
    console.info(`Handle AI Recommend called with product Id: ${productId}`);
    try {
      console.log('Sending request to API...');
      const response = await axios.post(`http://127.0.0.1:8000/products/${productId}/review-summary`);
      console.log('Raw response:', response);
      console.log('Response data:', response.data);
      console.log('Response status:', response.status);
      
      if (response.data && response.data.summary) {
        setActiveRecommendation({
          productId,
          summary: response.data.summary
        });
        console.log('Active recommendation set:', {productId, summary: response.data.summary});
      } else {
        console.warn('Response does not contain expected data structure');
      }
    } catch (error) {
      console.error('Error fetching AI recommendation:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.image_url} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p>{product.price_won}원</p>
              <button
                className={styles.aiRecommendButton}
                onClick={() => handleAIRecommend(product.id)}
              >
                AI Reviewer
              </button>
              {activeRecommendation && activeRecommendation.productId === product.id && (
                <AIRecommendation summary={activeRecommendation.summary} />
              )}
            </div>
            <button
              className={styles.addButton}
              onClick={() => onAddItem(product)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearchScreen;