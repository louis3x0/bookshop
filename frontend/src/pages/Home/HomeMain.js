import React from "react";
import Home from "./Home";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
const HomeMain = () => {
  return (
    <div>
      <div className="home-container">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </div>
  );
};

export default HomeMain;
