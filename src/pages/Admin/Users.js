import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import api from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) return;
    api.get('/admin/users')
      .then(res => setUsers(res.data))
      .catch(() => toast.error('Failed to load users'));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <AdminLayout>
      <h3>Users</h3>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td><button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminUsers;
