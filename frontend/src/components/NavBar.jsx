import React from "react";
import useAuth from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import Chip from "@mui/material/Chip";

function NavBar() {
  const {
    user: { isLoggedIn },
    logout,
  } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="text-white bg-white">
      {isLoggedIn ? (
        <>
          <Chip
            label="Logout"
            onClick={() => {
              logout();
              navigate("/");
            }}
          />
          <br />
        </>
      ) : (
        <>
          <Chip label="SignUp" component={Link} to={"/register"} clickable />
          <Chip label="Login" component={Link} to={"/login"} clickable />
        </>
      )}
    </div>
  );
}

export default NavBar;
