import React, { useState, useEffect, useContext } from 'react';
import { userAPI } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const OrdersList = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [currentPage, user]);

  // ✅ Auto-refresh orders every 10 seconds to show updated status
  useEffect(() => {
    if (!user) return;

    const intervalId = setInterval(() => {
      console.log('🔄 Auto-refreshing orders...');
      fetchOrders(true); // Silent refresh
    }, 10000); // Every 10 seconds

    return () => clearInterval(intervalId);
  }, [user, currentPage]);

  const fetchOrders = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      
      const response = await userAPI.getOrders(currentPage);
      console.log('✅ Orders fetched:', response.data);
      
      // Handle different response formats
      const ordersData = response.data.data?.orders || response.data.data || response.data;
      const totalPagesData = response.data.data?.totalPages || 1;
      
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setTotalPages(totalPagesData);
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      if (!silent) {
        setOrders([]);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning text-dark',
      completed: 'bg-success',
      cancelled: 'bg-danger',
      processing: 'bg-info'
    };
    
    const statusText = status?.toUpperCase() || 'PENDING';
    
    return (
      <span className={`badge ${statusClasses[status?.toLowerCase()] || 'bg-secondary'}`}>
        {statusText}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      pending: '⏳',
      processing: '🔄',
      completed: '✅',
      cancelled: '❌'
    };
    
    return statusIcons[status?.toLowerCase()] || '📦';
  };

  // ✅ Add null check for user
  if (!user) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning text-center">
          <h4>Please log in to view your orders</h4>
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
          <p className="mt-2">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>My Orders</h2>
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={() => fetchOrders()}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Refresh
            </button>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#ccc' }}></i>
              </div>
              <h4>No orders found</h4>
              <p>You haven't placed any orders yet.</p>
              <Link to="/shop" className="btn btn-primary mt-3">
                <i className="bi bi-shop me-2"></i>
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>
                          <code className="text-primary">
                            #{order._id?.slice(-6) || 'N/A'}
                          </code>
                        </td>
                        <td>
                          {order.createdAt 
                            ? new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : 'N/A'
                          }
                        </td>
                        <td>{order.orderItems?.length || order.items?.length || 0} items</td>
                        <td>
                          <strong>${order.totalPrice || order.totalAmount || 0}</strong>
                        </td>
                        <td>
                          <span className={`badge ${
                            order.paymentStatus === 'paid' ? 'bg-success' : 
                            order.paymentStatus === 'pending' ? 'bg-warning text-dark' : 
                            'bg-secondary'
                          }`}>
                            {order.paymentStatus?.toUpperCase() || order.paymentMethod?.toUpperCase() || 'COD'}
                          </span>
                        </td>
                        <td>
                          <span className="me-2">{getStatusIcon(order.status)}</span>
                          {getStatusBadge(order.status)}
                        </td>
                        <td>
                          <Link 
                            to={`/dashboard/orders/${order._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-eye me-1"></i>
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i> Previous
                      </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <li 
                        key={index} 
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              )}

              <div className="mt-3 text-muted text-center">
                <small>
                  <i className="bi bi-info-circle me-1"></i>
                  Status updates automatically. Last updated: {new Date().toLocaleTimeString()}
                </small>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;