import "./CartPopup.css";
import { LiaTimesSolid } from "react-icons/lia";
import { useState } from "react";

export default function CartPopup({
  isOpen,
  closePopup,
  cartItems = [],
  removeFromCart,
  updateQuantity,
}) {
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", mobileNo: "" });

  // Handle form submission
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity); 
    }
  };


  return (
    <>
      {/* Cart Popup */}
      {isOpen && !showInquiryPopup && (
        <div className="overlay">
          <div className={`cart-popup open`}>
            <div className="cart-popup-content">
              <button className="close-popup" onClick={closePopup}>
                &times;
              </button>
              <h2>Cart</h2>

              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="cart-item-list">
                  {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div className="cart-item-left">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </div>
                      <div className="cart-item-middle">
                        <h5 className="cart-item-title">{item.name}</h5>
                        <div className="cart-item-quantity">
                          <span className="cart-quantity">Quantity</span>
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="quantity-input"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.id, parseInt(e.target.value))
                              }
                              min="1"
                            />
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="cart-item-right">
                        <LiaTimesSolid
                          className="remove-item-icon"
                          onClick={() => removeFromCart(item.id)}
                        />
                        <div className="cart-item-price">Rs. {item.price}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="d-md-flex justify-content-md-end">
                <button
                  className="btn btn-dark mt-3 text-uppercase send-inquiry"
                  onClick={() => {
                    closePopup(); // Close cart popup
                    setShowInquiryPopup(true); // Open inquiry popup
                  }}
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Popup */}
      {showInquiryPopup && (
        <div className="overlay">
          <div className="inquiry-popup">
            <div className="inquiry-popup-content">
              <button
                className="close-popup"
                onClick={() => setShowInquiryPopup(false)}
              >
                &times;
              </button>
              {!inquirySubmitted ? (
                <form onSubmit={handleInquirySubmit}>
                  <h3>Send Inquiry</h3>
                  <div className="form-group mt-3">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Mobile No</label>
                    <input
                      type="text"
                      name="mobileNo"
                      className="form-control"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your mobile number"
                    />
                  </div>
                  <button type="submit" className="btn btn-dark mt-3">
                    Submit Inquiry
                  </button>
                </form>
              ) : (
                <div className="inquiry-success">
                  <h4>Your inquiry was sent successfully!</h4>
                  <p>We will contact you back soon. Thanks!</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setInquirySubmitted(false);
                      setShowInquiryPopup(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

