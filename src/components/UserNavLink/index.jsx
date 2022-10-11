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
          isActive
            ? "userNavLink"
            : to === "/user/profile/" && pathname === "/user"
            ? "userNavLink"
            : pathname.includes(to.split("/all")[0])
            ? "userNavLink"
            : ""
        }`
      }
    ></NavLink>
  );
}
export default UserNavLink;
