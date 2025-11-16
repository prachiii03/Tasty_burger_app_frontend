import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pizza from "../../assets/about/pizza.png";
import Salad from "../../assets/about/salad.png";
import Delivery from "../../assets/about/delivery-bike.png";

// Updated Data Cards
const mockData = [
  {
    image: Pizza,
    title: "Original Recipes",
    paragraph: `Our burgers are crafted with secret spices and fresh ingredients that bring out bold, authentic flavors in every bite.`,
  },
  {
    image: Salad,
    title: "Quality Ingredients",
    paragraph: `We use only the freshest vegetables, premium cheese, and 100% pure meat to serve food that’s tasty and healthy.`,
  },
  {
    image: Delivery,
    title: "Fast Delivery",
    paragraph: `Craving satisfied in no time! Our super-fast delivery ensures your meal reaches you hot, fresh, and right on time.`,
  },
];

function Section2() {
  return (
    <>
      <section className="about_section" >
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center">
              <h2>Burgers taste even better when shared with family</h2>
              <p>
                Enjoy the perfect combination of freshly grilled patties,
                crunchy veggies, and delicious sauces — made to bring everyone
                around the table together.
              </p>
             <Link to="/menu" className="btn order_now btn_red" style={{backgroundColor: '#8B2632'}}>
  Explore Full Menu
</Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about_wrapper">
        <Container>
          <Row className="justify-content-md-center">
            {mockData.map((cardData, index) => (
              <Col md={6} lg={4} className="mb-4 mb-md-0" key={index}>
                <div className="about_box text-center">
                  <div className="about_icon">
                    <img
                      src={cardData.image}
                      className="img-fluid"
                      alt={cardData.title}
                    />
                  </div>
                  <h4>{cardData.title}</h4>
                  <p>{cardData.paragraph}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Section2;
