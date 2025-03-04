import { useEffect, useState, useTransition } from "react";
import { allProducts } from "../../apiCalls/postApi";
import Loader from "../Loader/Loader";
import ProductDetailsModal from "../ProductDetail/ProductDetailsModal";
import "./ProductList.css";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function ProductList({filters ,setproductCounts , addToCart }) {
  const [id,setid] = useState('')
  const {catelogID} = useSelector(state => state.catelogID) 
  const [isPending, startTransition] = useTransition();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;


  useEffect(()=>{
    setid(catelogID)
  },[catelogID])


  

  const openModal = (product) => {
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    startTransition(async () => {
      try {
        if(id !== ''){
        let filter = {...filters,catelogID: id}
        const {data} = await allProducts(filter)
        setproductCounts(data.count)
        setProductData(data.results);
        setLoading(false);
        }
      } catch (error) {
        console.log("Failed to fetch products", error);
        setLoading(false);
        setProductData([]);
      }
    });
  }, [filters,id]);

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

  function formatPercentage(value) {
    return Number.isInteger(value) ? value : parseFloat(value.toFixed(1));
  }
  

  const handleNavigateProduct = (direction) => {
    const currentIndex = productData.findIndex((p) => p.id === selectedProduct.id);
    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % productData.length;
      setSelectedProduct(productData[nextIndex]);
    } else if (direction === "previous") {
      const prevIndex = (currentIndex - 1 + productData.length) % productData.length;
      setSelectedProduct(productData[prevIndex]);
    }
  };

  if (loading) return <div className="loaderBox"> <Loader /></div>;
  if (isPending) return <div className="loaderBox"> <Loader /></div>;
  if (productData.length === 0) return<div className="loaderBox"> <h2>No products found</h2></div>;

  return (
    <>
      <div className="productlist row g-4">
        {currentProducts.map((product) => {
          return (
            <div className="col-md-4" key={product.id}>
              <div className="product">
                {product.discountPrice === null ? '': <span className="off bg-success">-{formatPercentage(((product.price-product.discountPrice)*100)/product.price)}% OFF</span>}
                <div className="text-center">
                  <img src={product.contents[0].file} width="100%" alt={product.title} />
                </div>
                <div className="product-info">
                  <div className="about" onClick={() => openModal(product)}>
                    <h5 className="product-title">
                      <a href="#">{product.title}</a>
                    </h5>
                    {/* <span>{product.description}</span> */}
                  </div>
                  <div className="cart-button mt-3 d-flex justify-content-between align-items-center">
                    <div className="add">
                        {product.discountPrice === null ? <span> Rs. &nbsp;{product.price}</span>: <span>
                        Rs. <del>{product.price}</del>
                        &nbsp;{product.discountPrice}
                      </span>}
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
          onNavigateProduct={handleNavigateProduct}
        />
      </div>
      {/* Pagination Buttons */}
      <div className="pagination pagination-buttons mt-5 pt-4">
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
