import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => toast.error('Failed to load products'));
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete product?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Products</h3>
        <Link to="/admin/products/create" className="btn btn-primary">Create</Link>
      </div>
      <table className="table">
        <thead><tr><th>Name</th><th>Price</th><th></th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>
<Link to={`/admin/products/edit/${p._id}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminProducts;
