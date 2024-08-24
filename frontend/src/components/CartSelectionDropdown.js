import React from 'react';
import styles from '../css/CartSelectionDropdown.module.css';
import { useUnifiedCart } from '../hooks/useUnifiedCart';

const CartSelectionDropdown = ({userId}) => {
  const {
    userCarts,
    activeCartId,
    setActiveCartIdCallback,
  } = useUnifiedCart(userId);
  return (
    <div className={styles.dropdownContainer}>
      <select
        value={activeCartId}
        onSelect={(e) => setActiveCartIdCallback(e.target.value)}
        onChange={(e) => {
          console.log('E: ', e.target.value)
          setActiveCartIdCallback(e.target.value)
        }}
        className={styles.select}
      >
        <option value="">Select a cart</option>
        {userCarts.map((cart) => (
          <option key={cart.id} value={cart.id}>
            {cart.name}
          </option>
        ))}
      </select>
      <div className={styles.arrowIcon}>
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default CartSelectionDropdown;