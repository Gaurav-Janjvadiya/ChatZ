import React from "react";
import { Link } from "react-router";

function Navbar() {
  return (
    <div className="text-4xl font-stretch-50% text-gray">
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/register"}>SignUp</Link>
    </div>
  );
}

export default Navbar;
