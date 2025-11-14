import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// Import your breadcrumb component
// import Breadcrumb from '../components/breadcrumb/Breadcrumb';
// import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .contact-page {
          min-height: 100vh;
          background-color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          height: 300px;
          background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200');
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .breadcrumb {
          font-size: 14px;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .breadcrumb span:first-child {
          opacity: 0.7;
        }

        .hero-title {
          font-size: 48px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        /* Contact Info Section */
        .contact-info-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .contact-info-item {
          text-align: center;
        }

        .contact-info-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
          text-transform: uppercase;
          color: #1a1a1a;
        }

        .contact-info-item p {
          color: #666;
          line-height: 1.8;
          margin: 5px 0;
        }

        .contact-info-item .highlight {
          color: #f59e0b;
        }

        /* Map Section */
        .map-container {
          width: 100%;
          height: 400px;
          background-color: #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 60px;
        }

        .map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Form Section */
        .form-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .form-title {
          font-size: 36px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 15px;
          color: #1a1a1a;
        }

        .form-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 150px;
          font-family: inherit;
        }

        .form-button-container {
          text-align: center;
          margin-top: 30px;
        }

        .submit-button {
          background-color: #dc2626;
          color: white;
          padding: 14px 40px;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: background-color 0.3s ease;
          letter-spacing: 1px;
        }

        .submit-button:hover {
          background-color: #b91c1c;
        }

        /* Mobile App Section */
        .app-section {
          background-color: #fbbf24;
          padding: 60px 20px;
        }

        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          align-items: center;
        }

        .app-content h2 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #1a1a1a;
        }

        .app-content h3 {
          font-size: 44px;
          font-weight: bold;
          color: #78350f;
          margin-bottom: 20px;
        }

        .app-content p {
          color: #374151;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .app-badges {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .app-badges img {
          height: 48px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .app-badges img:hover {
          transform: scale(1.05);
        }

        .app-image-container {
          display: flex;
          justify-content: center;
        }

        .app-image-container img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px;
          }

          .form-title {
            font-size: 28px;
          }

          .app-content h3 {
            font-size: 32px;
          }

          .contact-info-grid {
            gap: 30px;
          }

          .map-container {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            height: 250px;
          }

          .hero-title {
            font-size: 28px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .app-content h2 {
            font-size: 22px;
          }

          .app-content h3 {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="contact-page">
        {/* Breadcrumb - Uncomment when you import your component */}
        {/* <Breadcrumb current="CONTACT US" /> */}
        
        {/* Hero Section */}
        <div className="hero-section">
          <div className="breadcrumb">
            <span>HOME</span> / <span>CONTACT US</span>
          </div>
          <h1 className="hero-title">CONTACT US</h1>
        </div>

        {/* Contact Info Section */}
        <div className="contact-info-container">
          <div className="contact-info-grid">
            {/* Location */}
            <div className="contact-info-item">
              <h3 className="contact-info-title">Location</h3>
              <p>8721 M Central Avenue,</p>
              <p>Los Angeles, CA 90036,</p>
              <p>United States</p>
            </div>

            {/* Working Hours */}
            <div className="contact-info-item">
              <h3 className="contact-info-title">Working Hours</h3>
              <p>Mon-Fri: 9:00AM - 10:00PM</p>
              <p>Saturday: 10:00AM - 8:20PM</p>
              <p>Sunday: 12:00PM - 5:00PM</p>
            </div>

            {/* Contact Info */}
            <div className="contact-info-item">
              <h3 className="contact-info-title">Working Hours</h3>
              <p>P: +1 2 3 3456 7890</p>
              <p>F: +1 2 9 8765 4321</p>
              <p className="highlight">E: hello@yourdomain.com</p>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.3384374768314!2d-118.3551536!3d34.0634808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b92e22bd22d7%3A0x7a3c8f1e5f5e5f5e!2s8721%20M%20Central%20Ave%2C%20Los%20Angeles%2C%20CA%2090036!5e0!3m2!1sen!2sus!4v1234567890"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Get In Touch Form */}
          <div className="form-container">
            <h2 className="form-title">GET IN TOUCH</h2>
            <p className="form-subtitle">
              Aliquam a augue suscipit, luctus neque purus ipsum neque undo dolor primis libero tempus, blandit a cursus varius magna
            </p>

            <div>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                ></textarea>
              </div>

              <div className="form-button-container">
                <button onClick={handleSubmit} className="submit-button">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="app-section">
          <div className="app-container">
            <div className="app-content">
              <h2>DOWNLOAD MOBILE APP AND</h2>
              <h3>SAVE UP TO 20%</h3>
              <p>
                Aliquam a augue suscipit, luctus neque purus ipsum and neque dolor primis libero tempus, blandit varius
              </p>
              <div className="app-badges">
                <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="App Store" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
              </div>
            </div>
            <div className="app-image-container">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" alt="Burger and Fries" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;