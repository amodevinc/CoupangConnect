import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/PaymentScreen.module.css';

const PaymentScreen = ({
    activeCart,
    regularItems,
    discountedItems,
    cartCalculations,
    groupSize,
    maxGroupSize,
    currentDiscountPercentage,
    completeCart,
    onBack
  }) => {
    const navigate = useNavigate();
    const [paymentOption, setPaymentOption] = useState('split');
    const [paymentMethod, setPaymentMethod] = useState('coupay');
    const [isProcessing, setIsProcessing] = useState(false);
  
    console.log(`Cart Calculations: ${JSON.stringify(cartCalculations, null, 2)}`)
    const splitAmountWon = cartCalculations.totalWon / groupSize;


  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayNow = async () => {
    setIsProcessing(true);
    try {
      // Here you would integrate with your payment gateway
      await new Promise(resolve => setTimeout(resolve, 2000));
      await completeCart();
      navigate(`/payment-success`);
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment failure (show error message, etc.)
    } finally {
      setIsProcessing(false);
    }
  };
// Helper function to safely format numbers
const safeToFixed = (number, decimalPlaces) => {
    return number !== undefined && number !== null && !isNaN(number)
      ? Number(number).toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : '0';
  };

  if (!activeCart) return <div>Cart not found</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleBackClick} className={styles.backButton}>
          &lt;
        </button>
        <h1 className={styles.title}>Order/Payment</h1>
      </header>

      <div className={styles.paymentSection}>
        <h2 className={styles.sectionTitle}>Payer</h2>
        <div className={styles.paymentOptions}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="paymentOption"
              value="split"
              checked={paymentOption === 'split'}
              onChange={() => handlePaymentOptionChange('split')}
              className={styles.radioInput}
            />
            <span className={styles.radioText}>
              Pay split: {safeToFixed(splitAmountWon, 0)} won per person, {groupSize} people
            </span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="paymentOption"
              value="myself"
              checked={paymentOption === 'myself'}
              onChange={() => handlePaymentOptionChange('myself')}
              className={styles.radioInput}
            />
            <span className={styles.radioText}>Pay by myself</span>
          </label>
        </div>
      </div>

      <div className={styles.paymentMethod}>
        <h2 className={styles.sectionTitle}>Payment method</h2>
        <div className={styles.methodSelect} onClick={() => handlePaymentMethodChange('coupay')}>
          <span>Coupay money</span>
        </div>
      </div>

      <div className={styles.deliverySection}>
        <h2 className={styles.sectionTitle}>Delivery</h2>
        <div className={styles.deliveryInfo}>
          <div>
            <p>{activeCart.deliveryAddress || 'No address set'}</p>
            <p>{activeCart.deliveryPhone || 'No phone number set'}</p>
          </div>
        </div>
      </div>

      <div className={styles.orderItems}>
        {discountedItems.length > 0 && (
          <>
            {discountedItems.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <img src={item.image_url || "/api/placeholder/60/60"} alt={item.name} className={styles.productImage} />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.discount}>{safeToFixed(item.discountPercentage * 100, 0)}% off</p>
                  <p className={styles.price}>{safeToFixed(item.discountedPriceWon, 0)}원</p>
                  <p className={styles.originalPrice}>{safeToFixed(item.price_won, 0)}원</p>
                  <p className={styles.quantity}>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {regularItems.length > 0 && (
          <>
            <h3 className={styles.sectionTitle}>Regular Items</h3>
            {regularItems.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <img src={item.image_url || "/api/placeholder/60/60"} alt={item.name} className={styles.productImage} />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.price}>{safeToFixed(item.price_won, 0)}원</p>
                  <p className={styles.quantity}>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* <div className={styles.totalSection}>
        <p>Regular Items Subtotal: {safeToFixed(cartCalculations.regularSubtotalWon, 0)} won</p>
        <p>Discounted Items Subtotal: {safeToFixed(cartCalculations.discountedSubtotalWon, 0)} won</p>
        <p>Total Discount: {safeToFixed(cartCalculations.totalDiscountWon, 0)} won</p>
        <p>Total Amount: {safeToFixed(cartCalculations.totalWon, 0)} won</p>
        <p>Group Discount: {safeToFixed(currentDiscountPercentage * 100, 0)}%</p>
        <p>Group Size: {groupSize} / {maxGroupSize}</p>
      </div> */}

      <button 
        className={styles.payNowButton} 
        onClick={handlePayNow}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentScreen;