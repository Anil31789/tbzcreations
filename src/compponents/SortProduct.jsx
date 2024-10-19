import { LuShare } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";

export default function SortProduct() {
  return (
    <div className="sort-section d-flex justify-content-between align-items-center">
      <div className="d-flex cart-button">
        <button className="btn btn-outline-dark btn-sm me-3">
          Heels &nbsp; <RxCross1 />
        </button>
        <button className="btn btn-outline-dark btn-sm me-3">
          1001-1500 &nbsp; <RxCross1 />
        </button>
      </div>

      <div className="sort-selection">
        <button type="button" className="btn btn-dark">
          Download Catalog
        </button>
        <button type="button" className="btn btn-dark mx-1">
          <LuShare />
        </button>
        <button type="button" className="btn btn-dark">
          <FaWhatsapp />
        </button>
      </div>
    </div>
  );
}
