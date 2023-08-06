import React, {useState, useEffect} from "react";
import Header from "./header";
import { Outlet, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Navigation from "./Navigation";

import { Intro, Contact, Search } from "../smallComponent";
import * as actions from '../../store/actions'
// import {MessAndSupporter} from "../../components"


const Home = () => {
   // gọi api categories 
   const dispatch = useDispatch()
   const location = useLocation()
   const { categories } = useSelector((state) => state.app)
   const {isLoggedIn} = useSelector((state) => state.auth)
   const {currentData} = useSelector((state) => state.user)
   const [showSearch, setShowSearch] = useState(true);

// Kiểm tra location.pathname để xác định các trang không hiển thị Search
   useEffect(() => {
    (location.pathname.includes("/login") || location.pathname.includes("/register") || location.pathname.includes("/chi-tiet")) ? setShowSearch(false) : setShowSearch(true);
 }, [location]);

 // gọi api với useEffect
  useEffect(()=>{
    setTimeout(() =>{
      isLoggedIn && dispatch(actions.getCurrent())
    }, 1000)
  }, [isLoggedIn])

  return (
    <div className="home">
      <Header currentData={currentData} />
      <Navigation categories={categories}/>
      {showSearch && <Search />}
      <div className="home-wrapper container">
        <Outlet/>
      </div>
      <Intro categories={categories}/>
      <Contact/>
    </div>
  );
};

export default Home;
