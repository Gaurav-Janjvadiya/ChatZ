import React from "react";
import useAuth from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

function NavBar() {
  const {
    user: { isLoggedIn },
    logout,
  } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="p-2">
      <div className="border h-full border-gray-500 rounded-xl p-2">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
            <br />
          </>
        ) : (
          <>
            <Link
              to={"/register"}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              SignUp
            </Link>
            <Link
              to={"/login"}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
