import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    axiosInstance
      .get("/message/vishal")
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
