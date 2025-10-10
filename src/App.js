// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layouts/Layout";

// Public pages
import Home from "./pages/Home/Home";
import Section3 from "./pages/Home/Section3"; // Menu
import Section4 from "./pages/Home/Section4"; // About
import Shop from "./pages/Shop/Shop";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound/NotFound";

// User dashboard pages (Dashboard is layout + Outlet)
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountOverview from "./pages/Dashboard/AccountOverview";
import Profile from "./pages/Dashboard/Profile";
import Wishlist from "./pages/Dashboard/Wishlist";
import Addresses from "./pages/Dashboard/Addresses";
import OrdersList from "./pages/Dashboard/OrdersList";
import OrderSummary from "./pages/Dashboard/OrderSummary";

// General protected pages (if any)
import Orders from "./pages/Orders/Orders"; // existing protected orders page

// Admin pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminProducts from "./pages/Admin/Products";
import AdminProductEdit from "./pages/Admin/ProductEdit";
import AdminOrders from "./pages/Admin/Orders";

// --- Protected Route Component ---
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <Section4 />
                </Layout>
              }
            />
            <Route
              path="/menu"
              element={
                <Layout>
                  <Section3 />
                </Layout>
              }
            />
            <Route
              path="/shop"
              element={
                <Layout>
                  <Shop />
                </Layout>
              }
            />
            <Route
              path="/blog"
              element={
                <Layout>
                  <Blog />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Layout>
                  <ProductDetail />
                </Layout>
              }
            />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected (non-dashboard) */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Checkout />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Orders />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Dashboard (protected) with nested routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              {/* nested dashboard routes (render inside Dashboard's <Outlet />) */}
              <Route index element={<Navigate to="/dashboard/accountoverview" replace />} />  {/* Redirect /dashboard to /dashboard/accountoverview */}
              <Route path="accountoverview" element={<AccountOverview />} />                  {/* /dashboard/accountoverview */}
              <Route path="profile" element={<Profile />} />                                 {/* /dashboard/profile */}
              <Route path="wishlist" element={<Wishlist />} />                               {/* /dashboard/wishlist */}
              <Route path="addresses" element={<Addresses />} />                             {/* /dashboard/addresses */}
              <Route path="orders" element={<OrdersList />} />                               {/* /dashboard/orders */}
              <Route path="orders/:id" element={<OrderSummary />} />                         {/* /dashboard/orders/:id */}
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/create"
              element={
                <AdminRoute>
                  <AdminProductEdit />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <AdminRoute>
                  <AdminProductEdit />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Toast Notification */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;