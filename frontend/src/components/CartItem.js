import React from 'react';
import styles from '../css/CartItem.module.css';

const CartItem = ({ item, selectAll, removeItemFromCart, updateItemQuantity, voteOnItem, userId, isDiscounted }) => {

    console.info(`ITEM IN CART ITEM ${JSON.stringify(item)}`)
  const handleQuantityChange = (newQuantity) => {
    updateItemQuantity(item.id, newQuantity);
  };

  const handleVote = (voteType) => {
    voteOnItem(item.id, voteType);
  };

  const votes = item.votes || {};
  const userVote = votes[userId];
  const likeCount = votes.likeCount || 0;
  const disagreeCount = votes.disagreeCount || 0;

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemHeader}>
        <input type="checkbox" checked={selectAll} readOnly className={styles.checkbox} />
        <button className={styles.removeButton} onClick={() => removeItemFromCart(item.id)}>
          ×
        </button>
      </div>
      <div className={styles.itemContent}>
        <img src={item.image_url} alt={item.name} className={styles.itemImage} />
        <div className={styles.itemDetails}>
          <div className={styles.itemName}>{item.name}</div>
          <div className={styles.itemPriceContainer}>
            {isDiscounted && <span className={styles.discountPercentage}>3%</span>}
            <div className={styles.itemPrice}>
              {isDiscounted && <span className={styles.originalPrice}>{item.totalPriceWon.toLocaleString()}원</span>}
              <span className={styles.discountedPrice}>{(isDiscounted ? item.totalDiscountedPriceWon : item.price_won).toLocaleString()}원</span>
            </div>
            {isDiscounted && <span className={styles.dynamicDiscount}>⚡Dynamic Discount!</span>}
          </div>
          {item.addedBy && (
            <div className={styles.addedBy}>
              <img src={item.addedBy.avatar} alt={item.addedBy.name} className={styles.addedByAvatar} />
              <span>{item.addedBy.name} added it</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.itemActions}>
        <div className={styles.quantityControl}>
          <button onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
        </div>
        <div className={styles.voteButtons}>
          <button 
            onClick={() => handleVote('disagree')} 
            className={`${styles.voteButton} ${styles.disagreeButton} ${userVote === 'disagree' ? styles.active : ''}`}
          >
            👎 {disagreeCount} Disagree
          </button>
          <button 
            onClick={() => handleVote('like')} 
            className={`${styles.voteButton} ${styles.likeButton} ${userVote === 'like' ? styles.active : ''}`}
          >
            👍 {likeCount} I like it
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;