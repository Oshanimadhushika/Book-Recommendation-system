// import logo from "./logo.svg";
import "./App.css";

import React from "react";
// import axios from "axios";
import Header from "./components/Header";
import Main from "./pages/Main";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Recommender from "./pages/Recommender";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/recommender" element={<Recommender />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
