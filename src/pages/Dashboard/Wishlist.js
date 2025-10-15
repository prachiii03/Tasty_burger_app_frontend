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
      console.log('Wishlist response:', response.data); // Debug log
      
      // Handle the new structure - direct array of products
      const wishlistData = response.data.data || response.data || [];
      console.log('Processed wishlist data:', wishlistData);
      
      setWishlist(wishlistData);
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
      setWishlist(wishlist.filter(product => product._id !== productId));
      setMessage('Product removed from wishlist');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setMessage('Error removing product from wishlist');
    }
  };

  const addToCart = (product) => {
    if (!product) {
      setMessage('Error: Product data is missing');
      return;
    }
    setMessage(`Added ${product.name} to cart`);
    setTimeout(() => setMessage(''), 3000);
  };

  const moveAllToCart = () => {
    setMessage('All items moved to cart');
    setTimeout(() => setMessage(''), 3000);
  };

  const clearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        // Remove each item individually
        for (const product of wishlist) {
          await userAPI.removeFromWishlist(product._id);
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

  // Safe image URL construction
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    if (imagePath.startsWith('http')) return imagePath;
    
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    if (imagePath.startsWith('/uploads/')) {
      return `${baseUrl}${imagePath}`;
    } else if (imagePath.startsWith('uploads/')) {
      return `${baseUrl}/${imagePath}`;
    } else if (!imagePath.includes('/')) {
      return `${baseUrl}/uploads/${imagePath}`;
    }
    
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
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
              <Link to="/menu" className="btn btn-primary">
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
                {wishlist.map((product) => {
                  // Safe data extraction with fallbacks
                  const productId = product?._id;
                  const productName = product?.name || 'Unknown Product';
                  const productPrice = product?.price || 0;
                  const productCategory = product?.category || 'Uncategorized';
                  const productDescription = product?.description || '';
                  const productAvailability = product?.availability !== false;
                  
                  // Handle images safely
                  const productImage = product?.images?.[0];
                  const imageUrl = getImageUrl(productImage);

                  if (!productId) {
                    console.warn('Skipping wishlist item with missing product ID:', product);
                    return null;
                  }

                  return (
                    <div key={productId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                      <div className="card h-100 shadow-sm">
                        <div className="position-relative" style={{ height: '200px' }}>
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={productName}
                              className="card-img-top h-100"
                              style={{ objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          
                          {/* Fallback when image fails or doesn't exist */}
                          <div 
                            className="card-img-top h-100 w-100 d-flex align-items-center justify-content-center bg-light"
                            style={{ 
                              display: imageUrl ? 'none' : 'flex',
                              objectFit: 'cover'
                            }}
                          >
                            <div className="text-center text-muted">
                              <FaHeart size={32} />
                              <div className="small mt-2">No Image</div>
                            </div>
                          </div>
                          
                          <button
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                            onClick={() => removeFromWishlist(productId)}
                            title="Remove from wishlist"
                          >
                            <FaHeart />
                          </button>
                        </div>
                        
                        <div className="card-body d-flex flex-column">
                          <h6 className="card-title">{productName}</h6>
                          <p className="card-text text-muted small mb-2">
                            {productCategory}
                          </p>
                          <p className="card-text small text-muted mb-3">
                            {productDescription.length > 100 
                              ? `${productDescription.substring(0, 100)}...` 
                              : productDescription
                            }
                          </p>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="h6 text-primary mb-0">
                              ${typeof productPrice === 'number' ? productPrice.toFixed(2) : '0.00'}
                            </span>
                            <span className={`badge ${
                              productAvailability ? 'bg-success' : 'bg-danger'
                            }`}>
                              {productAvailability ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                          
                          <div className="mt-auto d-flex gap-2">
                            <Link 
                              to={`/product/${productId}`}
                              className="btn btn-outline-primary btn-sm flex-fill"
                            >
                              <FaEye className="me-1" />
                              View
                            </Link>
                            <button
                              className="btn btn-primary btn-sm flex-fill"
                              onClick={() => addToCart(product)}
                              disabled={!productAvailability}
                            >
                              <FaShoppingCart className="me-1" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                        
                        <div className="card-footer bg-transparent">
                          <small className="text-muted">
                            Rating: {product?.rating || 'Not rated'}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                }).filter(Boolean) /* Remove any null items */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;