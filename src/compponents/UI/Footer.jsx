import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="contact-details">
          <h5>Contact Details</h5>
          <p>Email: contact@yourstore.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2024 TBZ Creations. All rights reserved.</p>
        </div>
      </div>

      <div className="footer-right">
        <h5>Contact Us</h5>
        <form className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            required
            className="form-input"
          />
          <input
            type="text"
            placeholder="Your Mobile"
            name="mobile"
            required
            className="form-input"
          />
          <textarea
            placeholder="Your Message"
            name="message"
            required
            className="form-textarea"
          ></textarea>
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </footer>
  );
}
