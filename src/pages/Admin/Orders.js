import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import api from '../../api/api';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/orders');
      console.log('✅ Orders fetched:', response.data);
      
      // Handle both response formats
      const ordersData = response.data.data || response.data;
      setOrders(ordersData);
    } catch (error) {
      console.error('❌ Failed to load orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdating(id);
      console.log(`🔄 Updating order ${id} to status: ${status}`);
      
      const response = await api.put(`/admin/orders/${id}`, { status });
      console.log('✅ Status updated:', response.data);
      
      // Update local state
      setOrders(orders.map(o => 
        o._id === id ? { ...o, status: status.toLowerCase() } : o
      ));
      
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('❌ Update failed:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning text-dark',
      processing: 'bg-info text-white',
      completed: 'bg-success text-white',
      cancelled: 'bg-danger text-white'
    };
    
    return (
      <span className={`badge ${statusClasses[status?.toLowerCase()] || 'bg-secondary'}`}>
        {status?.toUpperCase() || 'PENDING'}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading orders...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Orders Management</h3>
        <button className="btn btn-primary" onClick={fetchOrders}>
          <i className="bi bi-arrow-clockwise me-2"></i>
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          <h5>No orders found</h5>
          <p className="mb-0">Orders will appear here once customers place them.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
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
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>{order.user?.email || 'N/A'}</td>
                  <td>{order.orderItems?.length || 0} items</td>
                  <td>
                    <strong>${order.totalPrice || order.total || 0}</strong>
                  </td>
                  <td>
                    <span className={`badge ${
                      order.paymentStatus === 'paid' ? 'bg-success' : 
                      order.paymentStatus === 'pending' ? 'bg-warning text-dark' : 
                      'bg-secondary'
                    }`}>
                      {order.paymentStatus?.toUpperCase() || 'PENDING'}
                    </span>
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
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
                  <td>
                    <select 
                      className="form-select form-select-sm" 
                      value={order.status?.toLowerCase() || 'pending'}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      disabled={updating === order._id}
                      style={{ minWidth: '130px' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {updating === order._id && (
                      <div className="spinner-border spinner-border-sm ms-2" role="status">
                        <span className="visually-hidden">Updating...</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3 text-muted">
        <small>Total Orders: {orders.length}</small>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;