import React from "react";
import useAuth from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { logout as userlogoout } from "../api/user.js";

function NavBar() {
  const {
    user: { isLoggedIn },
    logout,
  } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="bg-[#121212] rounded-xl p-2 h-full">
      <div className=" flex flex-col gap-2 h-full">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => {
                logout();
                userlogoout();
                navigate("/");
              }}
              className="bg-[#222222] px-4 py-2 rounded"
            >
              Logout
            </button>
            <Link to={"/chat"} className="bg-[#222222] text-center px-4 py-2 rounded">
              Chat
            </Link>
          </>
        ) : (
          <>
            <Link to={"/register"} className="bg-[#222222] px-4 py-2 rounded">
              SignUp
            </Link>
            <Link to={"/login"} className="bg-[#222222] px-4 py-2 rounded">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
