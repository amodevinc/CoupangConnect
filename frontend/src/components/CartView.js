import React from 'react';
import { useSharedCart } from '../hooks/useSharedCart';
import { useGroupDiscount } from '../hooks/useGroupDiscount';
import GroupDiscountProgressBar from '../components/GroupDiscountProgressBar';
import styles from '../css/CartView.module.css';

const CartView = ({ cartId, userId }) => {
  const { userCarts, removeItemFromCart, upvoteItem, downvoteItem } = useSharedCart(userId);
  const { 
    discountedItems, 
    totalDiscount, 
    totalDiscountWon, 
    groupSize, 
    maxGroupSize, 
    currentDiscountPercentage 
  } = useGroupDiscount(cartId, userId);

  const cart = userCarts.find(cart => cart.id === cartId);

  if (!cart) {
    return <div>Cart not found</div>;
  }

  const sortedItems = [...cart.items].sort((a, b) => ((b.votes || 0) - (a.votes || 0)));

  // Helper function to safely format numbers
  const safeToFixed = (number, decimalPlaces) => {
    return number !== undefined && number !== null
      ? Number(number).toFixed(decimalPlaces)
      : 'N/A';
  };

  return (
    <div className={styles.cartView}>
      <h2 className={styles.cartName}>{cart.name}</h2>
      <p className={styles.cartTheme}>Theme: {cart.theme || 'No theme'}</p>
      
      <GroupDiscountProgressBar 
        groupSize={groupSize}
        maxGroupSize={maxGroupSize}
        currentDiscountPercentage={currentDiscountPercentage}
        totalDiscount={totalDiscount}
        totalDiscountWon={totalDiscountWon}
      />

      <ul className={styles.itemList}>
        {sortedItems.map(item => {
          const discountedItem = discountedItems.find(di => di.id === item.id);
          return (
            <li key={item.id} className={styles.itemCard}>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>
                  ${safeToFixed(item.price, 2)} / ₩{safeToFixed(item.price_won, 0)}
                  {discountedItem && (
                    <span className={styles.discountedPrice}>
                      {' → '}
                      ${safeToFixed(discountedItem.discountedPrice, 2)} / ₩{safeToFixed(discountedItem.discountedPriceWon, 0)}
                    </span>
                  )}
                </p>
                {discountedItem && (
                  <p className={styles.discountPercentage}>
                    Discount: {safeToFixed(discountedItem.discountPercentage * 100, 0)}%
                    (${safeToFixed(discountedItem.discountAmount, 2)} / ₩{safeToFixed(discountedItem.discountAmountWon, 0)})
                  </p>
                )}
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
          );
        })}
      </ul>
    </div>
  );
};

export default CartView;