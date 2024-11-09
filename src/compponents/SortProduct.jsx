import { LuShare } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";

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
          <HiOutlineDownload /> Download Catalog
        </button>
      </div>
    </div>
  );
}
