import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './screens/HomeScreen';
import CartPage from './screens/CartScreen';
import styles from './css/App.module.css';
import { useUnifiedCart } from './hooks/useUnifiedCart';

const App = () => {
  const userId = 'current-user-id'; // Replace with actual user ID from your auth system
  const { userCarts } = useUnifiedCart(userId);

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
                <Link 
                  key={cart.id} 
                  to={`/cart/${cart.id}`} 
                  className={styles.navLink}
                >
                  {cart.name}
                </Link>
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
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};