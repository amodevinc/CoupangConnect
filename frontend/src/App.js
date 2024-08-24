import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ProductGallery } from './components/ProductGallery';
import { ProductDetails } from './components/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>CoupangConnect</h1>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<ProductGallery />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
