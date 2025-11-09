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
                    "The customer service was exceptional, and the team went above 
                    and beyond to ensure my order arrived on time. Highly recommended!"
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
                    Everything exceeded my expectations, from packaging to delivery."
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
                    always available to guide me. Definitely a 5-star experience."
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
                    "Fast delivery, excellent packaging, and a fantastic shopping 
                    experience overall. I will definitely return for more purchases."
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
        background: "radial-gradient(circle at center, #ffb300, #ff9800)",
        padding: "80px 0",
        overflow: "hidden",
      }}
    >
      <Container>
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
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#c3070f")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#e50914")}
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
              }}
            >
              {/* Main Burger */}
              <img
                src={Preview}
                alt="Main Burger"
                style={{
                  maxWidth: "85%",
                  position: "relative",
                  zIndex: 2,
                  marginLeft: "-80px",
                }}
              />

              {/* Price Badge - moved up */}
            <div
  style={{
    position: "absolute",
    top: "10px", // keep it high above burger
    left: "62%", // adjust to match burger position
    transform: "translateX(-50%)",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
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

  {/* Text on top of badge */}
  {/* <div
    style={{
      position: "relative",
      zIndex: 2,
      color: "#fff",
      textAlign: "center",
      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
      padding: "10px",
    }}
  >
    <p
      style={{
        margin: 0,
        fontSize: "18px",
        fontWeight: "700",
        textTransform: "uppercase",
      }}
    >
      Only
    </p>
    <h3
      style={{
        margin: "5px 0",
        fontSize: "34px",
        fontWeight: "900",
      }}
    >
      $9.99
    </h3>
    <p
      style={{
        fontSize: "13px",
        margin: 0,
        opacity: "0.9",
      }}
    >
      Code: 0841
    </p>
  </div> */}
</div>

              {/* Right Cards - moved more to right */}
              <div
                style={{
                  position: "absolute",
                  right: "-80px", // shifted more right
                  top: "8%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                  zIndex: 3,
                }}
              >
                {/* Card 1 */}
                <div
                  style={{
                    backgroundColor: "rgba(255, 152, 0, 0.95)",
                    padding: "20px 25px",
                    borderRadius: "15px",
                    textAlign: "center",
                    border: "2px solid rgba(255, 255, 255, 0.6)",
                    width: "200px",
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={Preview3}
                    alt="Ultimate Bacon Burger"
                    style={{
                      width: "100px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "700",
                      margin: 0,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    Ultimate Bacon <br /> Burger
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  style={{
                    backgroundColor: "rgba(255, 152, 0, 0.95)",
                    padding: "20px 25px",
                    borderRadius: "15px",
                    textAlign: "center",
                    border: "2px solid rgba(255, 255, 255, 0.6)",
                    width: "200px",
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={Preview4}
                    alt="Grilled Chicken Burger"
                    style={{
                      width: "100px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "700",
                      margin: 0,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    Grilled Chicken <br /> Burger
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
}

export default Section6;