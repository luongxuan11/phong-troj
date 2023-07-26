import React, { memo } from "react";
import "./components.scss";
import icons from "../utilities/icons";
import {formatVietNamToString} from '../utilities/common/formatVietNamToString'
import {Link, createSearchParams,useLocation ,useNavigate} from 'react-router-dom'
import * as actions from "../store/actions"
import {useDispatch} from 'react-redux'

const { GrFormNext } = icons;

const ItemSidebar = ({ heading, statis, content, className, isChecked, change, type }) => {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  // console.log(location)

  
  
  const handleFilterPosts = (code) =>{
    navigate({
    pathname: location.pathname,
    search: createSearchParams({
      [type]: code,
    }).toString(),
  });
  }

  return (
    <>
      {isChecked ?
        <div className="home-list__sidebar__control">
        <h4 className="sidebar__heading ellipsis">{heading}</h4>
        <div className="sidebar-menu">
          <div className={`sidebar-menu__wrapper  ${className}`}>
             {content?.length > 0 &&
              content.map((item) => {
                return (
                  <div key={item.id} className="sidebar-menu__box row">
                    <Link to={formatVietNamToString(item.value)} className="sidebar-menu__box--inner row__inline">
                      <GrFormNext />
                      <p className={`sidebar-menu__item ellipsis`}>{item.value}</p>
                    </Link>
                    <span className="sidebar-menu__statis">{statis}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      : 
      <div className="home-list__sidebar__control">
        <h4 className="sidebar__heading ellipsis">{heading}</h4>
        <div className="sidebar-menu">
          <div className={`sidebar-menu__wrapper  ${className}`}>
             {content?.length > 0 &&
              content.map((item) => {
                return (
                  <div key={item.id} className="sidebar-menu__box row">
                    <div className="sidebar-menu__box--inner row__inline">
                      <GrFormNext />
                      <p onClick={() => handleFilterPosts(item.code)} className={`sidebar-menu__item ellipsis`}>{item.value}</p>
                    </div>
                    <span className="sidebar-menu__statis">{statis}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default memo(ItemSidebar);
