import React, { useState, useEffect } from 'react';
import { userAPI } from '../../api/api';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await userAPI.getAddresses();
      setAddresses(response.data.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingAddress) {
        await userAPI.updateAddress(editingAddress._id, formData);
      } else {
        await userAPI.addAddress(formData);
      }
      
      setShowForm(false);
      setEditingAddress(null);
      setFormData({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isDefault: false
      });
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await userAPI.deleteAddress(id);
        fetchAddresses();
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">My Addresses</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add New Address
            </button>
          </div>

          {/* Address Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">{editingAddress ? 'Edit Address' : 'Add New Address'}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Street</label>
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Set as default address</label>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {editingAddress ? 'Update Address' : 'Add Address'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowForm(false);
                        setEditingAddress(null);
                        setFormData({
                          street: '',
                          city: '',
                          state: '',
                          zipCode: '',
                          country: '',
                          isDefault: false
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Addresses List */}
          <div className="row">
            {addresses.map((address) => (
              <div key={address._id} className="col-md-6 mb-3">
                <div className={`card ${address.isDefault ? 'border-primary' : ''}`}>
                  <div className="card-body">
                    {address.isDefault && (
                      <span className="badge bg-primary mb-2">Default</span>
                    )}
                    <p className="card-text">
                      {address.street}<br/>
                      {address.city}, {address.state} {address.zipCode}<br/>
                      {address.country}
                    </p>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(address)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(address._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {addresses.length === 0 && !showForm && (
            <div className="text-center py-5">
              <h4>No addresses found</h4>
              <p>Add your first address to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addresses;