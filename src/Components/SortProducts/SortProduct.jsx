import api from "../../apiCalls/postApi";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSelectCategory } from "../../Store/categorySlice";
import axios from "axios";
import "./SortProduct.css"



export default function SortProduct() {
  const [downloadSpinner , setdownloadspinner] = useState(false)
  const { catelogID } = useSelector(state => state.catelogID)
  const [sorts, setsorts] = useState([])
  const { results } = useSelector(state => state.category.category)
  const dispatch = useDispatch()

  const handleDownload = async (e) => {
    try {
      setdownloadspinner(true)
      const response = await api.post(
        "downloadcatlog",
        {
          catelogID: catelogID,
          products: [
            {
              title: "Modern Velvet Sofa",
              image: "https://plus.unsplash.com/premium_photo-1730828573442-e80d2eef4bcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D",
              description: "A luxurious velvet sofa designed for comfort and elegance, perfect for living rooms.",
              variants: {
                price: "$750.00",
                color: "Black",
                size: "Large"
              }
            },
            {
              title: "Wooden Dining Table",
              image: "https://images.unsplash.com/photo-1735447286068-9eb314f5f4b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D",
              description: "A handcrafted solid oak dining table, ideal for family meals and gatherings.",
              variants: {
                price: "$1,200.00",
                color: "Brown",
                size: "Medium"
              }
            },
            {
              title: "Ergonomic Office Chair",
              image: "https://images.unsplash.com/photo-1735030379333-134693a094f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D",
              description: "High-back mesh office chair with lumbar support and adjustable height.",
              variants: {
                price: "$250.00",
                color: "Black",
                size: "Adjustable"
              }
            },
            {
              title: "Smart LED TV",
              image: "https://images.unsplash.com/photo-1735114238009-98b2ff206c98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4Nnx8fGVufDB8fHx8fA%3D%3D",
              description: "55-inch Ultra HD 4K Smart TV with streaming apps pre-installed.",
              variants: {
                price: "$599.00",
                color: "Black",
                size: "55 inches"
              }
            },
            {
              title: "Leather Recliner Chair",
              image: "https://images.unsplash.com/photo-1736267740792-e703ee44f3f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDR8fHxlbnwwfHx8fHw%3D",
              description: "Premium leather recliner with adjustable back and footrest for relaxation.",
              variants: {
                price: "$899.00",
                color: "Brown",
                size: "Large"
              }
            }
          ]
        },
        {
          responseType: "blob",
        }
      );

      if (!response.status === 200 && !response.statusText === "OK") {
        throw new Error("Failed to generate PDF");
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "instantcatelog.pdf";
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      setdownloadspinner(false)
    } catch (error) {
      console.error("Error generating PDF:", error);
      setdownloadspinner(false)
    }
  }

  useEffect(() => {
    results !== undefined ? setsorts(results.filter(category => category.selected)) : ''
  }, [results])

  const removeSort = (categoryid) => {
    dispatch(setSelectCategory(categoryid))
  }

  return (
    <div className="sort-section d-flex justify-content-between align-items-center">
      <div className="d-flex cart-button">
        {sorts.map(((category) => <button key={category.id} className="btn btn-outline-dark btn-sm me-3">{category.title} &nbsp; <RxCross1 onClick={() => removeSort(category.id)} /> </button>))}
      </div>

      <div className="sort-selection">
        <button type="button" onClick={handleDownload} className="btn btn-dark">
          <HiOutlineDownload /> Download Catalog
        </button>
        {downloadSpinner && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Just a moment, getting things ready for you!</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
