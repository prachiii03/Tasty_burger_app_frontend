import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ChevronUp } from 'lucide-react';

export default function TastyBurgerFooter() {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>      
      <style>{`
        .footer-top {
          
          padding: 60px 20px;
        }

        .discount-section h2 {
          font-size: 2rem;
          color: black;
          margin-bottom: 15px;
          font-weight: 900;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .discount-section p {
          color: rgba(19, 18, 18, 0.95);
          line-height: 1.6;
          margin-bottom: 30px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .subscribe-input {
          padding: 15px 20px;
          border: 3px solid #b4b1b1ff;
          border-radius: 25px 0 0 25px;
          font-size: 1rem;
          outline: none;
          background: rgba(255, 255, 255, 0.95);
        }

        .subscribe-input:focus {
          border-color: #fff;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
          background: #fff;
        }

        .subscribe-btn {
          padding: 15px 35px;
          background-color: #66050aff;
          color: white;
          border: none;
          border-radius: 0 25px 25px 0;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .subscribe-btn:hover {
          background-color: #c3070f;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(227, 24, 55, 0.4);
        }

        .footer-main {
          background-color: #fff;
          padding: 50px 20px;
          border-top: 1px solid #eee;
        }

        .footer-column h3 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .logo-container img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .footer-column p {
          color: #666;
          line-height: 1.6;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
        }

        .footer-column ul li {
          margin-bottom: 12px;
        }

        .footer-column ul li a {
          color: #666;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-column ul li a:hover {
          color: #FF9500;
        }

        .address-text {
          color: #999;
          margin-bottom: 8px;
        }

        .map-link {
          color: #FF9500;
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.3s;
          font-weight: 600;
        }

        .map-link:hover {
          color: #E31837;
        }

        .social-icons {
          display: flex;
          gap: 15px;
          margin-top: 15px;
        }

        .social-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: #FF9500;
          color: white;
          text-decoration: none;
          transition: all 0.3s;
        }

        .social-icon:hover {
          background-color: #E31837;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(227, 24, 55, 0.3);
        }

        .footer-bottom {
          background: linear-gradient(135deg, #900b1fff 0%, #66050aff 100%);
          color: white;
          text-align: center;
          padding: 20px;
        }

        .scroll-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #FF9500 0%, #FFB340 100%);
          color: white;
          border: 3px solid #fff;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 6px 20px rgba(255, 149, 0, 0.4);
          transition: all 0.3s;
          z-index: 1000;
        }

        .scroll-top:hover {
          background: linear-gradient(135deg, #0b0606ff 0%, #c3070f 100%);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(227, 24, 55, 0.5);
        }

        @media (max-width: 768px) {
          .subscribe-input {
            border-radius: 25px;
            margin-bottom: 10px;
          }

          .subscribe-btn {
            border-radius: 25px;
            width: 100%;
          }

          .discount-section h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <footer>
        {/* Footer Top Section */}
        <div className="footer-top">
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="discount-section text-center">
                  <h2>Enjoy special discounts</h2>
                  <p>
                    With our large serving get anything you want for breakfast, lunch & brunch. 
                    Get your meals in no time with our fast delivery services.
                  </p>
                  <div className="d-flex flex-column flex-md-row justify-content-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="subscribe-input flex-grow-1"
                    />
                    <button onClick={handleSubscribe} className="subscribe-btn">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Main Section */}
        <div className="footer-main">
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="row g-4">
              {/* Logo & Description */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-column">
                  <div className="logo-container">
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      background: 'linear-gradient(135deg, #FF9500 0%, #FFB340 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '24px',
                      fontWeight: '900'
                    }}>
                      TB
                    </div>
                    <h3 className="mb-0">Tasty Burger</h3>
                  </div>
                  <p>
                    There are many variations of passages of Lorem Ipsum available, 
                    but the majority
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-column">
                  <h3>Quick Links</h3>
                  <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#recipes">Recipes</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </div>
              </div>

              {/* Address */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-column">
                  <h3>Address</h3>
                  <p className="address-text">COLLINS STREET</p>
                  <p className="address-text">WEST, VICTORIA 8007,</p>
                  <p className="address-text">UNITED STATES.</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="map-link">
                    Google Map Location
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-column">
                  <h3>Contact</h3>
                  <p>(123) 456-7890</p>
                  <p>(123) 456-7891</p>
                  <p>example@company.com</p>
                  <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <Facebook size={18} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <Twitter size={18} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <Linkedin size={18} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <p className="mb-0">@2025 Tasty Burger - All right reserved</p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button onClick={scrollToTop} className="scroll-top" aria-label="Scroll to top">
            <ChevronUp size={24} />
          </button>
        )}
      </footer>
    </>
  );
}