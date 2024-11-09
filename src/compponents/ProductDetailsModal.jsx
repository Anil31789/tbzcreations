import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetailsModal.css";
export default function ProductDetailsModal({ product, onClose, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedColor, setSelectedColor] = useState("Red");
  const colors = ["Red", "Blue", "Green"];
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setQuantity(1);
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
        <div className="modal-body">
          <div className="row">
            <div className="col-md-6">
              {/* Main Slider */}
              <Slider {...mainSliderSettings}>
                {product.images &&
                  product.images.map((image, index) => (
                    <div key={index}>
                      {image.type === "video" ? (
                        <video src={image.src} controls width="100%" />
                      ) : (
                        <img src={image.src} alt={product.name} width="100%" />
                      )}
                    </div>
                  ))}
              </Slider>

              {/* Thumbnail Slider */}
              <Slider {...thumbnailSliderSettings} className="thumbnail-slider">
                {product.images &&
                  product.images.map((image, index) => (
                    <div key={index} className="thumbnail">
                      <img src={image.src} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
              </Slider>
            </div>

            <div className="col-md-6 m-details">
              <h2 className="pb-3">{product.name}</h2>
              <p>{product.description}</p>
              <h4 className="pb-4">Rs. {product.price}</h4>

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

              {/* Color Options */}
              <div>
                <label>Color</label>
                <div className="color-options">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`color-box ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

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
