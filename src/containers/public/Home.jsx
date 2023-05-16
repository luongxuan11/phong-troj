import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
const Home = () => {
  return (
    <div className="home">
      <Header />
      <Navigation/>
      <div className="home-login container row">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
