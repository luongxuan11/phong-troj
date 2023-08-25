import React, {useState, useEffect} from "react";
import { NavLink, useLocation } from "react-router-dom";
import {formatVietNamToString} from '../../utilities/common/formatVietNamToString'
import {path} from '../../utilities/constant'

const Navigation = ({categories}) => {

  // set path url
  let location = useLocation()
  const currentPathName = (location.pathname).replace(/\//g, "")

  return (
    <div className="home-nav">
      <ul className="container home-nav__list row">
       <li className={`home-nav__item ${currentPathName === ""  ? "active" : ""}`}>
        <NavLink to='/'>Trang chủ</NavLink>
       </li>
       
        {categories?.length > 0 &&categories.map((item) => {  // do là nhiều khi nhận data bị lỗi k có nên phải check xem có length k
            return (
              <li className={`home-nav__item ${currentPathName === (formatVietNamToString(item.value)) ? "active" : ""}`} key={item.code}>
                <NavLink to={formatVietNamToString(item?.value)}>{item?.value}</NavLink>
              </li>
            );
          })}
          <li className={`home-nav__item ${currentPathName.includes('lien-he') && 'active'}`}>
            <NavLink to={path.CONTACT}>Liên hệ</NavLink>
          </li>
      </ul>
    </div>
  );
};

export default Navigation;
