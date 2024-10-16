import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__name">Aykut Onat</div>
      <div className="footer__date">© {currentYear}. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
