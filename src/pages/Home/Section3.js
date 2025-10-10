import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cards from "../../components/Layouts/Cards";
import { AuthContext } from "../../context/AuthContext";
import { productsAPI } from "../../api/api";
import { toast } from "react-toastify";

const renderRatingIcons = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<i key={`half${i}`} className="bi bi-star-half text-warning"></i>);
    } else {
      stars.push(<i key={`empty${i}`} className="bi bi-star text-warning"></i>);
    }
  }
  return <div>{stars}</div>;
};

function Section3() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('🔄 Starting to fetch products...');
        console.log('API Base URL:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
        
        const response = await productsAPI.getProducts();
        console.log('✅ Products fetched successfully:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
          console.log(`📦 Loaded ${response.data.length} products`);
        } else {
          console.warn('⚠️ Unexpected response format:', response.data);
          setProducts([]);
          setError('Invalid response format from server');
        }
        
      } catch (err) {
        console.error('❌ Failed to load products:', err);
        
        // More specific error messages
        if (err.code === 'NETWORK_ERROR' || err.message === 'Network Error') {
          setError('Cannot connect to server. Please check if the backend is running.');
        } else if (err.response?.status === 404) {
          setError('Products endpoint not found. Please check server routes.');
        } else if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to load products. Please try again later.');
        }
        
        setProducts([]);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Debug: Log products when they change
  useEffect(() => {
    if (products.length > 0) {
      console.log('📊 Current products state:', products);
      products.forEach((product, index) => {
        console.log(`🍔 Product ${index + 1}:`, {
          name: product.name,
          id: product._id,
          images: product.images,
          fullImageUrl: product.images && product.images.length > 0 
            ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${product.images[0]}`
            : 'No image'
        });
      });
    }
  }, [products]);

  if (loading) {
    return (
      <section className="menu_section" id="section3">
        <Container>
          <Row>
            <Col className="text-center py-5">
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading products...</span>
              </Spinner>
              <p className="mt-2">Loading delicious burgers...</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu_section" id="section3">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
              <h2>OUR SIGNATURE BURGERS</h2>
              <p className="para">
                Freshly grilled patties, premium toppings, and bold flavors —
                crafted to satisfy your cravings.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert variant="warning" className="text-center">
                <h4>Oops! Something went wrong</h4>
                <p>{error}</p>
                <div className="mt-3">
                  <button 
                    onClick={() => window.location.reload()} 
                    className="btn btn-primary me-2"
                  >
                    Try Again
                  </button>
                  <Link to="/" className="btn btn-outline-primary">
                    Go Home
                  </Link>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="menu_section" id="section3">
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
            <h2>OUR SIGNATURE BURGERS</h2>
            <p className="para">
              Freshly grilled patties, premium toppings, and bold flavors —
              crafted to satisfy your cravings.
            </p>
          </Col>
        </Row>

        {/* Products from backend */}
        <Row>
          {products.length > 0 ? (
            products.map((product) => (
              <Cards
                key={product._id}
                id={product._id}
                image={
                  product.images && product.images.length > 0 
                    ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${product.images[0]}`
                    : "/default-burger.jpg"
                }
                rating={product.rating || 0}
                title={product.name}
                paragraph={product.description}
                price={product.price}
                renderRatingIcons={renderRatingIcons}
                user={user}
              />
            ))
          ) : (
            <Col className="text-center py-5">
              <Alert variant="info">
                <h5>No Burgers Available</h5>
                <p className="mb-0">We're preparing some delicious burgers for you. Please check back soon!</p>
              </Alert>
            </Col>
          )}
        </Row>

        {/* Promo Banners */}
        <Row className="pt-5">
          <Col sm={6} lg={5}>
            <div className="ads_box ads_img1 mb-5 mb-md-0">
              <h4 className="mb-0">LIMITED TIME OFFER</h4>
              <h5>FREE CHEESE FRIES</h5>
              <Link to="/" className="btn btn_red px-4 rounded-0">
                Learn More
              </Link>
            </div>
          </Col>
          <Col sm={6} lg={7}>
            <div className="ads_box ads_img2">
              <h4 className="mb-0">WEEKEND SPECIAL</h4>
              <h5>BUY 1 GET 1 FREE</h5>
              <Link to="/" className="btn btn_red px-4 rounded-0">
                Learn More
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Section3;