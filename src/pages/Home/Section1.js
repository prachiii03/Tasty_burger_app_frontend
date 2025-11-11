

import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import Burger from "../../assets/hero/hero-2.png";
import Burger2 from "../../assets/hero/burger-removebg-preview.png";
import PriceBadge from "../../assets/hero/price-badge-yellow.png";

const Section1 = () => (
  <section className="hero_section">
    <Container>
      <Row>
        <Carousel
          prevIcon={
            <span style={{ marginLeft: '-220px',filter: 'invert(1)' }} className="carousel-control-prev-icon" />
          }
          nextIcon={
            <span style={{ marginRight: '-220px',filter: 'invert(1)' }} className="carousel-control-next-icon" />
          }
        >
          {/* First Slide: Original content */}
          <Carousel.Item>
            <Row>
              <Col lg={7} className="mb-5 mb-lg-0">
                <div className="position-relative">
                  <img src={Burger} className="img-fluid" alt="Hero" />
                  <div className="price_badge">
                    <div className="badge_text">
                      <h4 className="h4_xs">Only</h4>
                      <h4 className="h3_lg">$6.99</h4>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={5}>
                <div className="hero_text text-center">
                  <h1 className="text-white">New Burger</h1>
                  <h2 className="text-white">With Onion</h2>
                  <p className="text-white pt-2 pb-4">
                    Sinks your teeth into our freshly grilled burger topped with
                    caramelized onions, melted cheese, and crisp lettuce. Juicy,
                    flavorful, and made with 100% premium ingredients — it's the
                    perfect bite every time.
                  </p>
                  <a href="#section3" className="btn order_now">
                    Order Now
                  </a>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
          
          {/* Second Slide: New design with background color */}
          <Carousel.Item>
            <div style={{ 
              backgroundColor: '#f5f1e8',
              position: 'relative',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw',
              width: '100vw',
              marginTop: '-170px',
              marginBottom: '-90px',
              padding: '170px 0 90px 0'
            }}>
              <Container>
                <Row className="align-items-center">
                  <Col lg={6}>
                    <div className="hero_text" style={{ paddingLeft: '40px' }}>
                      <p style={{ 
                        color: '#c59d5f', 
                        fontSize: '23px', 
                        fontWeight: '500',
                        marginBottom: '15px',
                        letterSpacing: '2px'
                      }}>
                        THE ORIGINAL BURGER
                      </p>
                      <h1 style={{ 
                        fontSize: '6.9rem', 
                        fontWeight: 'bold',
                        color: '#2d2d2d',
                        marginBottom: '20px',
                        lineHeight: '1'
                      }}>
                        SAVORY &<br />DELICIOUS
                      </h1>
                      <p style={{ 
                        color: '#999', 
                        fontSize: '19px',
                        marginBottom: '30px',
                        maxWidth: '450px'
                      }}>
                        Delicious burgers made from high-quality Australian beef, carefully processed
                        to create a juicy and flavorful taste.
                      </p>
                      <div style={{ display: 'flex', gap: '15px' }}>
                       <a href="#section3"style={{
                          backgroundColor: '#c59d5f',
                          color: '#fff',
                          padding: '12px 30px',
                          borderRadius: '5px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          display: 'inline-block'
                        }}>
                          Explore Now
                        </a>
                       <a href="#section3"style={{
                          backgroundColor: 'transparent',
                          color: '#c59d5f',
                          padding: '12px 30px',
                          borderRadius: '5px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          border: '2px solid #c59d5f',
                          display: 'inline-block'
                        }}>
                          See Menu →
                        </a>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="position-relative text-center">
                      <img 
                        src={Burger2} 
                        className="img-fluid" 
                        alt="Burger" 
                        style={{ maxWidth: '150%', transform: 'scale(1.5)' }}
                      />
                      <div className="price_badge" style={{
                        position: 'absolute',
                        top: '-85px',
                        right: '10px'
                      }}>
                        <img src={PriceBadge} alt="Price Badge" style={{ width: '120px' }} />
                        <div className="badge_text" style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}>
                          <h4 style={{ fontSize: '14px', margin: '0', color: '#2d2d2d' }}>Only</h4>
                          <h4 style={{ fontSize: '28px', margin: '0', fontWeight: 'bold', color: '#2d2d2d' }}>$6.99</h4>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </Row>
    </Container>
  </section>
);

export default Section1;