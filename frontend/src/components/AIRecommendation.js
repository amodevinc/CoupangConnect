// src/components/AIRecommendation.js
import React, { useState, useEffect } from 'react';
import styles from '../css/AIRecommendation.module.css';

const AIRecommendation = ({ summary }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < summary.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + summary[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 30); // Adjust the speed of the animation here

      return () => clearTimeout(timer);
    }
  }, [summary, currentIndex]);

  return (
    <div className={styles.aiRecommendation}>
      <p>{displayedText}</p>
    </div>
  );
};

export default AIRecommendation;