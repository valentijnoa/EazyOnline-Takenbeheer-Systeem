import React from "react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <input className="search" type="text" placeholder="search" />
        <div className="items">
          <div className="item">
            <img
              className="userImg"
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
