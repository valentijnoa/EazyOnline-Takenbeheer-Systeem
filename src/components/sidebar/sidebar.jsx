import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        // Clear user-related data from localStorage
        localStorage.removeItem("erToken");
        localStorage.removeItem("user");
        // Redirect to the login page or any other route after logout
        window.location.href = "/login";
      })
      .catch((error) => {
        // An error happened.
        console.error("Error occurred during sign-out:", error);
      });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">eazyonline</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icons" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icons" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/tasks" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentTurnedInIcon className="icons" />
              <span>Tasks</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <LogoutIcon className="icons" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
