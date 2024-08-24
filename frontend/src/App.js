import React, { useEffect, useState } from 'react';
import './App.css';
import Transition from './Transition.js';
import CreateCart from './CreateCart.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000) // 5000 milliseconds = 5 seconds
  }, []); 

  return (
    <div className="App">
      {isLoading ? <Transition/> : <CreateCart/>}
    </div>
  )
}

export default App;