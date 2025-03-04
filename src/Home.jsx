import "./Home.css";
import { useEffect, useState } from "react";
import FilterSection from "./Components/FilterSection/FilterSection";
import ProductList from "./Components/Products/ProductList";
import SortProduct from "./Components/SortProducts/SortProduct";
import Headers from "./Components/Header/Headers";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "./Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCatelogID } from "./Store/catalogidSlice";

function Home() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [filters, setfilters] = useState({})
  const [productCounts, setproductCounts] = useState('')


  useEffect(() => {
    
    dispatch(getCatelogID(id))
  }, [id])


  const [cartItems, setCartItems] = useState([]);
  // reset Cart
  const resetCart = () => {
    setCartItems([])
  }
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
            filters={filters}
            setfilters={setfilters}
            resetCart={resetCart}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </div>
      </div>
      <div className="container main-container">
        <div className="row py-5">
          <div className="col-lg-3 col-md-12">
            <FilterSection
              productCounts={productCounts}
              setproductCounts={setproductCounts}
            />
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="sort-filter">
              <SortProduct />
            </div>
            <div className="products py-4">
              <ProductList
                setproductCounts={setproductCounts}
                filters={filters}
                setfilters={setfilters}
                addToCart={addToCart} />
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

export default Home;
