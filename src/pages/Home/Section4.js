import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PromotionImage from "../../assets/promotion/pro.png";

function Section4() {
  return (
    <>
      {/* About Page Section */}
      <section className="promotion_section">
        <Container>
          <Row className="align-items-center">
            {/* Left Image */}
            <Col lg={6} className="text-center mb-5 mb-lg-0">
              <img
                src={PromotionImage}
                className="img-fluid"
                alt="Promotion"
              />
            </Col>

            {/* Right Content */}
            <Col lg={6} className="px-5">
              <h2>Nothing Brings People Together Like a Great Burger</h2>
              <p>
                At our restaurant, we craft every burger with the freshest ingredients, 
                juicy patties, and perfectly toasted buns. Every bite is packed with flavor 
                and made to share with friends and family.
              </p>
              <ul>
                <li>
                  <p>100% fresh, locally sourced ingredients for unbeatable taste</p>
                </li>
                <li>
                  <p>Variety of gourmet toppings to customize your perfect burger</p>
                </li>
                <li>
                  <p>Fast, friendly service to ensure a memorable dining experience</p>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Background Parallax Scroll */}
      <section className="bg_parallax_scroll"></section>
    </>
  );
}

export default Section4;
