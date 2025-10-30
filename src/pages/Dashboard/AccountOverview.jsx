import React, { useState, useEffect, useContext } from 'react';
import { userAPI } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { FaBox, FaCheckCircle, FaClock, FaHeart, FaShoppingBag, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AccountOverview = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const response = await userAPI.getDashboardOverview();
      console.log('Dashboard API Response:', response.data);
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add null checks for user and dashboardData
  if (!user) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning text-center">
          <h4>Please log in to view your account</h4>
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
          <p className="mt-2">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger text-center">
          <h4>Error Loading Dashboard</h4>
          <p>{error}</p>
          <button className="btn btn-primary mt-2" onClick={fetchDashboardData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ✅ Safe data access with fallbacks
  const safeData = dashboardData || {
    user: { 
      name: user.name || 'User', 
      email: user.email || '',
      memberSince: user.createdAt || new Date()
    },
    stats: {
      totalOrders: 0,
      completedOrders: 0,
      pendingOrders: 0,
      wishlistCount: 0
    },
    recentOrders: []
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status badge with proper styling
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
    
    return (
      <span className={`badge ${config.class}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Account Overview</h2>
          
          {/* Welcome Message */}
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h4 className="card-title mb-2">Welcome back, {safeData.user.name}!</h4>
                  <p className="card-text mb-0">
                    Here's your account summary and recent activity. 
                    {safeData.user.memberSince && (
                      <span> Member since {formatDate(safeData.user.memberSince)}</span>
                    )}
                  </p>
                </div>
                <div className="col-md-4 text-md-end">
                  <div className="bg-white bg-opacity-25 p-3 rounded d-inline-block">
                    <small className="d-block">Account Status</small>
                    <strong className="d-block">Active</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="row mb-4">
            <div className="col-xl-3 col-md-6 mb-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title text-white-50">TOTAL ORDERS</h6>
                      <h2 className="mb-0">{safeData.stats.totalOrders}</h2>
                    </div>
                    <FaShoppingBag size={30} className="opacity-75" />
                  </div>
                  <Link to="/dashboard/orders" className="text-white text-decoration-none small d-block mt-2">
                    View all orders →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-3">
              <div className="card bg-success text-white h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title text-white-50">COMPLETED</h6>
                      <h2 className="mb-0">{safeData.stats.completedOrders}</h2>
                    </div>
                    <FaCheckCircle size={30} className="opacity-75" />
                  </div>
                  <div className="small text-white-50 mt-2">
                    {safeData.stats.totalOrders > 0 ? 
                      Math.round((safeData.stats.completedOrders / safeData.stats.totalOrders) * 100) : 0
                    }% success rate
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-3">
              <div className="card bg-warning text-white h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title text-white-50">PENDING</h6>
                      <h2 className="mb-0">{safeData.stats.pendingOrders}</h2>
                    </div>
                    <FaClock size={30} className="opacity-75" />
                  </div>
                  <div className="small text-white-50 mt-2">
                    Orders in progress
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-3">
              <div className="card bg-danger text-white h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title text-white-50">WISHLIST</h6>
                      <h2 className="mb-0">{safeData.stats.wishlistCount}</h2>
                    </div>
                    <FaHeart size={30} className="opacity-75" />
                  </div>
                  <Link to="/dashboard/wishlist" className="text-white text-decoration-none small d-block mt-2">
                    View wishlist →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-3">Quick Actions</h5>
                  <div className="row g-3">
                    <div className="col-xl-2 col-md-4 col-sm-6">
                      <Link to="/dashboard/profile" className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3">
                        <FaUser size={24} className="mb-2" />
                        <span>Profile</span>
                      </Link>
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                      <Link to="/dashboard/orders" className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3">
                        <FaShoppingBag size={24} className="mb-2" />
                        <span>Orders</span>
                      </Link>
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                      <Link to="/dashboard/wishlist" className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3">
                        <FaHeart size={24} className="mb-2" />
                        <span>Wishlist</span>
                      </Link>
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                      <Link to="/dashboard/addresses" className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3">
                        <FaMapMarkerAlt size={24} className="mb-2" />
                        <span>Addresses</span>
                      </Link>
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                      <Link to="/shop" className="btn btn-outline-success w-100 d-flex flex-column align-items-center py-3">
                        <FaBox size={24} className="mb-2" />
                        <span>Shop Now</span>
                      </Link>
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                      <Link to="/cart" className="btn btn-outline-info w-100 d-flex flex-column align-items-center py-3">
                        <FaShoppingBag size={24} className="mb-2" />
                        <span>View Cart</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <div>
                <Link to="/dashboard/orders" className="btn btn-sm btn-outline-primary me-2">
                  View All Orders
                </Link>
                <Link to="/shop" className="btn btn-sm btn-primary">
                  New Order
                </Link>
              </div>
            </div>
            <div className="card-body">
              {safeData.recentOrders.length === 0 ? (
                <div className="text-center py-5">
                  <FaBox size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No orders yet</h5>
                  <p className="text-muted mb-4">Start shopping to see your orders here</p>
                  <Link to="/shop" className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {safeData.recentOrders.map((order) => {
                        // ✅ Safe data access with fallbacks
                        const orderId = order._id || 'N/A';
                        const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A';
                        const itemCount = order.items || order.orderItems?.length || 0;
                        const totalAmount = order.totalPrice || order.totalAmount || 0;
                        const status = order.status || 'pending';

                        return (
                          <tr key={orderId}>
                            <td>
                              <strong>#{orderId.slice(-6).toUpperCase()}</strong>
                            </td>
                            <td>{orderDate}</td>
                            <td>
                              <span className="badge bg-light text-dark">
                                {itemCount} {itemCount === 1 ? 'item' : 'items'}
                              </span>
                            </td>
                            <td>
                              <strong>${typeof totalAmount === 'number' ? totalAmount.toFixed(2) : '0.00'}</strong>
                            </td>
                            <td>{getStatusBadge(status)}</td>
                            <td>
                              <Link 
                                to={`/dashboard/orders/${orderId}`}
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Details
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Account Summary */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Account Information</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6 mb-2">
                      <small className="text-muted">Name</small>
                      <div className="fw-semibold">{safeData.user.name}</div>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="text-muted">Email</small>
                      <div className="fw-semibold">{safeData.user.email}</div>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="text-muted">Total Orders</small>
                      <div className="fw-semibold">{safeData.stats.totalOrders}</div>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="text-muted">Member Since</small>
                      <div className="fw-semibold">{formatDate(safeData.user.memberSince)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Order Statistics</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6 mb-2">
                      <small className="text-muted">Completed</small>
                      <div className="fw-semibold text-success">
                        {safeData.stats.completedOrders}
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="text-muted">Pending</small>
                      <div className="fw-semibold text-warning">
                        {safeData.stats.pendingOrders}
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="text-muted">Wishlist Items</small>
                      <div className="fw-semibold text-danger">
                        {safeData.stats.wishlistCount}
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <small className="text-muted">Success Rate</small>
                      <div className="fw-semibold text-primary">
                        {safeData.stats.totalOrders > 0 ? 
                          Math.round((safeData.stats.completedOrders / safeData.stats.totalOrders) * 100) : 0
                        }%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;