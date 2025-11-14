import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Tab, Nav } from 'react-bootstrap';
import { productsAPI } from '../../api/api';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Cards from '../../components/Layouts/Cards';

// CSS Styles
const styles = {
  /* Product Detail Page */
  productDetailSection: {
    padding: '80px 0',
    backgroundColor: '#fff',
  },

  /* Product Images */
  productImages: {
    position: 'relative',
  },

  mainProductImage: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
  },

  productThumbnails: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-start',
  },

  thumbnailItem: {
    width: '80px',
    height: '80px',
    border: '2px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  },

  thumbnailItemHover: {
    borderColor: '#ffc222',
  },

  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  /* Product Info */
  productInfo: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#222',
      marginBottom: '15px',
      fontFamily: "'Oswald', sans-serif",
      textTransform: 'uppercase',
    },
  },

  productRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },

  ratingStars: {
    display: 'flex',
    gap: '3px',
    fontSize: '1.1rem',
  },

  ratingNumber: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#222',
  },

  customerReviews: {
    color: '#666',
    fontSize: '0.95rem',
  },

  productPrice: {
    marginBottom: '20px',
  },

  originalPrice: {
    fontSize: '1.3rem',
    color: '#999',
    textDecoration: 'line-through',
    marginRight: '10px',
  },

  salePrice: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffc222',
  },

  productDescription: {
    color: '#666',
    lineHeight: '1.8',
    marginBottom: '25px',
    fontSize: '1rem',
  },

  /* Product Details Table */
  productDetailsTable: {
    marginBottom: '25px',
  },

  detailRow: {
    display: 'flex',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
  },

  detailLabel: {
    fontWeight: '600',
    color: '#222',
    width: '150px',
    fontSize: '0.95rem',
  },

  detailValue: {
    color: '#666',
    flex: '1',
    fontSize: '0.95rem',
  },

  /* Tags */
  productTags: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '25px',
  },

  tagItem: {
    display: 'inline-block',
    padding: '5px 12px',
    backgroundColor: '#f8f9fa',
    color: '#666',
    borderRadius: '4px',
    marginRight: '8px',
    fontSize: '0.9rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },

  tagItemHover: {
    backgroundColor: '#ffc222',
    color: '#fff',
  },

  /* Quantity & Add to Cart */
  productActions: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '25px',
  },

  quantitySelector: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
  },

  quantityInput: {
    width: '60px',
    textAlign: 'center',
    border: 'none',
    padding: '10px',
    fontSize: '1rem',
    fontWeight: '600',
  },

  quantityButton: {
    backgroundColor: '#f8f9fa',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
  },

  quantityButtonHover: {
    backgroundColor: '#ffc222',
    color: '#fff',
  },

  addToCartBtn: {
    backgroundColor: '#ffc222',
    color: '#222',
    border: 'none',
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Oswald', sans-serif",
    textTransform: 'uppercase',
  },

  addToCartBtnHover: {
    backgroundColor: '#222',
    color: '#ffc222',
    transform: 'translateY(-2px)',
  },

  addToCartBtnDisabled: {
    backgroundColor: '#ccc',
    color: '#666',
    cursor: 'not-allowed',
  },

  /* Product Notes */
  productNotes: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
  },

  notesList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },

  notesItem: {
    padding: '8px 0',
    color: '#666',
    fontSize: '0.95rem',
    position: 'relative',
    paddingLeft: '25px',
  },

  notesItemBefore: {
    content: "'✓'",
    position: 'absolute',
    left: '0',
    color: '#28a745',
    fontWeight: 'bold',
  },

  /* Tabs Section */
  productTabs: {
    marginTop: '60px',
  },

  navTabs: {
    borderBottom: '2px solid #ddd',
  },

  navLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#666',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '15px 30px',
    textTransform: 'uppercase',
    fontFamily: "'Oswald', sans-serif",
    borderRadius: '0',
  },

  navLinkActive: {
    backgroundColor: '#ffc222',
    color: '#222',
    borderBottom: '3px solid #ffc222',
  },

  navLinkHover: {
    color: '#ffc222',
  },

  tabContent: {
    padding: '40px 0',
  },

  /* Reviews Section */
  reviewsList: {
    marginTop: '30px',
  },

  reviewItem: {
    display: 'flex',
    gap: '20px',
    padding: '25px 0',
    borderBottom: '1px solid #eee',
  },

  reviewAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: '0',
  },

  reviewAvatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  reviewContent: {
    flex: '1',
  },

  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },

  reviewerName: {
    fontWeight: '700',
    color: '#222',
    fontSize: '1.1rem',
    marginBottom: '3px',
  },

  reviewDate: {
    color: '#999',
    fontSize: '0.9rem',
  },

  reviewRating: {
    display: 'flex',
    gap: '3px',
    marginBottom: '10px',
  },

  reviewText: {
    color: '#666',
    lineHeight: '1.8',
    fontSize: '0.95rem',
  },

  /* Related Products */
  relatedProductsSection: {
    padding: '80px 0',
    backgroundColor: '#f8f9fa',
  },

  sectionTitle: {
    textAlign: 'center',
    marginBottom: '50px',
  },

  sectionTitleH2: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#222',
    fontFamily: "'Oswald', sans-serif",
    textTransform: 'uppercase',
    marginBottom: '10px',
  },

  sectionTitleP: {
    color: '#666',
    fontSize: '1rem',
  },

  /* Responsive */
  '@media (max-width: 768px)': {
    productInfoH1: {
      fontSize: '1.8rem',
    },
    
    mainProductImage: {
      height: '350px',
    },
    
    productActions: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    
    addToCartBtn: {
      justifyContent: 'center',
    },
    
    navLink: {
      padding: '12px 15px',
      fontSize: '0.9rem',
    },
    
    sectionTitleH2: {
      fontSize: '2rem',
    },

    reviewItem: {
      flexDirection: 'column',
      gap: '15px',
    },

    reviewAvatar: {
      width: '50px',
      height: '50px',
    },

    detailRow: {
      flexDirection: 'column',
      gap: '5px',
    },

    detailLabel: {
      width: '100%',
    },

    productTags: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
    },
  },

  /* Loading and Error States */
  textCenter: {
    textAlign: 'center',
  },

  py5: {
    paddingTop: '3rem',
    paddingBottom: '3rem',
  },

  mt3: {
    marginTop: '1rem',
  },
};

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
  return <div style={styles.ratingStars}>{stars}</div>;
};

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoverStates, setHoverStates] = useState({
    addToCart: false,
    quantityButtons: false,
    tags: false,
    thumbnails: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await productsAPI.getProduct(id);
        console.log('✅ Product fetched:', response.data);
        setProduct(response.data);
        
        // Set first image as selected
        if (response.data.images && response.data.images.length > 0) {
          setSelectedImage(0);
        }
        
        // Fetch related products
        const allProductsResponse = await productsAPI.getProducts();
        const related = allProductsResponse.data
          .filter(p => p._id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
        
      } catch (err) {
        console.error('❌ Failed to load product:', err);
        setError('Failed to load product details');
        toast.error('Product not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "/default-burger.jpg";
    if (imgPath.startsWith('http')) return imgPath;
    if (imgPath.startsWith('/uploads')) {
      return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${imgPath}`;
    }
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${imgPath}`;
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.warning("Please login to add items to cart");
      return;
    }

    try {
      const productData = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      };
      
      await addToCart(productData, quantity);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const handleHover = (element, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [element]: isHovering
    }));
  };

  const getButtonStyle = () => {
    if (!user) {
      return { ...styles.addToCartBtn, ...styles.addToCartBtnDisabled };
    }
    if (hoverStates.addToCart) {
      return { ...styles.addToCartBtn, ...styles.addToCartBtnHover };
    }
    return styles.addToCartBtn;
  };

  const getQuantityButtonStyle = () => {
    if (hoverStates.quantityButtons) {
      return { ...styles.quantityButton, ...styles.quantityButtonHover };
    }
    return styles.quantityButton;
  };

  const getTagStyle = () => {
    if (hoverStates.tags) {
      return { ...styles.tagItem, ...styles.tagItemHover };
    }
    return styles.tagItem;
  };

  const getThumbnailStyle = (index) => {
    const baseStyle = styles.thumbnailItem;
    if (selectedImage === index || hoverStates.thumbnails) {
      return { ...baseStyle, ...styles.thumbnailItemHover };
    }
    return baseStyle;
  };

  if (loading) {
    return (
      <div style={{ ...styles.textCenter, ...styles.py5 }}>
        <Spinner animation="border" variant="warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p style={styles.mt3}>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <Container style={styles.py5}>
        <Alert variant="danger" style={styles.textCenter}>
          <h4>Product Not Found</h4>
          <p>{error}</p>
          <Link to="/menu" className="btn btn-primary mt-3">
            Back to Menu
          </Link>
        </Alert>
      </Container>
    );
  }

  const breadcrumbItems = [
    { label: 'HOME', url: '/' },
    { label: 'MENU', url: '/menu' },
    { label: product.name.toUpperCase() }
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: 'SEAN MCMARTHY',
      date: 'December 4, 2020',
      rating: 4,
      avatar: '/images/review/review-1.jpg',
      text: 'Etiam sapien sem at sagittis congue an augue massa varius egestas a suscipit magna tempus aliquet porta vitae auctor mauris blandit tempor gravida donec a magna velit imperdiet tempor. Semper lacus cursus porta lectus enim ipsum.'
    },
    {
      id: 2,
      name: 'LESLIE SERPAS',
      date: 'November 28, 2020',
      rating: 4,
      avatar: '/images/review/review-2.jpg',
      text: 'Etiam sapien sem at sagittis congue an augue massa varius egestas a suscipit magna tempus aliquet porta vitae auctor maurum blandit tempor gravida donec a magna velit imperdiet tempor lacus.'
    },
    {
      id: 3,
      name: 'ROBERT PETERSON',
      date: 'November 11, 2020',
      rating: 4,
      avatar: '/images/review/review-3.jpg',
      text: 'Etiam sapien sem at sagittis congue an augue massa varius egestas a suscipit magna tempus aliquet porta vitae auctor mauris blandit tempor gravida donec a magna velit imperdiet tempor. Semper lacus cursus porta lectus enim ipsum faucibus primis in ultrices cubilia volutpat undo auctor sed mauris donec et ipsum cum pretium.'
    }
  ];

  return (
    <>
      <Breadcrumb title={product.name.toUpperCase()} items={breadcrumbItems} />
      
      <section style={styles.productDetailSection}>
        <Container>
          <Row>
            {/* Product Images */}
            <Col lg={5} md={6}>
              <div style={styles.productImages}>
                <img
                  src={getImageUrl(product.images?.[selectedImage] || product.images?.[0])}
                  alt={product.name}
                  style={styles.mainProductImage}
                  onError={(e) => { e.target.src = '/default-burger.jpg'; }}
                />
                
                {product.images && product.images.length > 1 && (
                  <div style={styles.productThumbnails}>
                    {product.images.map((img, index) => (
                      <div
                        key={index}
                        style={getThumbnailStyle(index)}
                        onClick={() => setSelectedImage(index)}
                        onMouseEnter={() => handleHover('thumbnails', true)}
                        onMouseLeave={() => handleHover('thumbnails', false)}
                      >
                        <img
                          src={getImageUrl(img)}
                          alt={`${product.name} ${index + 1}`}
                          style={styles.thumbnailImage}
                          onError={(e) => { e.target.src = '/default-burger.jpg'; }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Col>

            {/* Product Info */}
            <Col lg={7} md={6}>
              <div className="product_info">
                <h1 style={styles.productInfo.h1}>{product.name}</h1>
                
                <div style={styles.productRating}>
                  {renderRatingIcons(product.rating || 4.5)}
                  <span style={styles.ratingNumber}>{(product.rating || 4.5).toFixed(1)}</span>
                  <span style={styles.customerReviews}>(3 Customer Reviews)</span>
                </div>

                <div style={styles.productPrice}>
                  <span style={styles.originalPrice}>${(product.price * 1.15).toFixed(2)}</span>
                  <span style={styles.salePrice}>${product.price.toFixed(2)}</span>
                </div>

                <p style={styles.productDescription}>
                  {product.description || 'Integer congue magna at pretium purus pretium ligula rutrum luctus risus eros dolor auctor ipsum blandit purus vehicula magna luctus tempor quisque vel laoreet turpis urna augue, viverra a augue eget, dictum tempor diam pulvinar consectetur purus efficitur ipsum primis in cubilia laoreet augue donec'}
                </p>

                {/* Product Details */}
                <div style={styles.productDetailsTable}>
                  <div style={styles.detailRow}>
                    <div style={styles.detailLabel}>Portion Size:</div>
                    <div style={styles.detailValue}>300g</div>
                  </div>
                  <div style={styles.detailRow}>
                    <div style={styles.detailLabel}>Calories:</div>
                    <div style={styles.detailValue}>680KJ</div>
                  </div>
                  <div style={styles.detailRow}>
                    <div style={styles.detailLabel}>Allergies:</div>
                    <div style={styles.detailValue}>Lactose, Gluten, Mustard</div>
                  </div>
                </div>

                {/* Tags */}
                <div style={styles.productTags}>
                  <strong>Tags:</strong>
                  <Link 
                    to="/menu" 
                    style={getTagStyle()}
                    onMouseEnter={() => handleHover('tags', true)}
                    onMouseLeave={() => handleHover('tags', false)}
                  >
                    Burgers
                  </Link>
                  <Link 
                    to="/menu" 
                    style={getTagStyle()}
                    onMouseEnter={() => handleHover('tags', true)}
                    onMouseLeave={() => handleHover('tags', false)}
                  >
                    Fast Food
                  </Link>
                  <Link 
                    to="/menu" 
                    style={getTagStyle()}
                    onMouseEnter={() => handleHover('tags', true)}
                    onMouseLeave={() => handleHover('tags', false)}
                  >
                    Testo
                  </Link>
                </div>

                {/* Quantity & Add to Cart */}
                <div style={styles.productActions}>
                  <div style={styles.quantitySelector}>
                    <button 
                      style={getQuantityButtonStyle()}
                      onClick={() => handleQuantityChange(-1)}
                      onMouseEnter={() => handleHover('quantityButtons', true)}
                      onMouseLeave={() => handleHover('quantityButtons', false)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      style={styles.quantityInput}
                    />
                    <button 
                      style={getQuantityButtonStyle()}
                      onClick={() => handleQuantityChange(1)}
                      onMouseEnter={() => handleHover('quantityButtons', true)}
                      onMouseLeave={() => handleHover('quantityButtons', false)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  
                  <button
                    style={getButtonStyle()}
                    onClick={handleAddToCart}
                    disabled={!user}
                    onMouseEnter={() => handleHover('addToCart', true)}
                    onMouseLeave={() => handleHover('addToCart', false)}
                  >
                    <i className="bi bi-bag"></i>
                    Add to Cart
                  </button>
                </div>

                {/* Product Notes */}
                <div style={styles.productNotes}>
                  <ul style={styles.notesList}>
                    <li style={styles.notesItem}>
                      <span style={styles.notesItemBefore}></span>
                      We accept credit cards or cash in a courier
                    </li>
                    <li style={styles.notesItem}>
                      <span style={styles.notesItemBefore}></span>
                      Shipping cost is $2 (Free from $35)
                    </li>
                    <li style={styles.notesItem}>
                      <span style={styles.notesItemBefore}></span>
                      Order before noon for same-day dispatch
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>

          {/* Tabs Section */}
          <Row style={styles.productTabs}>
            <Col>
              <Tab.Container defaultActiveKey="description">
                <Nav variant="tabs" style={styles.navTabs}>
                  <Nav.Item>
                    <Nav.Link eventKey="description" style={styles.navLink}>
                      DESCRIPTION
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reviews" style={styles.navLink}>
                      REVIEWS (3)
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                
                <Tab.Content style={styles.tabContent}>
                  <Tab.Pane eventKey="description">
                    <div style={{ padding: '1rem 0' }}>
                      <p style={{ color: '#666', lineHeight: '1.8' }}>
                        {product.description || 'Integer congue magna at pretium purus pretium ligula rutrum luctus risus eros dolor auctor ipsum blandit purus vehicula magna luctus tempor quisque vel laoreet turpis urna augue, viverra a augue eget, dictum tempor diam pulvinar consectetur purus efficitur ipsum primis in cubilia laoreet augue donec'}
                      </p>
                      <p style={{ color: '#666', lineHeight: '1.8', marginTop: '20px' }}>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                      </p>
                    </div>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="reviews">
                    <div style={styles.reviewsList}>
                      {reviews.map((review) => (
                        <div key={review.id} style={styles.reviewItem}>
                          <div style={styles.reviewAvatar}>
                            <img
                              src={review.avatar}
                              alt={review.name}
                              style={styles.reviewAvatarImg}
                              onError={(e) => { e.target.src = '/default-avatar.jpg'; }}
                            />
                          </div>
                          <div style={styles.reviewContent}>
                            <div style={styles.reviewHeader}>
                              <div>
                                <div style={styles.reviewerName}>{review.name}</div>
                                <div style={styles.reviewDate}>{review.date}</div>
                              </div>
                            </div>
                            <div style={styles.reviewRating}>
                              {renderRatingIcons(review.rating)}
                            </div>
                            <p style={styles.reviewText}>{review.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Related Products */}
      <section style={styles.relatedProductsSection}>
        <Container>
          <div style={styles.sectionTitle}>
            <h2 style={styles.sectionTitleH2}>RELATED PRODUCTS</h2>
            <p style={styles.sectionTitleP}>Aliquam a augue suscipit, luctus neque purus ipsum neque undo dolor primis libero tempus, blandit a cursus varius magna</p>
          </div>
          
          <Row>
            {relatedProducts.map((item) => (
              <Cards
                key={item._id}
                id={item._id}
                image={
                  item.images && item.images.length > 0
                    ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${item.images[0]}`
                    : "/default-burger.jpg"
                }
                rating={item.rating || 0}
                title={item.name}
                paragraph={item.description}
                price={item.price}
                renderRatingIcons={renderRatingIcons}
                user={user}
              />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ProductDetail;