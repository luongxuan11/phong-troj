import React from "react";
import { constant } from "../../utilities/constant";
import "../../homeTitle.scss";
import { useSelector } from "react-redux";
import { Province } from "../../components";
import { List } from "./index";


const HomeTitle = () => {
  const {categories, prices, acreages} = useSelector(state => state.app)

  // console.log("check home headng >>>>>>>>>>", categories);
  return (
    <>
      <div className="home-page">
        <h1 className="home-title__h1">{constant?.HOME_TITLE}</h1>
        <p className="home-desc__p">{constant?.HOME_DESC}</p>
      </div>
      <Province />
      <List categories={categories} prices={prices} acreages={acreages}/>
      
    </>
  );
};

export default HomeTitle;
