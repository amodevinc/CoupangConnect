import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useSharedCart } from '../hooks/useSharedCart';
import styles from '../css/ProductGallery.module.css';

const ProductGallery = ({ selectedCart, userId }) => {
  const { products, loading, error } = useProducts(20);
  const { addItemToCart } = useSharedCart(userId);

  if (loading) return <div className={styles.loading}>Loading products...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const handleAddToCart = (product) => {
    if (!userId) {
      alert('Please log in to add items to your cart.');
      return;
    }
    addItemToCart(selectedCart, {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  return (
    <div className={styles.gallery}>
      {products.map(product => (
        <div key={product.id} className={styles.productCard}>
          <img src={product.image_url} alt={product.name} className={styles.productImage} />
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productCategory}>{product.category}</p>
          <p className={styles.productPrice}>
            ${product.price.toFixed(2)} / ₩{product.price_won.toFixed(0)}
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className={styles.addToCartButton}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;