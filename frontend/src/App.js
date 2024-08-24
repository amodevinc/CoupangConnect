import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';
import { ReactComponent as LogoSVG } from './coupang_connect/coupang_connect_logo_small.svg';

// Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import CartsScreen from './screens/CartsScreen';
import PaymentScreen from './screens/PaymentScreen';

// Components
import CreateCart from './CartCreate';
import PaymentSuccess from './PaymentSuccess';
import SelectItems from './CartSelectItems';
import Loading from './Loading';
import ShareCart from './CartShare';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/" element={
        <PrivateRoute>
          <HomeScreen userId={user?.uid}/>
        </PrivateRoute>
      } />
      <Route path="/create-cart" element={
        <PrivateRoute>
          <CreateCart userId={user?.uid}/>
        </PrivateRoute>
      } />
      <Route path="/payment-success" element={
        <PrivateRoute>
          <PaymentSuccess />
        </PrivateRoute>
      } />
      <Route path="/select-items" element={
        <PrivateRoute>
          <SelectItems />
        </PrivateRoute>
      } />
      <Route path="/loading" element={<Loading />} />
      <Route path="/share-cart" element={
        <PrivateRoute>
          <ShareCart />
        </PrivateRoute>
      } />
      <Route path="/cart/:cartId" element={
        <PrivateRoute>
          <CartScreen userId={user?.uid}/>
        </PrivateRoute>
      } />
      <Route path="/carts" element={
        <PrivateRoute>
          <CartsScreen userId={user?.uid}/>
        </PrivateRoute>
      } />
      <Route path="/payment/:cartId" element={
        <PrivateRoute>
          <PaymentScreen />
        </PrivateRoute>
      } />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <main>
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;