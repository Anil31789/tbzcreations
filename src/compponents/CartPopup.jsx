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
  // handle the change in quantity
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity); // Call parent function to update the cart quantity
    }
  };

  return (
    <div className={`cart-popup ${isOpen ? "open" : ""}`}>
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
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        min="1"
                      />
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
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
          <button className="btn btn-dark mt-3 text-uppercase send-inquiry">
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
