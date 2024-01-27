// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartSumContext = createContext();

// Create a provider component
const CartSumProvider = ({ children }) => {
  // cartSum --> kasutab NavigationBar
  // setCartSum --> muudab ainult Cart ja Homepage
  const [cartSum, setCartSum] = useState(calculateCartSum());

  function calculateCartSum() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let amount = 0;
    cart.forEach(product => amount = amount + product.toode.price * product.kogus)
    return amount.toFixed(2);
  }

  return (
    <CartSumContext.Provider value={{ cartSum, setCartSum }}>
      {children}
    </CartSumContext.Provider>
  );
};

// Create a custom hook to consume the context
const useCartSum = () => {
  const context = useContext(CartSumContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { CartSumProvider, useCartSum };