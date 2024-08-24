import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* Pages */
import Transition from './Transition.js';
import CreateCart from './CartCreate.js';
import SelectItems from './CartSelectItems.js';
import ShareCart from './CartShare.js';
import PaymentSuccess from './PaymentSuccess.js';
import Loading from './Loading.js';

function App() {
  /*
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000) // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, []);
  */
  return (
    /*<div className="App">
      {isLoading ? <Transition/> : <PaymentSuccess/>}
    </div>*/
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Transition />} />
      <Route exact path="/create-cart" element={<CreateCart />} />
      <Route exact path="/payment-success" element={<PaymentSuccess />} />
      <Route exact path="/select-items" element={<SelectItems />} />
      <Route exact path="/loading" element={<Loading />} />
      <Route exact path="/share-cart" element={<ShareCart />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;