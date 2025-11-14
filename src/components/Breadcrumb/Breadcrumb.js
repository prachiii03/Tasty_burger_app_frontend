import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Import the image
import breadcrumbBg from '../../assets/hero/breadcrumb.webp';

function Breadcrumb({ title, items }) {
  const styles = {
    breadcrumbSection: {
      background: `url(${breadcrumbBg}) no-repeat center center`,
      backgroundSize: 'cover',
      padding: '80px 0 50px',
    },
    breadcrumbContent: {
      textAlign: 'center',
    },
    breadcrumbTitle: {
      color: '#fff',
      fontSize: '3rem',
      fontWeight: '700',
      fontFamily: "'Oswald', sans-serif",
      textTransform: 'uppercase',
      marginBottom: '20px',
      letterSpacing: '2px',
    },
    breadcrumb: {
      background: 'transparent',
      justifyContent: 'center',
      marginBottom: '0',
      padding: '0',
      display: 'flex',
      listStyle: 'none',
      flexWrap: 'wrap',
    },
    breadcrumbItem: {
      fontSize: '1rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      fontFamily: "'Oswald', sans-serif",
      display: 'flex',
      alignItems: 'center',
    },
    breadcrumbLink: {
      color: '#fff',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
    breadcrumbActive: {
      color: '#ffc222',
    },
    breadcrumbSeparator: {
      color: '#fff',
      padding: '0 10px',
    },
  };

  return (
    <section style={styles.breadcrumbSection}>
      <Container>
        <div style={styles.breadcrumbContent}>
          <h1 style={styles.breadcrumbTitle}>{title}</h1>
          <nav aria-label="breadcrumb">
            <ol style={styles.breadcrumb}>
              {items.map((item, index) => (
                <li 
                  key={index} 
                  style={styles.breadcrumbItem}
                  aria-current={index === items.length - 1 ? 'page' : undefined}
                >
                  {index === items.length - 1 ? (
                    <span style={styles.breadcrumbActive}>{item.label}</span>
                  ) : (
                    <Link 
                      to={item.url}
                      style={styles.breadcrumbLink}
                      onMouseOver={(e) => e.target.style.color = '#ffc222'}
                      onMouseOut={(e) => e.target.style.color = '#fff'}
                    >
                      {item.label}
                    </Link>
                  )}
                  {index < items.length - 1 && (
                    <span style={styles.breadcrumbSeparator}>/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </section>
  );
}

export default Breadcrumb;