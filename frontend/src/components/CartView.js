import React from 'react';
import { useSharedCart } from '../hooks/useSharedCart';
import styles from '../css/CartView.module.css';

const CartView = ({ cartId, userId }) => {
  const { userCarts, removeItemFromCart, upvoteItem, downvoteItem } = useSharedCart(userId);

  const cart = userCarts.find(cart => cart.id === cartId);

  if (!cart) {
    return <div>Cart not found</div>;
  }

  const sortedItems = [...cart.items].sort((a, b) => (b.votes || 0) - (a.votes || 0));

  return (
    <div className={styles.cartView}>
      <h2 className={styles.cartName}>{cart.name}</h2>
      <p className={styles.cartTheme}>Theme: {cart.theme}</p>
      <ul className={styles.itemList}>
        {sortedItems.map(item => (
          <li key={item.id} className={styles.itemCard}>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
            </div>
            <div className={styles.itemActions}>
              <button 
                className={styles.voteButton} 
                onClick={() => upvoteItem(cartId, item.id)}
              >
                ▲
              </button>
              <span className={styles.voteCount}>{item.votes || 0}</span>
              <button 
                className={styles.voteButton} 
                onClick={() => downvoteItem(cartId, item.id)}
              >
                ▼
              </button>
              <button 
                className={styles.removeButton}
                onClick={() => removeItemFromCart(cartId, item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartView;