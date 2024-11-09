import "./App.css";
import { useState } from "react";
import FilterSection from "./compponents/FilterSection";
import ProductList from "./compponents/ProductList";
import SortProduct from "./compponents/SortProduct";
import Headers from "./compponents/UI/Headers";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "./compponents/UI/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  // add product to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      // Add new product to cart with quantity 1
      return [...prevItems, { ...product }];
    });
  };

  // Function to update quantity of a cart item
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // remove product from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <div className="wrapper">
      <div className="header-sec">
        <div className="container">
          <Headers
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </div>
      </div>
      <div className="container">
        <div className="row py-5">
          <div className="col-lg-3 col-md-12">
            <FilterSection />
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="sort-filter">
              <SortProduct />
            </div>
            <div className="products py-4">
              <ProductList addToCart={addToCart} />
            </div>
          </div>
        </div>
        <div className="whatsapp-chat">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div className="Footer-sec">
        <Footer />
      </div>
    </div>
  );
}

export default App;
