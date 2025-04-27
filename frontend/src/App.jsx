import React from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="box-border w-full h-full grid grid-cols-[auto_1fr_1fr] gap-x-1">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
