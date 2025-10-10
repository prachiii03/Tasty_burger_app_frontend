import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import api from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: 0,
    description: '',
    image: null, // file
    preview: '', // preview url
  });

  useEffect(() => {
    if (id) {
      api
        .get(`/products/${id}`)
        .then((res) => {
          setForm({
            name: res.data.name || '',
            price: res.data.price || 0,
            description: res.data.description || '',
            image: null,
            preview: res.data.images && res.data.images[0] ? res.data.images[0] : '',
          });
        })
        .catch(() => toast.error('Load failed'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('description', form.description);
      if (form.image) formData.append('image', form.image);

      if (id) {
        await api.put(`/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Updated');
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Created');
      }
      navigate('/admin/products');
    } catch (err) {
      toast.error('Save failed');
    }
  };

  const deleteProduct = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      toast.success('Deleted');
      navigate('/admin/products');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <AdminLayout>
      <h3>{id ? 'Edit' : 'Create'} Product</h3>
      <form onSubmit={submit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
          {form.preview && (
            <img
              src={form.preview}
              alt="preview"
              className="mt-2"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
          )}
        </div>
        <button className="btn btn-primary me-2">{id ? 'Update' : 'Create'}</button>
        {id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteProduct}
          >
            Delete
          </button>
        )}
      </form>
    </AdminLayout>
  );
};

export default ProductEdit;
