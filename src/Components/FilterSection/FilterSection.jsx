import { useEffect, useState } from "react";
import "./FilterSection.css";
import { useDispatch, useSelector } from "react-redux";
import { categoryData } from "../../apiCalls/callCategory";
import Loader from "../Loader/Loader";
import { setSelectCategory } from "../../Store/categorySlice";

export default function FilterSection({ productCounts }) {
  const dispatch = useDispatch()
  const [categoryres, setcategory] = useState([])
  const { catelogID } = useSelector(state => state.catelogID)
  const category = useSelector(state => state.category.category);
  const loader = useSelector(state => state.category.loader)

  useEffect(() => {
    catelogID !== '' ? dispatch(categoryData(catelogID)) : ''
  }, [catelogID])

  useEffect(() => {
    if ("results" in category) {
      setcategory(category.results)
    }
  }, [category])



  const handleCheckbox = (categoryID) => {
    dispatch(setSelectCategory(categoryID))
  }

  const handleClear = () => {
    dispatch(setSelectCategory())
  }
  
  return (
    <div className="left-filter">
      <div className="d-flex justify-content-between">
        <h5>Product Catalog</h5> -
        <span className="items">
          <small>{productCounts} items</small>
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center pt-4 pb-2">
        <p className="m-0">FILTERS</p>
        <span className="clrall">
          <button id="clearBtn" onClick={handleClear}>Clear all</button>
        </span>
      </div>
      <div className="b-box">
        <div className="category b-bottom p-4">
          <div className="heading">
            <h6 className="filter-heading pb-2">Categories</h6>
          </div>
          {/* This Line has to be fix after backend api starts  */}
          {category.message === "Network Error"  ? <div className="notFound">No Category Found</div> : categoryres.length == 0 ? <div className="loaderCategory"> <Loader /> </div> : categoryres.map((category, index) => <div key={index} className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={category.id}
                checked={category.selected}
                id="flexCheckDefault4"
                onChange={(event) => handleCheckbox(category.id, event)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault4">
                {category.title}
              </label>
            </div>
            <span>{category.numberofItems}</span>
          </div>)}


        </div>

      </div>
    </div>
  );
}
