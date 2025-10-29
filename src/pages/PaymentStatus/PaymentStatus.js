import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import API from '../../api/api';

const PaymentStatus = () => {
  const [status, setStatus] = useState('loading');
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        if (!orderId) {
          setStatus('error');
          return;
        }

        // Get order details
        const orderResponse = await API.get(`/orders/${orderId}`);
        setOrder(orderResponse.data);

        if (orderResponse.data.paymentStatus === 'completed') {
          setStatus('success');
        } else if (orderResponse.data.paymentStatus === 'failed') {
          setStatus('failed');
        } else {
          // If still pending, check with PhonePe
          setTimeout(checkPaymentStatus, 3000); // Retry after 3 seconds
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('error');
      }
    };

    checkPaymentStatus();
  }, [orderId]);

  if (status === 'loading') {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Checking payment status...</p>
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
                  <h3 className="text-success">Payment Successful!</h3>
                  <p className="text-muted mb-4">
                    Your order has been placed successfully. We'll notify you when it's shipped.
                  </p>
                  {order && (
                    <div className="alert alert-info text-start">
                      <strong>Order ID:</strong> {order._id}<br />
                      <strong>Total Amount:</strong> ${order.totalPrice}<br />
                      <strong>Status:</strong> {order.status}
                    </div>
                  )}
                  <div className="d-grid gap-2">
                    <Link to="/orders" className="btn btn-primary">
                      View My Orders
                    </Link>
                    <Link to="/products" className="btn btn-outline-secondary">
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
                  <h3 className="text-danger">Payment Failed</h3>
                  <p className="text-muted mb-4">
                    Your payment was not successful. Please try again.
                  </p>
                  <div className="d-grid gap-2">
                    <Link to="/cart" className="btn btn-primary">
                      Try Again
                    </Link>
                    <Link to="/products" className="btn btn-outline-secondary">
                      Continue Shopping
                    </Link>
                  </div>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="text-warning mb-4">
                    <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3 className="text-warning">Payment Status Unknown</h3>
                  <p className="text-muted mb-4">
                    We couldn't verify your payment status. Please check your orders page.
                  </p>
                  <div className="d-grid gap-2">
                    <Link to="/orders" className="btn btn-primary">
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