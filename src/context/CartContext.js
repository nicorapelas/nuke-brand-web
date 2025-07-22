import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../utils/api';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, loading: false };
    case 'ADD_TO_CART':
      return { ...state, items: action.payload, loading: false };
    case 'UPDATE_CART_ITEM':
      return { ...state, items: action.payload, loading: false };
    case 'REMOVE_FROM_CART':
      return { ...state, items: action.payload, loading: false };
    case 'CLEAR_CART':
      return { ...state, items: [], loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: false
  });

  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.get('/cart')
      dispatch({ type: 'SET_CART', payload: response.data })
    } catch (error) {
      // Silently handle cart fetch errors
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.post('/cart/add', { productId, quantity })
      dispatch({ type: 'ADD_TO_CART', payload: response.data.cart })
    } catch (error) {
      // Silently handle add to cart errors
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const updateCartItem = async (itemId, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.put(`/cart/${itemId}`, { quantity })
      dispatch({ type: 'UPDATE_CART_ITEM', payload: response.data.cart })
    } catch (error) {
      // Silently handle update cart errors
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.delete(`/cart/${itemId}`)
      dispatch({ type: 'REMOVE_FROM_CART', payload: response.data.cart })
    } catch (error) {
      // Silently handle remove from cart errors
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await api.delete('/cart')
      dispatch({ type: 'CLEAR_CART', payload: [] })
    } catch (error) {
      // Silently handle clear cart errors
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 