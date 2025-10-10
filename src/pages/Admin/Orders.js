import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import api from '../../api/api';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/admin/orders').then(res => setOrders(res.data)).catch(() => toast.error('Failed to load orders'));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}`, { status });
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
      toast.success('Status updated');
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <AdminLayout>
      <h3>Orders</h3>
      <table className="table">
        <thead><tr><th>#</th><th>User</th><th>Total</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user?.name}</td>
              <td>${o.total}</td>
              <td>{o.status}</td>
              <td>
                <select className="form-select form-select-sm" value={o.status} onChange={e => updateStatus(o._id, e.target.value)}>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminOrders;
