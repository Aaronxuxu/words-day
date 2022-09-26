import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./index.css";
function UserNavLink(props) {
  const { to } = props;
  const { pathname } = useLocation();
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        `userLink ${
          ((to === "/user/profile/" && pathname === "/user") || isActive) &&
          "userNavLink"
        }`
      }
    ></NavLink>
  );
}
export default UserNavLink;
