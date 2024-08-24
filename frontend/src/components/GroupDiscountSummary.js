import React from 'react';
import { useGroupDiscount } from '../hooks/useGroupDiscount';
import styles from '../css/GroupDiscountSummary.module.css';

const GroupDiscountSummary = ({ cartId, userId }) => {
  const { discountedItems, totalDiscount, totalDiscountWon, groupSize } = useGroupDiscount(cartId, userId);

  return (
    <div className={styles.summary}>
      <h3>Group Discount Summary</h3>
      <p>Group Size: {groupSize}</p>
      <p>Total Discount: ${totalDiscount.toFixed(2)} / ₩{totalDiscountWon.toFixed(0)}</p>
      <ul className={styles.discountedItems}>
        {discountedItems.map(item => (
          <li key={item.id} className={styles.discountedItem}>
            <span>{item.name}</span>
            <span>Discount: {(item.discountPercentage * 100).toFixed(0)}%</span>
            <span>Savings: ${item.discountAmount.toFixed(2)} / ₩{item.discountAmountWon.toFixed(0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupDiscountSummary;