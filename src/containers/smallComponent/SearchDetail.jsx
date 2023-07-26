import React from "react";
import {useSelector} from "react-redux";
import { useLocation } from "react-router-dom";
import { List } from "../public";


const SearchDetail = () => {
  const { prices, acreages, categories} = useSelector(state => state.app)
  const location = useLocation()
  // console.log(location?.state)

  return (
    <>
      <div className="home-page search-detail">
        <h1 className="home-title__h1 search-detail__h1">{(location?.state?.titleSearchHeading === "") ? "Kết quả tìm kiếm: Tất cả" : `Kết quả tìm kiếm tại > ${location?.state?.titleSearchHeading}`}</h1>
        <p className="home-desc__p">{`Kết quả tìm kiếm tại > ${location?.state?.titleSearchHeading} cập nhật mới nhất 2023: giá rẻ, wc riêng, không chung chủ. Chất lượng, thoáng mát, đa dạng diện tích và mức giá.`}</p>
      </div>
      <List categories={categories} prices={prices} acreages={acreages}/>
    </>
  )
};

export default SearchDetail;
