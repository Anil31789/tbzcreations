import { useEffect, useState } from "react";
import "./ProductDetailsModal.css";
export default function ProductDetailsModal({ product, onClose, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedColor, setSelectedColor] = useState("Red");

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

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-6">
              <img src={product.image} alt={product.name} width="100%" />
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
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option>Red</option>
                  <option>Blue</option>
                  <option>Green</option>
                </select>
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
