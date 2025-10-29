import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import API, { phonepeAPI } from '../../api/api';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [isAuthenticated, navigate]);

  // Update form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !loading) {
      const timer = setTimeout(() => {
        navigate('/products');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cart.length, loading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setMessage({ type: 'error', text: 'Full name is required' });
      return false;
    }
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Email is required' });
      return false;
    }
    if (!formData.address.trim()) {
      setMessage({ type: 'error', text: 'Address is required' });
      return false;
    }
    if (!formData.city.trim()) {
      setMessage({ type: 'error', text: 'City is required' });
      return false;
    }
    if (!formData.pincode.trim()) {
      setMessage({ type: 'error', text: 'Pincode is required' });
      return false;
    }
    if (formData.pincode.length < 5 || formData.pincode.length > 6) {
      setMessage({ type: 'error', text: 'Invalid pincode' });
      return false;
    }
    if (!formData.phone.trim()) {
      setMessage({ type: 'error', text: 'Phone number is required' });
      return false;
    }
    if (formData.phone.length < 10) {
      setMessage({ type: 'error', text: 'Invalid phone number' });
      return false;
    }
    return true;
  };

  const initiatePhonePePayment = async (order) => {
    try {
      const paymentData = {
        orderId: order._id,
        amount: order.totalPrice,
        mobile: formData.phone,
        name: formData.fullName
      };

      console.log('🔄 Initiating PhonePe payment:', paymentData);

      const response = await phonepeAPI.createPayment(paymentData);
      
      console.log('✅ PhonePe response:', response.data);

      if (response.data.success && response.data.data.instrumentResponse.redirectInfo.url) {
        // Redirect to PhonePe payment page
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
      } else {
        throw new Error('Failed to initiate payment - no redirect URL');
      }
    } catch (error) {
      console.error('❌ PhonePe payment error:', error);
      throw new Error(error.response?.data?.message || 'Payment initiation failed');
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation checks
    if (!user || !user._id) {
      setMessage({ type: 'error', text: 'Please login to place your order.' });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (cart.length === 0) {
      setMessage({ type: 'error', text: 'Your cart is empty!' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare order data matching backend structure - FIXED: Use shippingAddress
      const orderData = {
        items: cart.map((item) => ({
          product: item.product?._id || item.product,
          quantity: item.qty || 1,
          price: item.product?.price || 0
        })),
        totalAmount: parseFloat((getCartTotal() * 1.07).toFixed(2)),
        shippingDetails: { // This will be mapped to shippingAddress in backend
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          pincode: formData.pincode.trim(),
          phone: formData.phone.trim()
        },
        paymentMethod: paymentMethod
      };

      console.log('📦 Sending order data:', orderData);

      // Create order first
      const orderResponse = await API.post('/orders', orderData);
      const order = orderResponse.data.data;
      
      console.log('✅ Order created:', order._id);

      if (paymentMethod === 'PHONEPE') {
        // Initiate PhonePe payment
        await initiatePhonePePayment(order);
      } else {
        // For COD, clear cart and redirect to success page
        clearCart();
        setMessage({ 
          type: 'success', 
          text: 'Order placed successfully! Redirecting...' 
        });
        
        setTimeout(() => {
          navigate('/orders');
        }, 2000);
      }
      
    } catch (error) {
      console.error('❌ Order Error:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = 'Something went wrong while placing the order.';
      
      if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please login again.';
        setTimeout(() => navigate('/login'), 2000);
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || error.response.data?.errors?.join(', ') || 'Invalid order data';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Show loading if no user
  if (!user) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Show empty cart message
  if (cart.length === 0) {
    return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-info text-center">
          <h4>Your cart is empty!</h4>
          <p>Add some delicious items to your cart before checkout.</p>
          <Link to="/products" className="btn btn-primary mt-3">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-0">Checkout</h2>
          <p className="text-muted">Complete your order</p>
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
          {message.text}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMessage({ type: '', text: '' })}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="row">
        {/* Shipping Form */}
        <div className="col-md-7 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Shipping Details</h5>
              <form onSubmit={handleOrder}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    readOnly
                  />
                  <small className="text-muted">Email cannot be changed</small>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address, apartment, suite, etc."
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="pincode" className="form-label">
                      Pincode <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      className="form-control"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="123456"
                      maxLength="6"
                      pattern="[0-9]{5,6}"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                {/* Payment Method Selection */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Payment Method</label>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="phonepe"
                      value="PHONEPE"
                      checked={paymentMethod === 'PHONEPE'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="phonepe">
                      Pay with PhonePe
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2" 
                  disabled={loading || cart.length === 0}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {paymentMethod === 'PHONEPE' ? 'Redirecting to Payment...' : 'Placing Order...'}
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      {paymentMethod === 'PHONEPE' ? 'Pay with PhonePe' : 'Place Order'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
            <div className="card-body">
              <h5 className="card-title border-bottom pb-3 mb-3">Order Summary</h5>
              
              {/* Cart Items */}
              <div className="mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cart.map((item, index) => {
                  const productName = item.product?.name || 'Product';
                  const productPrice = item.product?.price || 0;
                  const productImage = item.product?.images?.[0] || item.product?.image;
                  
                  return (
                    <div key={index} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                      {productImage && (
                        <img 
                          src={productImage} 
                          alt={productName}
                          className="rounded me-3"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      )}
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{productName}</h6>
                        <small className="text-muted">Quantity: {item.qty}</small>
                      </div>
                      <span className="fw-bold">${(productPrice * item.qty).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (7%):</span>
                  <span>${(getCartTotal() * 0.07).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery:</span>
                  <span className="text-success">FREE</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span className="text-primary">${(getCartTotal() * 1.07).toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="alert alert-info mt-3 mb-0">
                <small>
                  <i className="bi bi-info-circle me-2"></i>
                  {paymentMethod === 'COD' 
                    ? 'Cash on Delivery (COD) available' 
                    : 'You will be redirected to PhonePe for secure payment'
                  }
                </small>
              </div>

              {/* Back to Cart Button */}
              <Link to="/cart" className="btn btn-outline-secondary w-100 mt-3">
                <i className="bi bi-arrow-left me-2"></i>
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;