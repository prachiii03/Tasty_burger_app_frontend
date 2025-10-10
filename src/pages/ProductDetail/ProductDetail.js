import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="container mt-5">
      <h1>Product Details</h1>
      <p>Details for product {id} will be displayed here.</p>
    </div>
  );
};

export default ProductDetail;