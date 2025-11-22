import React from "react";
import HeaderLogo from "../../images/headerImages/rentCarLogo.svg";
import phoneIcon from "../../images/headerImages/telephone.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="mycon flex items-center justify-between py-3">
        <Link to={"/"}>
          <img
            className="w-[150px] h-[60px]"
            src={HeaderLogo}
            alt="Car rental"
          />
        </Link>
        <nav className="header-links flex items-center gap-3 md:gap-4 lg:gap-5">
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>Vehicles</Link>
          <Link to={"/"}>Detail</Link>
          <Link to={"/"}>About Us</Link>
          <Link to={"/"}>Contact Us</Link>
        </nav>

        <div className="flex items-center gap-2">
          <img src={phoneIcon} alt="Phone Icon" />
          <a className="flex flex-col" href="tel:+9962471680">
            <span>Need help?</span>
            <span>+996 247-1680</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
