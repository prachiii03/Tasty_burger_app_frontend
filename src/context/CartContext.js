import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartAPI } from '../api/api';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user?.token) {
        try {
          setLoading(true);
          const response = await cartAPI.getCart();
          setCart(response.data?.data || response.data || []);
        } catch (error) {
          console.error('Error loading cart:', error);
          // Fallback to local storage
          const localCart = localStorage.getItem('guestCart');
          setCart(localCart ? JSON.parse(localCart) : []);
        } finally {
          setLoading(false);
        }
      } else {
        // Load guest cart from localStorage
        const localCart = localStorage.getItem('guestCart');
        setCart(localCart ? JSON.parse(localCart) : []);
      }
    };

    loadCart();
  }, [user]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (!user && cart.length > 0) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = async (product, quantity = 1) => {
    try {
      if (user?.token) {
        // Logged-in user
        await cartAPI.addToCart({
          productId: product._id || product,
          quantity: quantity
        });
        
        // Reload cart from server
        const response = await cartAPI.getCart();
        setCart(response.data?.data || response.data || []);
      } else {
        // Guest user
        setCart(prevCart => {
          const productId = product._id || product;
          const existingItem = prevCart.find(item => 
            item.product?._id === productId || item.product === productId
          );
          
          if (existingItem) {
            return prevCart.map(item =>
              item.product?._id === productId || item.product === productId
                ? { ...item, quantity: (item.quantity || 0) + quantity }
                : item
            );
          }
          
          return [...prevCart, { 
            product: product._id || product, 
            quantity,
            productDetails: typeof product === 'object' ? product : null
          }];
        });
      }
      
      toast.success('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (user?.token) {
        await cartAPI.removeFromCart({ productId });
        const response = await cartAPI.getCart();
        setCart(response.data?.data || response.data || []);
      } else {
        setCart(prevCart => 
          prevCart.filter(item => 
            item.product?._id !== productId && item.product !== productId
          )
        );
      }
      
      toast.success('Product removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove product from cart');
    }
  };

  const clearCart = async () => {
    try {
      if (user?.token) {
        await cartAPI.clearCart();
      }
      setCart([]);
      localStorage.removeItem('guestCart');
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || item.qty || 0), 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || item.productDetails?.price || 0;
      const quantity = item.quantity || item.qty || 0;
      return total + (price * quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading,
      addToCart, 
      removeFromCart, 
      clearCart,
      getCartCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};