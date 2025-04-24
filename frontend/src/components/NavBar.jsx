import React from "react";
import useAuth from "../context/AuthContext";
import { Link } from "react-router";

function NavBar() {
  const {
    user: { isLoggedIn },
    logout,
  } = useAuth();
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <>
          <Link to={"/login"}>Login</Link>
          <br />
          <Link to={"/register"}>SignUp</Link>
        </>
      )}
    </div>
  );
}

export default NavBar;
