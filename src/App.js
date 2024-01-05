import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./page/Home/Home";
import Reels from "./page/Reels/Reels";
import Stories from "./page/Stories/Stories";
import YouTube from "./page/YouTube/YouTube";

import "./app.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/youtube" element={<YouTube />} />
      </Routes>
    </Router>
  );
}

export default App;
