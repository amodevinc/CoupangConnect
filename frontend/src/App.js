import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './screens/HomeScreen';
import CartPage from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import styles from './css/App.module.css';
import { useUnifiedCart } from './hooks/useUnifiedCart';

// CartLink component to handle cart navigation and setting active cart ID
const CartLink = ({ cart, setActiveCartId }) => {
  const navigate = useNavigate(); // This will work now since CartLink is within Router

  const handleCartClick = () => {
    console.log('Cart id: ', cart.id)
    setActiveCartId(cart.id); // Set the active cart ID
    navigate(`/cart/${cart.id}`); // Navigate to the cart page
  };

  return (
    <button className={styles.navLink} onClick={handleCartClick}>
      {cart.name}
    </button>
  );
};

const App = () => {
  const userId = 'current-user-id'; // Replace with actual user ID from your auth system
  const { userCarts, setActiveCartId } = useUnifiedCart(userId);

  return (
    <Router>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Carts</button>
            <div className={styles.dropdownContent}>
              <Link to="/cart/individual" className={styles.navLink}>Individual Cart</Link>
              {userCarts.map(cart => (
                <CartLink
                  key={cart.id}
                  cart={cart}
                  setActiveCartId={setActiveCartId}
                />
              ))}
            </div>
          </div>
          {userId ? (
            <Link to="/profile" className={styles.navLink}>Profile</Link>
          ) : (
            <Link to="/login" className={styles.navLink}>Login</Link>
          )}
        </nav>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home userId={userId} />} />
            <Route path="/cart/:cartId" element={<CartPage userId={userId} />} />
            <Route path="/payment/:cartId" element={<PaymentScreen userId={userId} />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
