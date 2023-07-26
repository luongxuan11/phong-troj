import React, { memo } from "react";
import { text } from "../../utilities/DataIntro";
import { Button } from "../../components";
import icons from "../../utilities/icons";
import {Link} from 'react-router-dom'
import { formatVietNamToString } from "../../utilities/common/formatVietNamToString";

const { AiTwotoneStar } = icons;

const Intro = ({categories}) => {

  let stars = [];
  let star = +text?.priceAndStar?.star;
  for (let i = 0; i < star; ++i) {
    stars.push(<AiTwotoneStar key={i} style={{ color: "yellow" }} />);
  }

  return (
    <div className="introduce container">
      <h4 className="introduce__heading">{text?.heading}</h4>
      <p className="introduce__content">{text?.content}
        <strong>
          {categories.length > 0 && categories.map((item) =>{
            return (
                <Link to={formatVietNamToString(item?.value)} className="introduce__content--link" key={item.id}>
                  {`${item.value.toLowerCase()}, `}
                </Link>
            )
          })}
        </strong>
        {text?.content1}
      </p>
      <div className="introduce-statis row">
        {text?.statis.length > 0 &&
          text?.statis.map((item, index) => {
            return (
              <div key={index} className="introduce-statis__item">
                <strong>{item.value}</strong>
                <p>{item.name}</p>
                
              </div>
            );
          })}
      </div>
      <h5 className="introduce__section">{text?.priceAndStar?.price}</h5>
      <small className="introduce__star">{stars}</small>
      <div className="introduce-host">
        <p className="introduce-host__said">{text?.hostSaid?.host}</p>
        <span className="introduce-host__information">{text?.hostSaid?.infoHost}</span>
      </div>
      <div className="introduce-ask">
        <strong className="introduce-ask__ask1">{text?.ask?.ask1}</strong>
        <p className="introduce-ask__ask2">{text?.ask?.ask2}</p>
      </div>
      <Button btnClass={'introduce-btn'} text={"Đăng tin ngay"} />
    </div>
  );
};

export default memo(Intro);
