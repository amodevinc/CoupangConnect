import React from 'react';
import styles from '../css/GroupDiscountSummary.module.css';
import { useUnifiedCart } from '../hooks/useUnifiedCart';

const GroupDiscountSummary = ({ cartId, userId }) => {
  const { 
    discountedItems, 
    totalDiscount, 
    totalDiscountWon, 
    groupSize, 
    maxGroupSize,
    currentDiscountPercentage,
    loading,
    error
  } = useUnifiedCart(cartId, userId);

  if (loading) return <div>Loading discount summary...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Helper function to safely format numbers
  const safeToFixed = (number, decimalPlaces) => {
    return number !== undefined && number !== null
      ? Number(number).toFixed(decimalPlaces)
      : 'N/A';
  };

  return (
    <div className={styles.summary}>
      <h3>Group Discount Summary</h3>
      <p>Group Size: {groupSize} / {maxGroupSize}</p>
      <p>Current Discount: {safeToFixed(currentDiscountPercentage * 100, 0)}%</p>
      <p>Total Discount: ${safeToFixed(totalDiscount, 2)} / ₩{safeToFixed(totalDiscountWon, 0)}</p>
      <ul className={styles.discountedItems}>
        {discountedItems.map(item => (
          <li key={item.id} className={styles.discountedItem}>
            <span>{item.name}</span>
            <span>Discount: {safeToFixed(item.discountPercentage * 100, 0)}%</span>
            <span>Savings: ${safeToFixed(item.discountAmount, 2)} / ₩{safeToFixed(item.discountAmountWon, 0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupDiscountSummary;