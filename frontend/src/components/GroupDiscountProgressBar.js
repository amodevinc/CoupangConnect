import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../css/GroupDiscountProgressBar.module.css';

const GroupDiscountProgressBar = ({ 
  groupSize, 
  maxGroupSize, 
  currentDiscountPercentage, 
  totalDiscount,
  totalDiscountWon
}) => {
  const [prevGroupSize, setPrevGroupSize] = useState(groupSize);

  useEffect(() => {
    setPrevGroupSize(groupSize);
  }, [groupSize]);

  const progress = (Math.min(groupSize, maxGroupSize) - 1) / (maxGroupSize - 1);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Group Discount Progress</h3>
      
      <div className={styles.progressSection}>
        <div className={styles.labelContainer}>
          <span className={`${styles.highlight} ${styles.groupSizeHighlight}`}>
            {groupSize} / {maxGroupSize} members
          </span>
          <span className={styles.label}>
            {(currentDiscountPercentage * 100).toFixed(0)}% of max discount
          </span>
        </div>
        <div className={styles.progressBarContainer}>
          <motion.div
            className={`${styles.progressBar} ${styles.groupProgressBar}`}
            style={{ width: `${progress * 100}%` }}
            initial={{ width: `${((Math.min(prevGroupSize, maxGroupSize) - 1) / (maxGroupSize - 1)) * 100}%` }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className={styles.groupSizeLabel}>
          <span>1 person</span>
          <span>{maxGroupSize} people</span>
        </div>
      </div>
      
      <div className={styles.discountInfo}>
        <p>Current Discount: ${totalDiscount.toFixed(2)} / ₩{totalDiscountWon.toFixed(0)}</p>
        <p>Discount Percentage: {(currentDiscountPercentage * 100).toFixed(0)}%</p>
      </div>
    </div>
  );
};

export default GroupDiscountProgressBar;