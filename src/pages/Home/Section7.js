import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Section7() {
  return (
    <section className="contact_section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={8} className="text-center">
            <h4>Our Promise</h4>
            <h2>Fast & Reliable Delivery in 30 Minutes!</h2>
            <p>
              Enjoy hot, fresh meals delivered straight to your door in just 30 minutes. 
              We prioritize speed, quality, and your satisfaction with every order.
            </p>
            <Link to="tel:9998887777" className="btn btn_red px-4 py-2 rounded-0">
              Call Now: 999-888-7777
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Section7;
