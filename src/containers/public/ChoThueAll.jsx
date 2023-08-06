import React, { useEffect, useState} from "react";
import { useSelector} from "react-redux";
import {useLocation} from 'react-router-dom'
import { Province } from "../../components";
import { List } from ".";
import { formatVietNamToString } from "../../utilities/common/formatVietNamToString";

const ChoThueAll = () => {
  const { prices, acreages, categories} = useSelector(state => state.app)
  const [categoriesCode, setCategoriesCode] = useState('')
  const [currentCategory, setCurrentCategory] = useState({})
  const location = useLocation()
  // console.log(categories)

 useEffect(() =>{
    const category = categories?.find((item) => `/${formatVietNamToString(item.value)}` === location.pathname)
    if(category){
      setCurrentCategory(category)
      setCategoriesCode(category.code)
    }
  }, [location, categories])

  return (
    <>
      <div className="home-page">
        <h1 className="home-title__h1">{currentCategory?.header}</h1>
        <p className="home-desc__p">{currentCategory?.subheader}</p>
      </div>
      <Province />
      <List categoriesCode={categoriesCode} categories={categories} prices={prices} acreages={acreages}/>
      
    </>
  )
};

export default ChoThueAll;
