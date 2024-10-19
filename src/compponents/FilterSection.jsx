import "./FilterSection.css";
export default function FilterSection() {
  return (
    <div className="left-filter">
      <div className="d-flex justify-content-between">
        <h5>Product Catalog</h5> -
        <span className="items">
          <small>300 items</small>
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center pt-4 pb-2">
        <p className="m-0">FILTERS</p>
        <span className="clrall">
          <small>Clear all</small>
        </span>
      </div>
      <div className="b-box">
        <div className="category b-bottom p-4">
          <div className="heading">
            <h6 className="filter-heading pb-2">Categories</h6>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault3"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault3">
                Intel Core i7
              </label>
            </div>
            <span>3</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault4"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault4">
                Intel Core i7
              </label>
            </div>
            <span>3</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault5"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault5">
                Intel Core i7
              </label>
            </div>
            <span>3</span>
          </div>
        </div>
        <div className="price p-4">
          <div className="heading">
            <h6 className="filter-heading pb-2">Price Range</h6>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault6"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault6">
                Intel Core i7
              </label>
            </div>
            <span>3</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault1"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault1">
                Intel Core i7
              </label>
            </div>
            <span>3</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault2"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault2">
                Intel Core i7
              </label>
            </div>
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
