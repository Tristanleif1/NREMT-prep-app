import React from "react";
import "./Footer.css";
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";

function Footer() {
  return (
    <div className="footer">
      <p className=" footer-header">
        This app was made by:
      </p>
      <div className=" about-us">
        <div className=" user-info">
          <p>Tristan Allaman</p>
          <div className="icons">
            <a href="https://github.com/Tristanleif1" target="_blank" rel="noreferrer" className="github-icon">
              <BiLogoGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/tristan-allaman-a18206232/"
              target="_blank"
              rel="noreferrer"
              className="linkedin-icon"
            >
              <BiLogoLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
