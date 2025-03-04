import "./Headers.css";
import { IoMdSearch } from "react-icons/io";
import CartPopup from "../CartPopup/CartPopup";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebook, FaEnvelope } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";
import {  useSelector } from "react-redux";

export default function Headers({ setfilters , resetCart, cartItems, removeFromCart, updateQuantity }) {
  const [filterObj, setFilterobj] = useState({ search: '', categoryIds: [] })
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const category = useSelector(state => state.category.category)
  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if("results" in category){
      let idsArr = category.results.filter(category =>  category.selected )
      .map(categoryDet => categoryDet.id)
        setFilterobj({ ...filterObj, categoryIds: idsArr })
    }
  }, [category])

  useEffect(()=>{
    setfilters(filterObj)
    
  },[filterObj])

  const handleSearch = (e) => {
    setFilterobj({ ...filterObj, search: e.target.value })
  }


  const toggleShareDropdown = () => {
    setShowShareDropdown(!showShareDropdown);
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
          <input type="text" onChange={handleSearch} placeholder="Search..." />
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
        {/* Share Button */}
        <div className="share-dropdown-wrapper">
          <button
            type="button"
            className="btn btn-dark mx-1"
            onClick={toggleShareDropdown}
          >
            <IoShareSocialOutline /> Share
          </button>
          {showShareDropdown && (
            <div className="share-dropdown">
              <a
                href="https://api.whatsapp.com/send?text=Check%20this%20out!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
              <a
                href="mailto:?subject=Check%20this%20out&body=Check%20out%20this%20amazing%20product!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://facebook.com/sharer/sharer.php?u=https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
            </div>
          )}
        </div>
      </div>
      <CartPopup
        resetCart={resetCart}
        isOpen={isCartOpen}
        closePopup={toggleCartPopup}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </header>
  );
}
