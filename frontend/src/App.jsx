import React from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="w-full h-full sm:h-screen grid grid-rows-1 sm:grid-cols-[auto_1fr_1fr] gap-y-1 sm:gap-x-1 px-4 py-2">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
