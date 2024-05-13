import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">eazyonline</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <DashboardIcon className="icons" />
            <span>Dashboard</span>
          </li>
          <li>
            <PeopleIcon className="icons" />
            <span>Users</span>
          </li>
          <li>
            <AssignmentTurnedInIcon className="icons" />
            <span>Tasks</span>
          </li>
          <li>
            <LogoutIcon className="icons" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
