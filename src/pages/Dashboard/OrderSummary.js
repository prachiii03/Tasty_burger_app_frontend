import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { FaArrowLeft, FaPrint, FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaCalendar } from 'react-icons/fa';

const OrderSummary = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && id) {
      fetchOrder();
    } else {
      setLoading(false);
    }
  }, [id, user]);

  const fetchOrder = async () => {
    try {
      const response = await API.get(`/orders/${id}`);
      console.log('Order API Response:', response.data);
      setOrder(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add null checks for user and order
  if (!user) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning text-center">
          <h4>Please log in to view order details</h4>
          <Link to="/login" className="btn btn-primary mt-3">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger text-center">
          <h4>Error Loading Order</h4>
          <p>{error}</p>
          <button className="btn btn-primary mt-2" onClick={fetchOrder}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning text-center">
          <h4>Order Not Found</h4>
          <p>The requested order could not be found.</p>
          <Link to="/dashboard/orders" className="btn btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Safe data access with fallbacks
  const orderId = order._id || 'N/A';
  const orderItems = order.orderItems || order.items || [];
  const shippingAddress = order.shippingAddress || {};
  const totalAmount = order.totalPrice || order.total || 0;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'bg-warning', text: 'Pending' },
      completed: { class: 'bg-success', text: 'Completed' },
      processing: { class: 'bg-info', text: 'Processing' },
      shipped: { class: 'bg-primary', text: 'Shipped' },
      delivered: { class: 'bg-success', text: 'Delivered' },
      cancelled: { class: 'bg-danger', text: 'Cancelled' }
    };

    const config = statusConfig[status] || { class: 'bg-secondary', text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  // Get payment status badge
  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      pending: { class: 'bg-warning', text: 'Pending' },
      completed: { class: 'bg-success', text: 'Paid' },
      failed: { class: 'bg-danger', text: 'Failed' }
    };

    const config = statusConfig[paymentStatus] || { class: 'bg-secondary', text: paymentStatus };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Link to="/dashboard/orders" className="btn btn-outline-secondary btn-sm mb-2">
                <FaArrowLeft className="me-1" />
                Back to Orders
              </Link>
              <h2 className="mb-1">Order Details</h2>
              <p className="text-muted mb-0">
                Order #{orderId.slice(-6).toUpperCase()} • Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <button className="btn btn-outline-primary">
              <FaPrint className="me-1" />
              Print
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Order Summary */}
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <FaShoppingBag className="me-2" />
                Order Items
              </h5>
            </div>
            <div className="card-body">
              {orderItems.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No items found in this order</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item, index) => {
                        const product = item.product || {};
                        const productName = product.name || 'Product';
                        const productPrice = item.price || 0;
                        const quantity = item.qty || item.quantity || 1;
                        const itemTotal = productPrice * quantity;

                        return (
                          <tr key={item._id || index}>
                            <td>
                              <div className="d-flex align-items-center">
                                {product.images && product.images[0] && (
                                  <img 
                                    src={product.images[0]} 
                                    alt={productName}
                                    className="rounded me-3"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                  />
                                )}
                                <div>
                                  <strong>{productName}</strong>
                                  {product.description && (
                                    <div className="text-muted small">{product.description}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>${productPrice.toFixed(2)}</td>
                            <td>{quantity}</td>
                            <td>
                              <strong>${itemTotal.toFixed(2)}</strong>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="table-light">
                      <tr>
                        <td colSpan="3" className="text-end">
                          <strong>Subtotal:</strong>
                        </td>
                        <td>
                          <strong>${totalAmount.toFixed(2)}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="text-end">
                          <strong>Tax:</strong>
                        </td>
                        <td>
                          <strong>$0.00</strong>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="text-end">
                          <strong>Shipping:</strong>
                        </td>
                        <td>
                          <strong className="text-success">FREE</strong>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="text-end">
                          <h5 className="mb-0">Total:</h5>
                        </td>
                        <td>
                          <h5 className="mb-0 text-primary">${totalAmount.toFixed(2)}</h5>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Information Sidebar */}
        <div className="col-lg-4">
          {/* Order Status */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">Order Status</h6>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-6">
                  <small className="text-muted">Order Status</small>
                  <div>{getStatusBadge(order.status)}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Payment Status</small>
                  <div>{getPaymentStatusBadge(order.paymentStatus)}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <small className="text-muted">Payment Method</small>
                  <div className="fw-semibold">{order.paymentMethod || 'N/A'}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Order Date</small>
                  <div className="fw-semibold">{formatDate(order.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <FaMapMarkerAlt className="me-2" />
                Shipping Address
              </h6>
            </div>
            <div className="card-body">
              {shippingAddress.fullName ? (
                <>
                  <strong>{shippingAddress.fullName}</strong>
                  <p className="mb-1">{shippingAddress.address}</p>
                  <p className="mb-1">
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}
                  </p>
                  <p className="mb-1">{shippingAddress.country}</p>
                  <p className="mb-0">
                    <FaCreditCard className="me-1" />
                    {shippingAddress.phone}
                  </p>
                  <p className="mb-0">
                    <FaCalendar className="me-1" />
                    {shippingAddress.email}
                  </p>
                </>
              ) : (
                <p className="text-muted mb-0">No shipping address provided</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <div className="card-header bg-light">
              <h6 className="mb-0">Order Actions</h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  Track Order
                </button>
                <button className="btn btn-outline-secondary">
                  Download Invoice
                </button>
                {order.status === 'pending' && (
                  <button className="btn btn-outline-danger">
                    Cancel Order
                  </button>
                )}
                <Link to="/shop" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;