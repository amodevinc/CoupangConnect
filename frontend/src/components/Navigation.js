import React from 'react';
import { Link } from 'react-router-dom';
import { useSharedCart } from '../hooks/useSharedCart';
import styles from '../css/Navigation.module.css';

const Navigation = ({ userId }) => {
  const { userCarts } = useSharedCart(userId);

  return (
    <nav className={styles.navigation}>
      <Link to="/" className={styles.navLink}>Home</Link>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Carts</button>
        <div className={styles.dropdownContent}>
          <Link to="/cart/individual" className={styles.navLink}>Individual Cart</Link>
          {userCarts.map(cart => (
            <Link 
              key={cart.id} 
              to={`/cart/${cart.id}`} 
              className={styles.navLink}
            >
              {cart.name}
            </Link>
          ))}
        </div>
      </div>
      {userId ? (
        <Link to="/profile" className={styles.navLink}>Profile</Link>
      ) : (
        <Link to="/login" className={styles.navLink}>Login</Link>
      )}
    </nav>
  );
};

export default Navigation;