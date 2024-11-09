import "./Headers.css";
import { IoMdSearch } from "react-icons/io";
import CartPopup from "../CartPopup";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";

export default function Headers({ cartItems, removeFromCart, updateQuantity }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Calculate total quantity of items in the cart
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <div className="header-left">
        <img src="assets/logo.PNG" alt="Logo" className="logo" />
      </div>

      <div className="header-middle">
        <div className="search-box">
          <IoMdSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header-right">
        <div className="cart-icon" onClick={toggleCartPopup}>
          <button type="button" className="btn btn-dark">
            <FaCartPlus /> Cart
            {totalItemsInCart > 0 && (
              <span className="cart-quantity-badge">{totalItemsInCart}</span>
            )}
          </button>
        </div>
        <button type="button" className="btn btn-dark mx-1">
          <IoShareSocialOutline /> Share
        </button>
      </div>
      <CartPopup
        isOpen={isCartOpen}
        closePopup={toggleCartPopup}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </header>
  );
}
