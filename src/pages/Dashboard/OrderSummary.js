import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams } from 'react-router-dom';

const OrderSummary = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then(res => setOrder(res.data)).catch(console.error);
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <h3>Order #{order._id.slice(-6)}</h3>
      <div><strong>Status:</strong> {order.status}</div>
      <div className="mt-3">
        <h5>Items</h5>
        {order.items.map(i => (
          <div key={i._id} className="d-flex justify-content-between py-1">
            <div>{i.product.name} x {i.qty}</div>
            <div>₹{i.price * i.qty}</div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <h5>Shipping Address</h5>
        <div>{order.shippingAddress.line1}, {order.shippingAddress.city}</div>
      </div>
      <div className="mt-3"><strong>Total:</strong> ₹{order.total}</div>
    </div>
  );
};

export default OrderSummary;
