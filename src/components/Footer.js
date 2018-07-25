import React from "react";
import {Link} from "react-router-dom";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleUp from "@fortawesome/fontawesome-pro-light/faAngleUp";

import * as Scroll from 'react-scroll';

import logo from "../logo1.png";

export default function Footer() {
  return (
    <div className="main-footer">
      <div className="footer-logo-wrap">
        {/* APP NAME */}
        <Link to="/"><img src={logo} alt="qroniqle logo" /></Link>
      </div>
      <div className="credits-wrap">
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/logan-mace-a94b4a76/">Logan Mace</a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mauriciojflores/">Mauricio Flores</a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/owenekhator/">Owen Ekhator</a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/bryan-espinosa-38489b166/">Bryan Espinosa</a>
      </div>

      <div onClick={() => Scroll.animateScroll.scrollToTop()} className="back-to-top">
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}
