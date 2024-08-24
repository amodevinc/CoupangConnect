import React from 'react';
import { useParams } from 'react-router-dom';
import CartView from '../components/CartView';
import { useSharedCart } from '../hooks/useSharedCart';
import styles from '../css/Cart.module.css';

const CartScreen = ({ userId }) => {
    const { cartId } = useParams();
    const { userCarts, loading, error } = useSharedCart(userId);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    const cart = cartId === 'individual' 
      ? { name: 'Individual Cart', id: 'individual' } 
      : userCarts.find(c => c.id === cartId);
  
    if (!cart) return <div>Cart not found</div>;
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{cart.name}</h1>
        <CartView cartId={cartId} userId={userId} />
      </div>
    );
  };

export default CartScreen;