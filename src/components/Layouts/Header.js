import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Dropdown,
  Image,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import "../../styles/HeaderStyle.css";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const [nav, setNav] = useState(false);
  const { getCartCount, clearCart } = useContext(CartContext); // ✅ make sure clearCart exists in CartContext
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sticky navbar effect
  useEffect(() => {
    const changeValueOnScroll = () => setNav(window.scrollY > 100);
    window.addEventListener("scroll", changeValueOnScroll);
    return () => window.removeEventListener("scroll", changeValueOnScroll);
  }, []);

  // Logout handler
  const handleLogout = () => {
    logout();
    clearCart?.(); // ✅ clear cart on logout
    toast.info("Logged out successfully");
    navigate("/");
  };

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className={nav ? "sticky" : ""}>
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="logo">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid"
              style={{ height: 40 }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-lg-center">
              {/* Main nav links */}
              <Nav.Link as={Link} to="/" className="text-black">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-black">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/menu" className="text-black">
                Our Menu
              </Nav.Link>
              <Nav.Link as={Link} to="/shop" className="text-black">
                Shop
              </Nav.Link>
              <Nav.Link as={Link} to="/blog" className="text-black">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-black">
                Contact
              </Nav.Link>

              {/* Cart */}
              <Nav.Link as={Link} to="/cart" className="text-black">
                <div className="cart d-flex align-items-center">
                  <i className="bi bi-bag fs-5"></i>
                  <em className="roundpoint ms-1">
                    {getCartCount ? getCartCount() : 0}
                  </em>
                </div>
              </Nav.Link>

              {/* Auth area */}
              <div className="d-flex gap-2 ms-3 align-items-center">
                {!user ? (
                  <>
                    <Button as={Link} to="/login" variant="danger" size="sm">
                      Login
                    </Button>
                    <Button as={Link} to="/register" variant="primary" size="sm">
                      Signup
                    </Button>
                  </>
                ) : (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      id="user-dropdown"
                      as="div"
                      style={{ cursor: "pointer" }}
                      className="d-flex align-items-center"
                    >
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          roundedCircle
                          style={{ width: 36, height: 36, objectFit: "cover" }}
                        />
                      ) : (
                        <i className="bi bi-person-circle fs-3"></i>
                      )}
                      <span className="ms-2 d-none d-lg-inline">
                        {firstName}
                      </span>
                      <Badge bg="danger" pill className="ms-2"></Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* ✅ Dynamic dashboard link based on role */}
                      {user?.role === "admin" ? (
                        <Dropdown.Item as={Link} to="/admin">
                          Admin Dashboard
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item as={Link} to="/dashboard">
                          User Dashboard
                        </Dropdown.Item>
                      )}

                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
