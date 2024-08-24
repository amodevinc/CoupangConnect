// src/components/ProductSearchScreen.js
import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import styles from '../css/ProductSearchScreen.module.css';

const ProductSearchScreen = ({ onAddItem, onClose }) => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

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