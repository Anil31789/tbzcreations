import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import api from "../../apiCalls/postApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Footer() {
  const catalogid = useSelector(state => state.catelogID.catelogID)
  const [query, setquery] = useState({ catelogid: "", name: "", mobile: "", message: "" })
  const name = useRef(null);
  const mobile = useRef(null);
  const message = useRef(null);

  useEffect(() => {
    setquery({ ...query, catelogid: catalogid })
  }, [catalogid])


  const handleSubmit = async (e) => {
    if (query.name === "" || query.mobile === "" || query.message === "") {
      console.log('validation');
    }
    else {
      e.preventDefault();
      try {
        const res = await api.post('contact-us', query)
        toast.success("Successfull")
        console.log(res);

      } catch (error) {
        toast.error("Something Went Wrong")
        console.log("contact us error", error);
      }
      name.current.value = "";
      mobile.current.value = "";
      message.current.value = "";
    }
  }
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="contact-details">
          <h5>Contact Details</h5>
          <p>Email: contact@yourstore.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2024 TBZ Creations. All rights reserved.</p>
        </div>
      </div>

      <div className="footer-right">
        <h5>Contact Us</h5>
        <form className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            required
            className="form-input"
            onChange={(e) => setquery({ ...query, "name": e.target.value })}
            ref={name}
          />
          <input
            type="number"
            placeholder="Your Mobile"
            name="mobile"
            required
            className="form-input"
            onChange={(e) => setquery({ ...query, "mobile": e.target.value })}
            ref={mobile}
          />
          <textarea
            placeholder="Your Message"
            name="message"
            required
            className="form-textarea"
            onChange={(e) => setquery({ ...query, "message": e.target.value })}
            ref={message}
          ></textarea>
          <button onClick={(e) => handleSubmit(e)} type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </footer>
  );
}
