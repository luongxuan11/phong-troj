import React, { memo } from "react";
import icons from "../utilities/icons";
import { Button } from "./index";
import {useNavigate, Link} from 'react-router-dom'
import {formatVietNamToString} from '../utilities/common/formatVietNamToString'
import avatar from "../assets/avatar.jpg"
import { Buffer } from "buffer";


const { AiTwotoneStar, AiOutlineHeart, AiFillHeart } = icons;



const Item = ({address, attribute, star, description, images, title, user, id}) => {
  // console.log(user)
  let navigate = useNavigate()

  // star
  let stars = [];
  for (let i = 0; i < star; ++i) {
  stars.push(<AiTwotoneStar key={i} style={{ color: "yellow" }} />);
  }
  // addres =>> array
  const parts = address.split(/,|-/)
  const addArr = parts.slice(-2)
  


  return (
    <div className="home-item__box row">
      <Link to={`/chi-tiet/${formatVietNamToString(title)}/${id}`} className="home-item__image--wrapper">
        {images.slice(0,4).map((item, index) => {
          return (
            <img key={index} src={item} alt="" className="home-item__image" />
          );
        })}
        <span className="home-item__image--info">{images.length} Ảnh</span>
      </Link>
      <div className="home-item__info">
        <h5 className="">
          <span className="home-item__info--star ">{stars} </span>
          {title}
        </h5>
        <div className="home-item__static row">
          <strong className="">{attribute?.price}</strong>
          <p className="acreage">{attribute?.acreage}</p>
          <p className="address">{addArr}</p>
        </div>
        <span className="today">{attribute?.published}</span>
        <p className="info__desc ">
          {description}
        </p>
        <div className="user-info row">
          <div className="row">
            <img
              src={avatar}
              alt={user?.userName}
              title={user?.userName}
              className="user"
            />
            <span>{user?.userName}</span>
          </div>
          <a rel="nofollow" target="_blank" href={`https://zalo.me/${user?.phone}`}><Button text={"Nhắn Zalo"} btnClass={"user-action"} /></a>
        </div>
        <a rel="nofollow" target="_blank" href={`tel:${user?.phone}`}><Button text={`Gọi ${user?.phone}`} btnClass={"user-phone"} /></a>
      </div>
    </div>
  );
};

export default memo(Item);
