import React from "react";
import useAuth from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

function NavBar() {
  const {
    user: { isLoggedIn },
    logout,
  } = useAuth();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        border: "1px solid gray",
        padding: "1rem .5rem",
        height: "100%",
        width: "auto",
        display: "flex",
        alignItems: "start",
        justifyItems: "center",
        flexDirection: "column",
        gap: ".5rem",
        borderRadius: "1rem",
      }}
    >
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
    </Box>
  );
}

export default NavBar;
