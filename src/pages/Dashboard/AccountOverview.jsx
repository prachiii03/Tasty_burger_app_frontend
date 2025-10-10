import React, { useState, useEffect } from 'react';
import { userAPI } from '../../api/api';
import { FaBox, FaCheckCircle, FaClock, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AccountOverview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await userAPI.getDashboardOverview();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Account Overview</h2>
          
          {/* Welcome Message */}
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h5 className="card-title">Welcome back, {dashboardData.user.name}!</h5>
              <p className="card-text">Here's your account summary and recent activity.</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="card-title">Total Orders</h5>
                      <h2>{dashboardData.stats.totalOrders}</h2>
                    </div>
                    <FaBox size={40} className="opacity-50" />
                  </div>
                  <Link to="/dashboard/orders" className="text-white text-decoration-none">
                    View all orders →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="card-title">Completed</h5>
                      <h2>{dashboardData.stats.completedOrders}</h2>
                    </div>
                    <FaCheckCircle size={40} className="opacity-50" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="card-title">Pending</h5>
                      <h2>{dashboardData.stats.pendingOrders}</h2>
                    </div>
                    <FaClock size={40} className="opacity-50" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card bg-danger text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="card-title">Wishlist</h5>
                      <h2>{dashboardData.stats.wishlistCount}</h2>
                    </div>
                    <FaHeart size={40} className="opacity-50" />
                  </div>
                  <Link to="/dashboard/wishlist" className="text-white text-decoration-none">
                    View wishlist →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Link to="/dashboard/orders" className="btn btn-sm btn-outline-primary">
                View All Orders
              </Link>
            </div>
            <div className="card-body">
              {dashboardData.recentOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No orders found</p>
                  <Link to="/shop" className="btn btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentOrders.map(order => (
                        <tr key={order._id}>
                          <td>#{order._id.slice(-6)}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>{order.items.length} items</td>
                          <td>${order.totalAmount}</td>
                          <td>
                            <span className={`badge ${
                              order.status === 'completed' ? 'bg-success' :
                              order.status === 'pending' ? 'bg-warning' : 'bg-secondary'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;