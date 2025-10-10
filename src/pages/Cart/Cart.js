import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  if (cart.length === 0) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center py-5">
          <h2>Your cart is empty</h2>
          <Link to="/menu" className="btn btn-primary mt-3">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item, index) => {
            // Handle both backend and local storage cart items
            const productId = item.product?._id || item.product;
            const productName = item.product?.name || 'Product';
            const productPrice = item.product?.price || 0;
            const productImage = item.product?.images?.[0] || item.image || '/placeholder-image.jpg';
            
            return (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <img 
                        src={productImage} 
                        alt={productName} 
                        className="img-fluid rounded"
                        style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                      />
                    </div>
                    <div className="col-md-5">
                      <h5 className="card-title">{productName}</h5>
                      <p className="card-text mb-1">${productPrice.toFixed(2)}</p>
                      <small className="text-muted">Each</small>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold">Qty: {item.qty}</span>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(productId)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="fw-bold">
                          ${(productPrice * item.qty).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <div className="card sticky-top" style={{ top: '100px' }}>
            <div className="card-body">
              <h5 className="card-title border-bottom pb-3">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (7%):</span>
                <span>${(getCartTotal() * 0.07).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 fw-bold border-top pt-2">
                <span>Total:</span>
                <span>${(getCartTotal() * 1.07).toFixed(2)}</span>
              </div>
              
              {user ? (
                <Link to="/checkout" className="btn btn-primary w-100 mb-2">
                  Proceed to Checkout
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary w-100 mb-2">
                  Login to Checkout
                </Link>
              )}
              
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;