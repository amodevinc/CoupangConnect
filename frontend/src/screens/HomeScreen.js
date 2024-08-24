import React, { useState } from 'react';
import ProductGallery from '../components/ProductGallery';
import CreateSharedCartModal from '../modals/CreateSharedCartModal';
import styles from '../css/Home.module.css';
import { useUnifiedCart } from '../hooks/useUnifiedCart';

const Home = ({ userId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { createSharedCart, loading, error } = useUnifiedCart(userId);
  
    const handleCreateSharedCart = (name, theme) => {
      createSharedCart(name, theme);
      setIsModalOpen(false);
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to CoupangConnect</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.createCartButton}
        >
          Create Shared Cart
        </button>
        <ProductGallery userId={userId} />
        {isModalOpen && (
          <CreateSharedCartModal
            onClose={() => setIsModalOpen(false)}
            onCreateCart={handleCreateSharedCart}
          />
        )}
      </div>
    );
  };
  
export default Home;