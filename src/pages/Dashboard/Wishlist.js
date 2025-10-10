import React, { useState, useEffect } from 'react';
import { userAPI, productsAPI } from '../../api/api';
import { FaHeart, FaShoppingCart, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await userAPI.getWishlist();
      setWishlist(response.data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setMessage('Error loading wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await userAPI.removeFromWishlist(productId);
      setWishlist(wishlist.filter(item => item.product._id !== productId));
      setMessage('Product removed from wishlist');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setMessage('Error removing product from wishlist');
    }
  };

  const addToCart = (product) => {
    // Implement add to cart functionality here
    setMessage(`Added ${product.name} to cart`);
    setTimeout(() => setMessage(''), 3000);
  };

  const moveAllToCart = () => {
    // Implement move all to cart functionality
    setMessage('All items moved to cart');
    setTimeout(() => setMessage(''), 3000);
  };

  const clearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        // Remove each item individually
        for (const item of wishlist) {
          await userAPI.removeFromWishlist(item.product._id);
        }
        setWishlist([]);
        setMessage('Wishlist cleared successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error clearing wishlist:', error);
        setMessage('Error clearing wishlist');
      }
    }
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">My Wishlist</h2>
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading your wishlist...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">My Wishlist</h2>
            <div className="d-flex gap-2">
              {wishlist.length > 0 && (
                <>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={moveAllToCart}
                  >
                    <FaShoppingCart className="me-1" />
                    Move All to Cart
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={clearWishlist}
                  >
                    <FaTrash className="me-1" />
                    Clear Wishlist
                  </button>
                </>
              )}
            </div>
          </div>

          {message && (
            <div className={`alert ${
              message.includes('Error') ? 'alert-danger' : 'alert-success'
            } alert-dismissible fade show`}>
              {message}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setMessage('')}
              ></button>
            </div>
          )}

          {wishlist.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <FaHeart size={64} className="text-muted" />
              </div>
              <h4>Your wishlist is empty</h4>
              <p className="text-muted mb-4">
                Start adding your favorite products to your wishlist!
              </p>
              <Link to="/shop" className="btn btn-primary">
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className="row mb-3">
                <div className="col-12">
                  <p className="text-muted">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in wishlist
                  </p>
                </div>
              </div>

              <div className="row">
                {wishlist.map((item) => (
                  <div key={item.product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="position-relative">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="card-img-top"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <button
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                          onClick={() => removeFromWishlist(item.product._id)}
                          title="Remove from wishlist"
                        >
                          <FaHeart />
                        </button>
                      </div>
                      
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title">{item.product.name}</h6>
                        <p className="card-text text-muted small mb-2">
                          {item.product.category}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="h6 text-primary mb-0">
                            ${item.product.price}
                          </span>
                          <span className={`badge ${
                            item.product.availability ? 'bg-success' : 'bg-danger'
                          }`}>
                            {item.product.availability ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                        
                        <div className="mt-auto d-flex gap-2">
                          <Link 
                            to={`/product/${item.product._id}`}
                            className="btn btn-outline-primary btn-sm flex-fill"
                          >
                            <FaEye className="me-1" />
                            View
                          </Link>
                          <button
                            className="btn btn-primary btn-sm flex-fill"
                            onClick={() => addToCart(item.product)}
                            disabled={!item.product.availability}
                          >
                            <FaShoppingCart className="me-1" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      
                      <div className="card-footer bg-transparent">
                        <small className="text-muted">
                          Added on {new Date(item.addedAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;