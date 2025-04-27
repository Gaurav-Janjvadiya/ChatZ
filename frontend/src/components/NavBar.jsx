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
    <div className="p-2 h-full">
      <div className="border flex flex-col gap-2   h-full border-gray-500 rounded-xl p-2">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Logout
            </button>
            <br />
          </>
        ) : (
          <>
            <Link
              to={"/register"}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              SignUp
            </Link>
            <Link
              to={"/login"}
              className="bg-gray-300 text-black px-4 py-2 rounded"
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
