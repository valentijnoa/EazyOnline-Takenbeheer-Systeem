import React from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="userInfo">
          <div className="edit">Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              className="itemImg"
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="img"
            />
            <div>
              <h1>John Doe</h1>
              <div>
                <span>Email:</span>
                <span>johndoe@gmail.com</span>
              </div>
              <div>
                <span>Phone:</span>
                <span>0612345678</span>
              </div>
              <div>
                <span>Address:</span>
                <span>Campusbaan 6, Nijmegen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
