import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import API from '../../api/api';

const PaymentStatus = () => {
  const [status, setStatus] = useState('loading');
  const [order, setOrder] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');

  // Maximum number of retries
  const MAX_RETRIES = 10;
  const RETRY_DELAY = 2000; // 2 seconds

  useEffect(() => {
    if (orderId) {
      checkPaymentStatus();
    } else {
      setStatus('error');
      setErrorMessage('No order ID provided');
    }
  }, [orderId]);

  const checkPaymentStatus = async () => {
    try {
      console.log(`🔄 Checking payment status for order: ${orderId}, attempt: ${retryCount + 1}`);
      
      // Get order details
      const orderResponse = await API.get(`/orders/${orderId}`);
      const orderData = orderResponse.data.data || orderResponse.data;
      setOrder(orderData);

      console.log(`📊 Order payment status: ${orderData.paymentStatus}, order status: ${orderData.status}`);

      // Check payment status
      if (orderData.paymentStatus === 'completed') {
        setStatus('success');
        console.log('✅ Payment completed successfully');
        return;
      } else if (orderData.paymentStatus === 'failed') {
        setStatus('failed');
        console.log('❌ Payment failed');
        return;
      }

      // If still pending and we haven't exceeded max retries
      if (retryCount < MAX_RETRIES) {
        console.log(`⏳ Payment still pending, retrying in ${RETRY_DELAY/1000} seconds...`);
        setRetryCount(prev => prev + 1);
        setTimeout(checkPaymentStatus, RETRY_DELAY);
      } else {
        // Max retries reached
        setStatus('error');
        setErrorMessage('Payment status check timed out. Please check your orders page.');
        console.log('⏰ Max retries reached, stopping status checks');
      }

    } catch (error) {
      console.error('❌ Error checking payment status:', error);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`🔄 Retrying after error, attempt: ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        setTimeout(checkPaymentStatus, RETRY_DELAY);
      } else {
        setStatus('error');
        setErrorMessage('Unable to verify payment status. Please check your orders page or contact support.');
      }
    }
  };

  const handleManualCheck = () => {
    setRetryCount(0);
    setStatus('loading');
    setErrorMessage('');
    checkPaymentStatus();
  };

  if (status === 'loading') {
    return (
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body text-center p-5">
                <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="text-primary">Verifying Payment</h4>
                <p className="text-muted mb-3">
                  Please wait while we confirm your payment status...
                </p>
                <div className="progress mb-3" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated" 
                    style={{ width: `${(retryCount / MAX_RETRIES) * 100}%` }}
                  ></div>
                </div>
                <small className="text-muted">
                  Attempt {retryCount + 1} of {MAX_RETRIES}
                  {orderId && <div>Order: #{orderId.slice(-6).toUpperCase()}</div>}
                </small>
                <div className="mt-4">
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleManualCheck}
                  >
                    Check Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center p-5">
              {status === 'success' && (
                <>
                  <div className="text-success mb-4">
                    <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3 className="text-success mb-3">Payment Successful!</h3>
                  <p className="text-muted mb-4">
                    Your payment has been confirmed and your order is being processed. 
                    You will receive a confirmation email shortly.
                  </p>
                  {order && (
                    <div className="alert alert-success text-start">
                      <div className="row">
                        <div className="col-6">
                          <strong>Order ID:</strong><br />
                          <code>#{order._id?.slice(-6).toUpperCase()}</code>
                        </div>
                        <div className="col-6">
                          <strong>Amount Paid:</strong><br />
                          ${order.totalPrice?.toFixed(2)}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <strong>Status:</strong><br />
                          <span className="badge bg-success">{order.status}</span>
                        </div>
                        <div className="col-6">
                          <strong>Payment:</strong><br />
                          <span className="badge bg-success">Completed</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="d-grid gap-2">
                    <Link to="/dashboard/orders" className="btn btn-primary btn-lg">
                      View My Orders
                    </Link>
                    <Link to="/shop" className="btn btn-outline-primary">
                      Continue Shopping
                    </Link>
                  </div>
                </>
              )}

              {status === 'failed' && (
                <>
                  <div className="text-danger mb-4">
                    <i className="bi bi-x-circle-fill" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3 className="text-danger mb-3">Payment Failed</h3>
                  <p className="text-muted mb-4">
                    We were unable to process your payment. This could be due to insufficient funds, 
                    network issues, or payment cancellation.
                  </p>
                  {order && (
                    <div className="alert alert-warning text-start">
                      <strong>Order ID:</strong> #{order._id?.slice(-6).toUpperCase()}<br />
                      <strong>Amount:</strong> ${order.totalPrice?.toFixed(2)}<br />
                      <strong>Status:</strong> <span className="badge bg-danger">Payment Failed</span>
                    </div>
                  )}
                  <div className="d-grid gap-2">
                    <Link to="/cart" className="btn btn-primary">
                      Try Again
                    </Link>
                    <Link to="/shop" className="btn btn-outline-secondary">
                      Continue Shopping
                    </Link>
                    <Link to="/contact" className="btn btn-outline-primary">
                      Contact Support
                    </Link>
                  </div>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="text-warning mb-4">
                    <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3 className="text-warning mb-3">Payment Status Unknown</h3>
                  <p className="text-muted mb-4">
                    {errorMessage || 'We are unable to verify your payment status at the moment. '}
                    Please check your orders page or contact support if the amount was deducted from your account.
                  </p>
                  {order && (
                    <div className="alert alert-info text-start">
                      <strong>Order ID:</strong> #{order._id?.slice(-6).toUpperCase()}<br />
                      <strong>Last Status:</strong> {order.paymentStatus || 'Unknown'}<br />
                      <strong>Contact Support:</strong> support@yourstore.com
                    </div>
                  )}
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-primary"
                      onClick={handleManualCheck}
                    >
                      Check Status Again
                    </button>
                    <Link to="/dashboard/orders" className="btn btn-outline-primary">
                      Check Orders
                    </Link>
                    <Link to="/" className="btn btn-outline-secondary">
                      Go Home
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;