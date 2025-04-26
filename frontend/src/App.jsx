import React from "react";
import { Outlet, Link } from "react-router";
import NavBar from "./components/NavBar";
import { Container } from "@mui/material";

function App() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        border: "1px solid black",
        height: "100vh",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "1rem",
      }}
    >
      <NavBar />
      <Outlet />
    </Container>
  );
}

export default App;
