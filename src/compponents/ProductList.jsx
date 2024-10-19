import { useEffect, useState, useTransition } from "react";
import { allProducts } from "../api/postApi";
import Loader from "./UI/Loader";
import ProductDetailsModal from "./ProductDetailsModal";
import "./ProductList.css";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

export default function ProductList({ addToCart }) {
  const [isPending, startTransition] = useTransition();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const openModal = (product) => {
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await allProducts();
        console.log(res, res);
        setProductData(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch products", error);
        setLoading(false);
      }
    });
  }, []);

  // Get the current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle "Next" and "Previous" buttons
  const handleNext = () => {
    if (currentPage < Math.ceil(productData.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPageOne = () => {
    setCurrentPage(1);
  };

  if (loading) return <Loader />;
  if (isPending) return <Loader />;
  if (productData.length === 0) return <h2>No products found</h2>;

  return (
    <>
      <div className="row g-4">
        {currentProducts.map((product) => {
          return (
            <div className="col-md-4" key={product.id}>
              <div className="product">
                <div className="text-center">
                  <img src={product.image} width="100%" alt={product.name} />
                </div>
                <div className="product-info">
                  <div className="about" onClick={() => openModal(product)}>
                    <h5 className="product-title">
                      <a href="#">{product.name}</a>
                    </h5>
                    <span>{product.description}</span>
                  </div>
                  <div className="cart-button mt-3 d-flex justify-content-between align-items-center">
                    <div className="add">
                      <span>Rs. {product.price}</span>
                    </div>
                    <button
                      className="btn btn-outline-dark text-uppercase"
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <ProductDetailsModal
          product={selectedProduct}
          onClose={closeModal}
          addToCart={addToCart}
        />
      </div>
      {/* Pagination Buttons */}
      <div className="pagination-buttons mt-5 pt-4">
        <div>
          <button
            className="btn border-0 b-radious"
            onClick={goToPageOne}
            disabled={currentPage === 1}
          >
            <MdKeyboardDoubleArrowLeft /> Page 1
          </button>

          <button
            className="btn btn-outline-dark b-radious"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
            Previous
          </button>
        </div>

        <span className="page-number">
          Page {currentPage} of{" "}
          {Math.ceil(productData.length / productsPerPage)}
        </span>

        <button
          className="btn btn-outline-dark b-radious"
          onClick={handleNext}
          disabled={
            currentPage === Math.ceil(productData.length / productsPerPage)
          }
        >
          Next <MdKeyboardArrowRight />
        </button>
      </div>
    </>
  );
}
