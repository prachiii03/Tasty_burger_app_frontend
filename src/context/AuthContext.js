import React, { createContext, useState, useEffect } from "react";
import { authAPI, setAuthToken } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData || userData === "undefined") return null;
      const parsedUser = JSON.parse(userData);
      
      // ✅ CRITICAL: Set auth token immediately when initializing state
      if (parsedUser?.token) {
        setAuthToken(parsedUser.token);
      }
      
      return parsedUser;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      localStorage.removeItem("user"); // ✅ Clean up bad data
      return null;
    }
  });

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // ✅ Sync localStorage with user state
  useEffect(() => {
    if (user?.token) {
      localStorage.setItem("user", JSON.stringify(user));
      setAuthToken(user.token); // ✅ Ensure token is set
      loadWishlist();
    } else {
      localStorage.removeItem("user");
      setWishlist([]);
      setAuthToken(null);
    }
  }, [user]);

  // Load user's wishlist
  const loadWishlist = async () => {
    if (!user?.token) {
      setWishlist([]);
      return;
    }
    
    try {
      setWishlistLoading(true);
      const response = await authAPI.get('/user/wishlist');
      setWishlist(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error loading wishlist:", error);
      setWishlist([]);
    } finally {
      setWishlistLoading(false);
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => 
      item._id === productId || 
      item.product?._id === productId ||
      item.productId === productId
    );
  };

  // Add to wishlist
  const addToWishlist = async (productId) => {
    if (!user?.token) {
      throw new Error("Please login to add items to wishlist");
    }

    try {
      setWishlistLoading(true);
      await authAPI.post('/user/wishlist', { productId });
      await loadWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw new Error(error.response?.data?.message || "Failed to add to wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!user?.token) {
      throw new Error("Please login to manage wishlist");
    }

    try {
      setWishlistLoading(true);
      await authAPI.delete(`/user/wishlist/${productId}`);
      await loadWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw new Error(error.response?.data?.message || "Failed to remove from wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  // Toggle wishlist item
  const toggleWishlist = async (productId) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data?.user?.token) {
        const userData = response.data.user;
        setAuthToken(userData.token);
        setUser(userData);
        return userData;
      } else if (response.data?.token) {
        const userData = { ...response.data, token: response.data.token };
        setAuthToken(userData.token);
        setUser(userData);
        return userData;
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Login failed";
      throw new Error(errorMessage);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      
      if (response.data?.user?.token) {
        const userData = response.data.user;
        setAuthToken(userData.token);
        setUser(userData);
        return userData;
      } else if (response.data?.token) {
        const userData = { ...response.data, token: response.data.token };
        setAuthToken(userData.token);
        setUser(userData);
        return userData;
      } else {
        throw new Error("Invalid registration response");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Registration failed";
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setWishlist([]);
    localStorage.removeItem("user");
    setAuthToken(null);
  };

  const value = {
    // Auth
    user,
    login,
    register,
    logout,
    
    // Wishlist
    wishlist,
    wishlistLoading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    loadWishlist,
    
    // Helper states
    isAuthenticated: !!user?.token,
    userRole: user?.role || 'user'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};