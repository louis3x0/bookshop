import React from "react";
import Home from "./Home";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SubHome from "./SubHome";

const HomeMain = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <SubHome />
      <Footer />
    </div>
  );
};

export default HomeMain;
