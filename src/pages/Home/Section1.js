// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import Burger from "../../assets/hero/hero-2.png";
// import { Link } from "react-router-dom";

// const Section1 = () => {
//   return (
//     <section className="hero_section">
//       <Container>
//         <Row>
//           <Col lg={7} className="mb-5 mb-lg-0">
//             <div className="position-relative">
//               <img src={Burger} className="img-fluid" alt="Hero" />
//               <div className="price_badge">
//                 <div className="badge_text">
//                   <h4 className="h4_xs">Only</h4>
//                   <h4 className="h3_lg">$6.99</h4>
//                 </div>
//               </div>
//             </div>
//           </Col>
//           <Col lg={5}>
//             <div className="hero_text text-center">
//               <h1 className="text-white">New Burger</h1>
//               <h2 className="text-white">With Onion</h2>
//               <p className="text-white pt-2 pb-4">
//                 Sinks your teeth into our freshly grilled burger topped with
//                 caramelized onions, melted cheese, and crisp lettuce. Juicy,
//                 flavorful, and made with 100% premium ingredients — it’s the
//                 perfect bite every time.
//               </p>
//               <Link to="/" className="btn order_now">
//                 Order Now
//               </Link>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Section1;
// // **Section1.js**

// // import React from "react";
// // import { Container, Row, Col, Carousel } from "react-bootstrap";
// // // Original burger image
// import Burger from "../../assets/hero/hero-2.png";
// // New burger image for the second slide, assuming you save it as burger1.png in src/assets/hero
// import burger1 from "../../assets/hero/burger1.png"; 
// import { Link } from "react-router-dom";

// // Note: The 'hero1' background image (image_94ca01.jpg) must be applied 
// // using CSS to the '.hero_section' or the '.carousel-item' class.
// // This code assumes your CSS already handles this for the '.hero_section' class.

// const Section1 = () => {
//   return (
//     // The existing 'hero_section' class, which should contain your hero1 background image via CSS
//     <section className="hero_section"> 
      
//       {/* React-Bootstrap Carousel for sliding effect */}
//       <Carousel controls={true} indicators={true} interval={5000} pause='hover'> 
        
//         {/* === FIRST CAROUSEL SLIDE (Original Code, unchanged structure) === */}
//         <Carousel.Item> 
//           <Container>
//             <Row>
//               <Col lg={7} className="mb-5 mb-lg-0">
//                 <div className="position-relative">
//                   <img src={Burger} className="img-fluid" alt="New Burger" />
//                   <div className="price_badge">
//                     <div className="badge_text">
//                       <h4 className="h4_xs">Only</h4>
//                       <h4 className="h3_lg">$6.99</h4>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//               <Col lg={5}>
//                 <div className="hero_text text-center">
//                   <h1 className="text-white">New Burger</h1>
//                   <h2 className="text-white">With Onion</h2>
//                   <p className="text-white pt-2 pb-4">
//                     Sinks your teeth into our freshly grilled burger topped with
//                     caramelized onions, melted cheese, and crisp lettuce. Juicy,
//                     flavorful, and made with 100% premium ingredients — it’s the
//                     perfect bite every time.
//                   </p>
//                   <Link to="/" className="btn order_now">
//                     Order Now
//                   </Link>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </Carousel.Item>

//         {/* --- SECOND CAROUSEL SLIDE (New Content - Big Burger, Little Money) --- */}
//         <Carousel.Item> 
//           <Container className="text-center">
//             <Row className="justify-content-center align-items-center" style={{ minHeight: '400px' }}>
              
//               {/* Main Text Container */}
//               <Col lg={12}>
//                 {/* Replicating the "BIG BURGER, LITTLE MONEY" text */}
//                 <h1 className="text-white fw-bold mb-3" 
//                   style={{ 
//                     fontSize: '4rem', 
//                     color: '#fff', 
//                     textShadow: '2px 2px 4px #000',
//                     lineHeight: '1.1'
//                   }}
//                 >
//                   BIG BURGER,
//                   <br />
//                   LITTLE MONEY
//                 </h1>
//               </Col>

//               {/* Burger Image Container with Price Badge */}
//               <Col lg={10} className="position-relative mt-4">
//                 {/* Image element for the three burgers from the second file */}
//                 <img 
//                   src={burger1} 
//                   className="d-block w-100 img-fluid" 
//                   alt="Big Burger, Little Money Deal" 
//                   style={{ maxHeight: '400px', objectFit: 'contain' }}
//                 />
                
//                 {/* Price Badge - positioned absolutely on the image */}
//                 <div 
//                   className="price_badge_promo" 
//                   style={{
//                     position: 'absolute',
//                     top: '0px', 
//                     right: '25%', // Adjust this for final positioning
//                     transform: 'translate(50%, -20%)', // Center and slightly lift off image
//                     backgroundColor: '#FFC72C', 
//                     borderRadius: '50%',
//                     padding: '15px 10px',
//                     textAlign: 'center',
//                     color: '#000',
//                     fontWeight: 'bold',
//                     boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
//                     zIndex: 10,
//                     width: '110px', 
//                     height: '110px', 
//                   }}
//                 >
//                   <div className="badge_text_2">
//                     <h5 className="h5_xs" style={{ margin: 0, fontSize: '1rem' }}>FROM</h5>
//                     <h3 className="h3_lg" style={{ margin: 0, fontSize: '2rem' }}>$6.99</h3>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//             {/* Optional Order Now Button for this slide */}
//             <Row className="mt-4">
//               <Col>
//                 <Link to="/" className="btn order_now">
//                   Order Now
//                 </Link>
//               </Col>
//             </Row>
//           </Container>
//         </Carousel.Item>
        
//       </Carousel>
//     </section>
//   );
// };

// export default Section1;


// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Star, Heart, Plus, ShoppingCart } from 'lucide-react';
// import { Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const Section1 = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [currentProductSlide, setCurrentProductSlide] = useState(0);

//   const slides = [
//     {
//       id: 1,
//       title: "SAVORY & DELICIOUS",
//       subtitle: "THE ORIGINAL BURGER",
//       description: "Delicious burgers made from high-quality Australian beef, carefully processed to create a juicy and flavorful taste.",
//       rating: "4.9",
//       price: "$6.99",
//       image: require('../../assets/hero/hero-2.png')
//     },
//     {
//       id: 2,
//       title: "New Burger",
//       subtitle: "With Onion",
//       description: "Sinks your teeth into our freshly grilled burger topped with caramelized onions, melted cheese, and crisp lettuce. Juicy, flavorful, and made with 100% premium ingredients — it's the perfect bite every time.",
//       rating: "4.9",
//       price: "$6.99",
//       image: require('../../assets/hero/hero-2.png')
//     }
//   ];

//   const products = [
//     {
//       id: 1,
//       name: "Hot Chicken Burger",
//       rating: 4.9,
//       price: "$5.66",
//       image: require('../../assets/hero/burger.jpg'),
//       special: true
//     },
//     {
//       id: 2,
//       name: "Veg & Chicken Combo",
//       rating: 4.4,
//       price: "$8.55",
//       image: require('../../assets/hero/burger.jpg')
//     },
//     {
//       id: 3,
//       name: "Chicken Cheese Burger",
//       rating: 4.7,
//       price: "$7.20",
//       image: require('../../assets/hero/burger.jpg')
//     },
//     {
//       id: 4,
//       name: "Classic Beef Burger",
//       rating: 4.6,
//       price: "$6.99",
//       image: require('../../assets/hero/burger.jpg')
//     },
//     {
//       id: 5,
//       name: "Spicy Supreme Burger",
//       rating: 4.8,
//       price: "$9.20",
//       image: require('../../assets/hero/burger.jpg')
//     },
//     {
//       id: 6,
//       name: "BBQ Special Burger",
//       rating: 4.5,
//       price: "$7.85",
//       image: require('../../assets/hero/burger.jpg')
//     }
//   ];

//   // Auto slide timer
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const nextProductSlide = () => {
//     setCurrentProductSlide((prev) => (prev + 1) % (products.length - 2));
//   };

//   const prevProductSlide = () => {
//     setCurrentProductSlide((prev) => (prev - 1 + (products.length - 2)) % (products.length - 2));
//   };

//   const visibleProducts = products.slice(currentProductSlide, currentProductSlide + 3);

//   return (
//     <>
//       <style>{`
//         /* Hero Section */
//         .hero-section {
//           position: relative;
//           background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fef9c3 100%);
//           overflow: hidden;
//           min-height: 100vh;
//           padding-top: 100px;
//           padding-bottom: 80px;
//         }

//         /* Decorative Background Blobs */
//         .decorative-blob {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.2;
//           filter: blur(60px);
//         }

//         .blob-1 {
//           top: 80px;
//           left: 40px;
//           width: 128px;
//           height: 128px;
//           background-color: #fed7aa;
//         }

//         .blob-2 {
//           bottom: 80px;
//           right: 40px;
//           width: 160px;
//           height: 160px;
//           background-color: #fde68a;
//         }

//         /* Container */
//         .hero-container {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 24px;
//         }

//         /* Hero Content Grid */
//         .hero-content {
//           position: relative;
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 48px;
//           align-items: center;
//           margin-bottom: 80px;
//         }

//         @media (min-width: 1024px) {
//           .hero-content {
//             grid-template-columns: 1fr 1fr;
//           }
//         }

//         /* Text Content */
//         .hero-text-content {
//           z-index: 10;
//         }

//         .hero-badge {
//           display: inline-block;
//           margin-bottom: 24px;
//         }

//         .badge-text {
//           color: #f97316;
//           font-weight: 500;
//           letter-spacing: 0.1em;
//           font-size: 0.875rem;
//           text-transform: uppercase;
//           padding: 8px 16px;
//           background-color: #ffedd5;
//           border-radius: 9999px;
//         }

//         .hero-title {
//           font-size: 4rem;
//           font-weight: 900;
//           color: #111827;
//           line-height: 1.1;
//           margin-bottom: 24px;
//         }

//         @media (min-width: 768px) {
//           .hero-title {
//             font-size: 4.5rem;
//           }
//         }

//         .title-ampersand {
//           color: #111827;
//         }

//         .hero-description {
//           color: #6b7280;
//           font-size: 1.125rem;
//           max-width: 28rem;
//           line-height: 1.75;
//           margin-bottom: 24px;
//         }

//         .hero-price {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #f97316;
//           margin-bottom: 24px;
//         }

//         /* Hero Buttons */
//         .hero-buttons {
//           display: flex;
//           gap: 16px;
//           padding-top: 16px;
//           flex-wrap: wrap;
//         }

//         .btn-primary {
//           padding: 16px 32px;
//           background: linear-gradient(to right, #f97316, #f59e0b);
//           color: white;
//           font-weight: 600;
//           border-radius: 12px;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .btn-primary:hover {
//           box-shadow: 0 10px 25px rgba(251, 146, 60, 0.3);
//           transform: scale(1.05);
//         }

//         .btn-secondary {
//           padding: 16px 32px;
//           background-color: white;
//           color: #f97316;
//           font-weight: 600;
//           border-radius: 12px;
//           border: 2px solid #f97316;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .btn-secondary:hover {
//           background-color: #fff7ed;
//         }

//         /* Hero Image Section */
//         .hero-image-wrapper {
//           position: relative;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .splash-effect {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .splash-effect::before {
//           content: '';
//           width: 384px;
//           height: 384px;
//           background: linear-gradient(135deg, #fde047, #fb923c);
//           border-radius: 50%;
//           opacity: 0.3;
//           filter: blur(60px);
//           animation: pulse 3s ease-in-out infinite;
//         }

//         @keyframes pulse {
//           0%, 100% {
//             opacity: 0.3;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.4;
//             transform: scale(1.05);
//           }
//         }

//         .burger-image-container {
//           position: relative;
//           z-index: 10;
//           transition: transform 0.5s ease;
//         }

//         .burger-image-container:hover {
//           transform: scale(1.05);
//         }

//         .burger-image-inner {
//           position: relative;
//         }

//         .burger-image {
//           width: 100%;
//           max-width: 512px;
//           filter: drop-shadow(0 25px 50px rgba(251, 146, 60, 0.3));
//         }

//         /* Rating Badge */
//         .rating-badge {
//           position: absolute;
//           top: 32px;
//           right: 32px;
//           background: linear-gradient(135deg, #f97316, #f59e0b);
//           color: white;
//           border-radius: 50%;
//           width: 80px;
//           height: 80px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//           transform: rotate(12deg);
//         }

//         .rating-content {
//           text-align: center;
//         }

//         .rating-number {
//           font-size: 1.5rem;
//           font-weight: 700;
//         }

//         .rating-star {
//           width: 16px;
//           height: 16px;
//           fill: white;
//           margin: 0 auto;
//         }

//         /* Hero Carousel Navigation */
//         .hero-carousel-nav-below {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 20px;
//           margin-top: 24px;
//         }

//         .hero-carousel-nav-below .carousel-nav-btn {
//           width: 56px;
//           height: 56px;
//           background-color: white;
//           border-radius: 50%;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .hero-carousel-nav-below .carousel-nav-btn:hover {
//           background: linear-gradient(to right, #f97316, #f59e0b);
//           color: white;
//           transform: scale(1.1);
//         }

//         /* Products Section */
//         .products-section {
//           margin-top: 60px;
//         }

//         .products-carousel-container {
//           position: relative;
//         }

//         .products-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 32px;
//         }

//         @media (max-width: 768px) {
//           .products-grid {
//             grid-template-columns: 1fr;
//           }
//         }

//         /* Product Carousel Buttons */
//         .product-carousel-btn {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           width: 56px;
//           height: 56px;
//           background: white;
//           border-radius: 50%;
//           box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 20;
//           transition: all 0.3s ease;
//         }

//         .product-carousel-btn:hover {
//           background: linear-gradient(to right, #f97316, #f59e0b);
//           color: white;
//           transform: translateY(-50%) scale(1.1);
//         }

//         .product-carousel-btn-left {
//           left: -28px;
//         }

//         .product-carousel-btn-right {
//           right: -28px;
//         }

//         /* Glass-like Product Card */
//         .product-card {
//           background: rgba(255, 255, 255, 0.25);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           border-radius: 24px;
//           padding: 32px;
//           box-shadow: 
//             0 8px 32px rgba(0, 0, 0, 0.1),
//             inset 0 1px 0 rgba(255, 255, 255, 0.6);
//           transition: all 0.3s ease;
//           position: relative;
//           overflow: hidden;
//         }

//         .product-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, 
//             transparent, 
//             rgba(255, 255, 255, 0.8), 
//             transparent
//           );
//         }

//         .product-card:hover {
//           box-shadow: 
//             0 16px 40px rgba(0, 0, 0, 0.15),
//             inset 0 1px 0 rgba(255, 255, 255, 0.8);
//           transform: translateY(-8px);
//           background: rgba(255, 255, 255, 0.35);
//         }

//         .product-image-container {
//           position: relative;
//           margin-bottom: 24px;
//           display: flex;
//           justify-content: flex-end;
//           align-items: flex-start;
//         }

//         .special-badge {
//           position: absolute;
//           top: -16px;
//           left: -16px;
//           width: 96px;
//           height: 96px;
//           background: linear-gradient(135deg, #60a5fa, #22d3ee);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-weight: 700;
//           font-size: 0.875rem;
//           transform: rotate(-12deg);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//           z-index: 2;
//         }

//         .product-image {
//           width: 120px;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 20px;
//           box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
//           transition: all 0.3s ease;
//           border: 3px solid white;
//         }

//         .product-image:hover {
//           transform: scale(1.1) rotate(5deg);
//           box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
//         }

//         /* Product Actions */
//         .product-actions {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 16px;
//         }

//         .action-group {
//           display: flex;
//           gap: 8px;
//         }

//         .action-btn {
//           width: 40px;
//           height: 40px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .action-btn-secondary {
//           background-color: rgba(255, 237, 213, 0.8);
//           color: #f97316;
//           backdrop-filter: blur(10px);
//         }

//         .action-btn-secondary:hover {
//           background-color: #f97316;
//           color: white;
//         }

//         .action-btn-primary {
//           background-color: #f97316;
//           color: white;
//         }

//         .action-btn-primary:hover {
//           background-color: #ea580c;
//         }

//         /* Product Info */
//         .product-name {
//           font-size: 1.25rem;
//           font-weight: 700;
//           color: #111827;
//           margin-bottom: 8px;
//         }

//         .product-footer {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .product-rating {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .product-star {
//           width: 20px;
//           height: 20px;
//           fill: #fb923c;
//           color: #fb923c;
//         }

//         .rating-value {
//           font-weight: 600;
//           color: #4b5563;
//         }

//         .product-price {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: #f97316;
//         }

//         /* Slide Indicators */
//         .slide-indicators {
//           display: flex;
//           justify-content: center;
//           gap: 12px;
//           margin-top: 48px;
//         }

//         .indicator {
//           height: 8px;
//           border-radius: 9999px;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           width: 8px;
//           background-color: #fed7aa;
//         }

//         .indicator-active {
//           width: 48px;
//           background-color: #f97316;
//         }

//         /* Progress Bar for Auto Slide */
//         .progress-bar-container {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 100%;
//           height: 4px;
//           background-color: rgba(0, 0, 0, 0.1);
//         }

//         .progress-bar {
//           height: 100%;
//           background: linear-gradient(to right, #f97316, #f59e0b);
//           border-radius: 2px;
//           transition: width 5s linear;
//           width: 0%;
//         }

//         .progress-bar.active {
//           animation: progress 5s linear forwards;
//         }

//         @keyframes progress {
//           0% { width: 0%; }
//           100% { width: 100%; }
//         }

//         /* Responsive */
//         @media (max-width: 1024px) {
//           .hero-title {
//             font-size: 3rem;
//           }
          
//           .product-carousel-btn {
//             display: none;
//           }
//         }

//         @media (max-width: 768px) {
//           .hero-section {
//             padding-top: 60px;
//             padding-bottom: 40px;
//           }
          
//           .hero-title {
//             font-size: 2.5rem;
//           }
          
//           .hero-buttons {
//             flex-direction: column;
//           }
          
//           .btn-primary,
//           .btn-secondary {
//             width: 100%;
//             justify-content: center;
//           }

//           .product-image-container {
//             justify-content: center;
//           }
//         }
//       `}</style>

//       {/* Hero Section with Carousel */}
//       <section className="hero-section">
//         <div className="decorative-blob blob-1"></div>
//         <div className="decorative-blob blob-2"></div>
        
//         <div className="hero-container">
//           {/* Main Hero Carousel */}
//           <div className="hero-content">
//             {/* Left Content */}
//             <div className="hero-text-content">
//               <div className="hero-badge">
//                 <span className="badge-text">{slides[currentSlide].subtitle}</span>
//               </div>
              
//               <h1 className="hero-title">
//                 {slides[currentSlide].title.split(' ')[0]}{' '}
//                 <span className="title-ampersand">&</span>
//                 <br />
//                 <span>{slides[currentSlide].title.split(' ').slice(-1)}</span>
//               </h1>

//               <p className="hero-description">
//                 {slides[currentSlide].description}
//               </p>

//               <div className="hero-price">
//                 {slides[currentSlide].price}
//               </div>

//               <div className="hero-buttons">
//                 <button className="btn-primary">
//                   Order Now
//                 </button>
//                 <button className="btn-secondary">
//                   See Menu
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Right Image */}
//             <div className="hero-image-wrapper">
//               <div className="splash-effect"></div>
              
//               <div className="burger-image-container">
//                 <div className="burger-image-inner">
//                   <img 
//                     src={slides[currentSlide].image}
//                     alt="Delicious Burger"
//                     className="burger-image"
//                   />
//                   <div className="rating-badge">
//                     <div className="rating-content">
//                       <div className="rating-number">{slides[currentSlide].rating}</div>
//                       <Star className="rating-star" />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Hero Carousel Navigation */}
//               <div className="hero-carousel-nav-below">
//                 <button onClick={prevSlide} className="carousel-nav-btn">
//                   <ChevronLeft size={24} />
//                 </button>
//                 <button onClick={nextSlide} className="carousel-nav-btn">
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Auto-slide Progress Bar */}
//           <div className="progress-bar-container">
//             <div 
//               className={`progress-bar ${currentSlide === 0 ? 'active' : ''}`}
//               key={currentSlide}
//             />
//           </div>

//           {/* Product Cards Carousel */}
//           <div className="products-section">
//             <div className="products-carousel-container">
//               <button onClick={prevProductSlide} className="product-carousel-btn product-carousel-btn-left">
//                 <ChevronLeft size={24} />
//               </button>

//               <div className="products-grid">
//                 {visibleProducts.map((product) => (
//                   <div key={product.id} className="product-card">
//                     <div className="product-image-container">
//                       {product.special && (
//                         <div className="special-badge">
//                           SPECIAL
//                         </div>
//                       )}
//                       <img 
//                         src={product.image}
//                         alt={product.name}
//                         className="product-image"
//                       />
//                     </div>

//                     <div className="product-actions">
//                       <div className="action-group">
//                         <button className="action-btn action-btn-secondary">
//                           <Heart size={18} />
//                         </button>
//                         <button className="action-btn action-btn-primary">
//                           <Plus size={18} />
//                         </button>
//                       </div>
//                       <button className="action-btn action-btn-secondary">
//                         <ShoppingCart size={18} />
//                       </button>
//                     </div>

//                     <h3 className="product-name">{product.name}</h3>
                    
//                     <div className="product-footer">
//                       <div className="product-rating">
//                         <Star className="product-star" />
//                         <span className="rating-value">{product.rating}</span>
//                       </div>
//                       <div className="product-price">{product.price}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button onClick={nextProductSlide} className="product-carousel-btn product-carousel-btn-right">
//                 <ChevronRight size={24} />
//               </button>
//             </div>
//           </div>

//           {/* Slide Indicators */}
//           <div className="slide-indicators">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`indicator ${currentSlide === index ? 'indicator-active' : ''}`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Section1;




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