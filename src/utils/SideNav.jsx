import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <div className="MainNavContainer">
        <div className="Contant">
          <div className="pageslink">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "green" : "#333",
                background: isActive && "#70a1ff",
                lineHeight: "46px",
              })}
            >
              Dashboard
            </NavLink>
          </div>
          <div className="pageslink">
            <NavLink
              to="/Post_page"
              style={({ isActive }) => ({
                color: isActive ? "green" : "#333",
                background: isActive && "#70a1ff",
                lineHeight: "46px",
              })}
            >
              Post page
            </NavLink>
          </div>
          <div className="pageslink">
            <NavLink
              to="/link_page"
              style={({ isActive }) => ({
                color: isActive ? "green" : "#333",
                background: isActive && "#70a1ff",
                lineHeight: "46px",
              })}
            >
              Link Page
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
