import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import User1 from "../../assets/blog/review-author-1.jpg";
import User2 from "../../assets/blog/review-author-2.jpg";
import User3 from "../../assets/blog/review-author-3.jpg";
import User4 from "../../assets/blog/review-author-5.jpg";
import Preview from "../../assets/hero/preview-removebg-preview.png";
import Preview2 from "../../assets/hero/preview_2-removebg-preview.png";
import Preview3 from "../../assets/hero/preview_3-removebg-preview.png";
import Preview4 from "../../assets/hero/preview_4-removebg-preview.png";
import BackgroundImage from "../../assets/hero/download.png";

function Section6() {
  return (
    <>
      {/* Original Section 6 - Reviews */}
      <section className="blog_section">
        <Container>
          <Row>
            <Carousel>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="user_img">
                    <img src={User1} className="img-fluid" alt="User-1" />
                  </div>
                  <p>
                    "The customer service was exceptional, and the team went
                    above and beyond to ensure my order arrived on time. Highly
                    recommended!"
                  </p>
                  <div className="item_rating mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h5>BY AMELIE NEWLOVE</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="user_img">
                    <img src={User2} className="img-fluid" alt="User-2" />
                  </div>
                  <p>
                    "I am extremely satisfied with the quality of the products.
                    Everything exceeded my expectations, from packaging to
                    delivery."
                  </p>
                  <div className="item_rating mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h5>BY JAMES CARTER</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="user_img">
                    <img src={User3} className="img-fluid" alt="User-3" />
                  </div>
                  <p>
                    "The interface was so easy to use, and the support team was
                    always available to guide me. Definitely a 5-star
                    experience."
                  </p>
                  <div className="item_rating mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h5>BY SOPHIA WILSON</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="user_img">
                    <img src={User4} className="img-fluid" alt="User-4" />
                  </div>
                  <p>
                    "Fast delivery, excellent packaging, and a fantastic
                    shopping experience overall. I will definitely return for
                    more purchases."
                  </p>
                  <div className="item_rating mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h5>BY LIAM ANDERSON</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
      </section>

      {/* New Promo Section */}
      <section
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "100px 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="align-items-center">
            {/* LEFT TEXT */}
            <Col lg={5}>
              <div style={{ paddingLeft: "40px" }}>
                <h2
                  style={{
                    fontSize: "4.5rem",
                    fontWeight: "bold",
                    color: "#fff",
                    lineHeight: "1.1",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  THE <br />
                  <span style={{ fontSize: "5.5rem" }}>COUNTY</span>
                  <br />
                  <span style={{ fontSize: "5.5rem" }}>GENERAL</span>
                </h2>

                <p
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    marginBottom: "30px",
                    maxWidth: "400px",
                    opacity: "0.95",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Semper lacus cursus porta a primis feugiat ligula risus auctor
                  rhoncus semper undo
                </p>

                <a
                  href="#order"
                  style={{
                    backgroundColor: "#e50914",
                    color: "#fff",
                    padding: "15px 40px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontWeight: "700",
                    display: "inline-block",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#c3070f";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#e50914";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  ORDER NOW
                </a>
              </div>
            </Col>

            {/* RIGHT SIDE (BURGER + BADGE + CARDS) */}
            <Col lg={7}>
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  height: "600px",
                }}
              >
                {/* Main Burger - Increased Size */}
                <img
                  src={Preview}
                  alt="Main Burger"
                  style={{
                    maxWidth: "95%",
                    position: "relative",
                    zIndex: 2,
                    marginLeft: "-180px",
                    transform: "scale(1.2)",
                    filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))",
                  }}
                />

                {/* Price Badge with Price */}
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "55%",
                    transform: "translateX(-50%)",
                    width: "170px",
                    height: "170px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    zIndex: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                    border: "4px solid #fff",
                    animation: "pulse 2s infinite",
                  }}
                >
                  {/* Image Background */}
                  <img
                    src={Preview2}
                    alt="Discount Badge"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                  
                  {/* Price Text */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                      color: "#fff",
                      textAlign: "center",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "2px" }}>ONLY</div>
                    <div style={{ fontSize: "28px", fontWeight: "900", lineHeight: "1" }}>$9.99</div>
                    <div style={{ fontSize: "11px", fontWeight: "600", marginTop: "2px" }}>TODAY ONLY</div>
                  </div>
                </div>

                {/* Enhanced Cards */}
                <div
                  style={{
                    position: "absolute",
                    right: "-60px",
                    top: "12%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                    zIndex: 3,
                  }}
                >
                  {/* Card 1 - Enhanced */}
                  <div
                    style={{
                      padding: "20px 15px",
                      borderRadius: "20px",
                      textAlign: "center",
                      border: "3px solid rgba(255, 255, 255, 0.8)",
                      width: "180px",
                      cursor: "pointer",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
                      transition: "all 0.4s ease",
                      backdropFilter: "blur(12px)",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.08) translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                      e.currentTarget.style.borderColor = "#ffb300";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.8)";
                    }}
                  >
                    {/* Popular Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "#e50914",
                        color: "#fff",
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "9px",
                        fontWeight: "800",
                        textTransform: "uppercase",
                      }}
                    >
                      Popular
                    </div>
                    
                    <img
                      src={Preview3}
                      alt="Classic Burger"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginBottom: "12px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        border: "2px solid rgba(255, 255, 255, 0.5)",
                      }}
                    />
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "800",
                        margin: "0 0 6px 0",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                      }}
                    >
                      Classic Burger
                    </h4>
                    <div
                      style={{
                        color: "#ffb300",
                        fontSize: "18px",
                        fontWeight: "900",
                        marginBottom: "5px",
                      }}
                    >
                      $11.99
                    </div>
                    <div style={{ color: "#fff", fontSize: "10px", opacity: "0.9" }}>
                      Beef • Cheese • Lettuce
                    </div>
                  </div>

                  {/* Card 2 - Enhanced */}
                  <div
                    style={{
                      padding: "20px 15px",
                      borderRadius: "20px",
                      textAlign: "center",
                      border: "3px solid rgba(255, 255, 255, 0.8)",
                      width: "180px",
                      cursor: "pointer",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
                      transition: "all 0.4s ease",
                      backdropFilter: "blur(12px)",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.08) translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                      e.currentTarget.style.borderColor = "#ffb300";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.8)";
                    }}
                  >
                    {/* New Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "#ffb300",
                        color: "#000",
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "9px",
                        fontWeight: "800",
                        textTransform: "uppercase",
                      }}
                    >
                      New
                    </div>
                    
                    <img
                      src={Preview4}
                      alt="Ultimate Bacon Burger"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginBottom: "12px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        border: "2px solid rgba(255, 255, 255, 0.5)",
                      }}
                    />
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "800",
                        margin: "0 0 6px 0",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                      }}
                    >
                      Ultimate Bacon
                    </h4>
                    <div
                      style={{
                        color: "#ffb300",
                        fontSize: "18px",
                        fontWeight: "900",
                        marginBottom: "5px",
                      }}
                    >
                      $14.99
                    </div>
                    <div style={{ color: "#fff", fontSize: "10px", opacity: "0.9" }}>
                      Double Beef • Bacon • Cheese
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Add CSS animation */}
        <style>
          {`
            @keyframes pulse {
              0% { transform: translateX(-50%) scale(1); }
              50% { transform: translateX(-50%) scale(1.05); }
              100% { transform: translateX(-50%) scale(1); }
            }
          `}
        </style>
      </section>
    </>
  );
}

export default Section6;