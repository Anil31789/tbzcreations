import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetailsModal.css";
export default function ProductDetailsModal({ product, onClose, addToCart, onNavigateProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedColor, setSelectedColor] = useState("Red");
  // const colors = ["Red", "Blue", "Green"];
  const [color, setcolor] = useState('')
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);


  useEffect(() => {
    setQuantity(1);
    if (product !== null) setcolor(product.variants.color)
  }, [product]);

  if (!product) return null;

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,

    };
    addToCart(productToAdd);
    // onClose();
  };

  // Settings for main and thumbnail sliders



  const mainSliderSettings = {
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
    dots: false,
    arrows: true,
    fade: true,
  };

  const thumbnailSliderSettings = {
    asNavFor: nav1,
    ref: (slider) => setNav2(slider),
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        {/* Previous and Next Arrows */}
        <button
          className="prev-product"
          onClick={() => onNavigateProduct("previous")}
        >
          &lt;
        </button>
        <button
          className="next-product"
          onClick={() => onNavigateProduct("next")}
        >
          &gt;
        </button>
        <div className="modal-body">
          <div className="row">
            {/* image section  */}
            <div className=" image-section">
              {/* Main Slider */}
              
                {/* <img style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }} src={"https://images.unsplash.com/photo-1736598734718-daa665cc511c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"} alt={product.title} /> */}
              {/*
                Thumbnail Slider
                <Slider {...thumbnailSliderSettings} className="thumbnail-slider">
                  {product.contents &&
                    product.contents.map((image, index) => (
                      <div key={index} className="thumbnail">
                        <img src={image.file} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    ))}
                </Slider> */}
            </div>
            {/* product detail section  */}
            <div className="col-md-6 m-details">
              <h2 className="pb-3">{product.title}</h2>
              <p>{product.description}</p>
              <h4 className="pb-4">
                {product.discountPrice === null ? <span> Rs. &nbsp;{product.price}</span> : <span>
                  Rs. <del>{product.price}</del>
                  &nbsp;{product.discountPrice}
                </span>}
              </h4>
              <div className="d-flex justify-content-between">
                {/* Quantity */}
                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
                {/* Size Options */}
                <div>
                  <label>Size</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>


              {/* Color Options */}
              <div>
                <label>Color</label>
                <div className="color-options">
                  {/* {colors.map((color) => ( */}
                  <div
                    key={color}
                    className={`color-box ${selectedColor === color ? "selected" : ""
                      }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  />
                  {/* ))} */}
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <label>Weight/ Volume - {product.variants.weight}</label>
                </div>
                <div>
                  <label>Material - {product.variants.material}</label>
                </div>
              </div>

              <br></br>
              <button
                className="btn btn-dark mt-3 text-uppercase"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
