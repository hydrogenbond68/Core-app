
import React from 'react';
import '../style.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>We are a team of passionate developers and designers.</p>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Email: contact@example.com</li>
                        <li>Phone: +123-456-7890</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Your Website | Designed by You
            </div>
        </footer>
    );
};

export default Footer;
