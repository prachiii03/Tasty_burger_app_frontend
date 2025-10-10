import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => (
  <div className="d-flex">
    <AdminSidebar />
    <div className="flex-grow-1 p-4">{children}</div>
  </div>
);

export default AdminLayout;
