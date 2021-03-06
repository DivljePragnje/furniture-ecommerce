import Axios from "axios";
import React, { useState } from "react";
import "./Contact.styles.scss";

export default function Contact() {
  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/api/newsletters/", { email });
    } catch (error) {}
  };
  const [email, setEmail] = useState("");

  return (
    <div>
      <div className="contact-container">
        <div className="social-container">
          <div className="social">
            <h3>FOLLOW US OUT THERE</h3>
            <div className="icons">
              <a
                href="https://www.instagram.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa fa-instagram fa-2x" />
              </a>
              <a
                href="https://www.facebook.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa fa-facebook-square fa-2x" />
              </a>
            </div>
          </div>
        </div>

        <div className="newsletter-container">
          <div className="newsletter">
            <h3>NEWSLETTER</h3>
            <form onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button className="button">
                <div id="slide"></div>
                <span>SUBMIT</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
