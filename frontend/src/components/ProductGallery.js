import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useSharedCart } from '../hooks/useSharedCart';
import styles from '../css/ProductGallery.module.css';
import CartSelectionDropdown from '../components/CartSelectionDropdown';

const ProductGallery = ({userId }) => {
  const { products, loading, error } = useProducts(20);
  const { 
    userCarts, 
    activeCartId, 
    setActiveCartId, 
    addItemToCart,
  } = useSharedCart(userId);

  if (loading) return <div className={styles.loading}>Loading products...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const handleAddToCart = (product) => {
    if (!activeCartId) {
      alert('Please select a cart first');
      return;
    }
    addItemToCart(product);
  };

  return (
    <div>
      <CartSelectionDropdown
        activeCartId={activeCartId}
        setActiveCartId={setActiveCartId}
        userCarts={userCarts}
      />
      <div className={styles.gallery}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image_url} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <button 
              onClick={() => handleAddToCart(product)}
              className={styles.addToCartButton}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;