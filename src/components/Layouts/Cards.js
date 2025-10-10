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

  // Sync with global wishlist state
  useEffect(() => {
    setIsWishlistItem(isInWishlist(id));
  }, [isInWishlist, id]);

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
      // The state will update automatically via the AuthContext
    } catch (error) {
      toast.error(error.message || "Failed to update wishlist");
    } finally {
      setLocalLoading(false);
    }
  };

  const isLoading = wishlistLoading || localLoading;

  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden h-100 shadow-sm product-card">
        <div className="overflow-hidden position-relative">
          <Card.Img 
            variant="top" 
            src={image} 
            className="img-fluid"
            style={{ height: "200px", objectFit: "cover" }}
          />
          
          {/* Wishlist Button */}
          <button
            className={`position-absolute top-0 end-0 m-2 border-0 rounded-circle ${
              isWishlistItem ? "bg-danger" : "bg-light"
            }`}
            style={{
              width: "40px",
              height: "40px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onClick={handleWishlist}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" className="text-danger" />
            ) : (
              <i 
                className={`bi ${isWishlistItem ? "bi-heart-fill" : "bi-heart"} ${
                  isWishlistItem ? "text-white" : "text-danger"
                }`}
              ></i>
            )}
          </button>

          {rating && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-warning text-dark">
                <i className="bi bi-star-fill me-1"></i>
                {rating}
              </span>
            </div>
          )}
        </div>

        <Card.Body className="d-flex flex-column p-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="item_rating">
              {renderRatingIcons && renderRatingIcons(rating)}
            </div>
          </div>

          <Card.Title className="mb-2 fs-6 fw-bold">
            {title}
          </Card.Title>

          <Card.Text className="mb-3 flex-grow-1 text-muted small">
            {paragraph}
          </Card.Text>

          <div className="d-flex align-items-center justify-content-between mt-auto">
            <div className="menu_price">
              <h5 className="mb-0 text-white">${price.toFixed(2)}</h5>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm"
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