import React from 'react';
import "./footer.css"
const Footer = () => {
  return (
    <footer class="footer" style={{padding:"30px"}}>
    <div class="footer-container">
     
      <div class="footer-section">
        <h3 class="footer-logo">Oppo Store</h3>
        <p class="footer-description">
          Explore the best of Oppo smartphones and accessories. Get the latest tech delivered to your doorstep.
        </p>
        <div class="footer-social-icons">
          <a href="https://www.facebook.com/share/1Zg5anvuyD/" target="_blank" class="social-icon">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" class="social-icon">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" class="social-icon">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" class="social-icon">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
  
      
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>
  
      
      <div class="footer-section">
        <h4>Contact Us</h4>
        <ul>
          <li>Email: support@oppostore.com</li>
          <li>Phone: +1 800 123 4567</li>
          <li>Address: 123 Oppo Street, Tech City</li>
        </ul>
      </div>
    </div>
  
    
    <div class="footer-bottom">
      <p>&copy; 2025 Oppo Store. All Rights Reserved.</p>
    </div>
  </footer>
  
  );
}

export default Footer;