import React, { useContext, useState, useEffect } from "react";
import { Col, Card, Spinner } from "react-bootstrap";
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Cards({ id, image, rating, title, paragraph, price, renderRatingIcons }) {
  const { addToCart } = useContext(CartContext);
  const { 
    user, 
    isInWishlist, 
    toggleWishlist, 
    wishlistLoading 
  } = useContext(AuthContext);
  
  const [isWishlistItem, setIsWishlistItem] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Sync with global wishlist state
  useEffect(() => {
    const inWishlist = isInWishlist(id);
    setIsWishlistItem(inWishlist);
  }, [isInWishlist, id]);

  // Fix image URL construction
  const getImageUrl = (imgPath) => {
    if (!imgPath) {
      console.log('❌ No image path provided');
      return "/default-burger.jpg";
    }
    
    // If it's already a full URL, return as is
    if (imgPath.startsWith('http')) {
      console.log('✅ Already full URL:', imgPath);
      return imgPath;
    }
    
    // If it starts with /uploads, construct full URL
    if (imgPath.startsWith('/uploads')) {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const fullUrl = `${baseUrl}${imgPath}`;
      console.log('🔗 Constructed uploads URL:', fullUrl);
      return fullUrl;
    }
    
    // If it's just a filename, construct path
    const fullUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${imgPath}`;
    console.log('📁 Constructed filename URL:', fullUrl);
    return fullUrl;
  };

  const imageUrl = getImageUrl(image);

  const handleAddToCart = async () => {
    if (!user) {
      toast.warning("Please login to add items to the cart");
      return;
    }

    try {
      const productData = {
        _id: id,
        name: title,
        price: price,
        image: image,
      };
      
      await addToCart(productData, 1);
      toast.success(`${title} added to cart!`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.warning("Please login to add items to favorites");
      return;
    }

    setLocalLoading(true);
    try {
      await toggleWishlist(id);
      
      // Show success message based on the new state
      if (!isWishlistItem) {
        toast.success(`❤️ ${title} added to favorites!`);
      } else {
        toast.info(`💔 ${title} removed from favorites`);
      }
      
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error(error.message || "Failed to update wishlist");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleImageError = (e) => {
    console.error(`❌ Failed to load image: ${imageUrl}`);
    setImageError(true);
    e.target.src = "/default-burger.jpg";
  };

  const handleImageLoad = () => {
    console.log(`✅ Image loaded successfully: ${imageUrl}`);
    setImageError(false);
  };

  const isLoading = wishlistLoading || localLoading;

  // Debug logging
  useEffect(() => {
    console.log(`🔄 Card ${id} - Wishlist: ${isWishlistItem}, Image: ${imageUrl}`);
  }, [id, isWishlistItem, imageUrl]);

  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden h-100 shadow-sm product-card">
        <div className="overflow-hidden position-relative">
          <Card.Img 
            variant="top" 
            src={imageError ? "/default-burger.jpg" : imageUrl}
            alt={title}
            className="img-fluid"
            style={{ 
              height: "200px", 
              objectFit: "cover",
              backgroundColor: imageError ? '#f8f9fa' : 'transparent'
            }}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          
          {/* Wishlist Button */}
          <button
            className={`position-absolute top-0 end-0 m-2 border-0 rounded-circle ${
              isWishlistItem ? "bg-danger" : "bg-light"
            } ${isLoading ? 'opacity-50' : ''}`}
            style={{
              width: "40px",
              height: "40px",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleWishlist}
            disabled={isLoading}
            title={isWishlistItem ? "Remove from favorites" : "Add to favorites"}
          >
            {isLoading ? (
              <Spinner 
                animation="border" 
                size="sm" 
                className={isWishlistItem ? "text-white" : "text-danger"} 
              />
            ) : (
              <i 
                className={`bi ${isWishlistItem ? "bi-heart-fill" : "bi-heart"} ${
                  isWishlistItem ? "text-white" : "text-danger"
                } fs-6`}
              ></i>
            )}
          </button>

          {rating > 0 && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-warning text-dark">
                <i className="bi bi-star-fill me-1"></i>
                {rating.toFixed(1)}
              </span>
            </div>
          )}

          {/* Image Error Indicator */}
          {imageError && (
            <div className="position-absolute bottom-0 start-0 end-0 bg-warning text-dark text-center small p-1">
              Image not available
            </div>
          )}
        </div>

        <Card.Body className="d-flex flex-column p-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="item_rating">
              {renderRatingIcons && renderRatingIcons(rating)}
            </div>
          </div>

          <Card.Title className="mb-2 fs-6 fw-bold text-truncate" title={title}>
            {title}
          </Card.Title>

          <Card.Text className="mb-3 flex-grow-1 text-muted small line-clamp-3">
            {paragraph}
          </Card.Text>

          <div className="d-flex align-items-center justify-content-between mt-auto">
            <div className="menu_price">
              <h5 className="mb-0 text-white">${price.toFixed(2)}</h5>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm d-flex align-items-center"
              disabled={!user}
              title={!user ? "Please login to add to cart" : "Add to cart"}
            >
              <i className="bi bi-bag me-1"></i>
              Add To Cart
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cards;