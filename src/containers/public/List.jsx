import React, { useEffect } from "react";
import { Button, Item, ItemSidebar, RelatedPost } from "../../components";
import { getPosts, getPostsLimit } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {Pagination} from "./index";
import { useSearchParams, useLocation } from 'react-router-dom'

const List = ({categories, prices, acreages, categoriesCode}) => {
  const [params] = useSearchParams()
  const location = useLocation()
  const dispatch = useDispatch();

  
  const { post, count } = useSelector((state) => state.post); 
  // console.log("check post",post,"check", count);
  // console.log(categoriesCode)

  useEffect(() => {
    let param = []
    for(let entry of params.entries()){
      param.push(entry)
    }
    // console.log(param)
    let searchParamObj = {};
    param.forEach((i) => {
      if(searchParamObj.hasOwnProperty(i[0])){
        searchParamObj[i[0]] = [...searchParamObj[i[0]], i[1]]
      }else{
        searchParamObj = { ...searchParamObj, [i[0]]: [i[1]]};
      }
    });
    console.log(searchParamObj)
    if(categoriesCode) searchParamObj.categoriesCode = categoriesCode
    dispatch(getPostsLimit(searchParamObj));
  }, [params, categoriesCode]);
  // console.log(params)

  return (
    <div className="home-list row">
      <div className="home-list__menu">
        <div className="home-list__inner">
          <div className="home-list__box row">
            <h4 className="home-list__title ellipsis">Danh sách tin đăng</h4>
            <span className="home-list__date">
              Cập nhật ngày: 01:39 27/05/2023
            </span>
          </div>
          <div className="home-list__sort row">
            <span className="home-list__arrange">Sắp xếp: </span>
            <Button text={"Mặc định"} btnClass={"home-list__btn"} />
            <Button text={"Mới nhất"} btnClass={"home-list__btn"} />
            <Button text={"Có video"} btnClass={"home-list__btn"} />
          </div>

          <div className="home-item__wrapper">
            {post.length > 0 &&
              post.map((item) => {
                return (
                  <Item
                    key={item?.id}
                    address={item?.address}
                    attribute={item?.attribute}
                    star={+item?.star}
                    description={JSON.parse(item?.description)}
                    images={JSON.parse(item?.images.image)}
                    title={item?.title}
                    user={item?.user}
                    id={item?.id}
                  />
                );
              })}
          </div>
        </div>
        <Pagination number={params.get('page')} />
      </div>

      <div className="home-list__sidebar">
          {location.pathname === '/' && <ItemSidebar heading={'Danh mục cho thuê'} statis={'(49.212)'} isChecked={true} content={categories}/>}
          <ItemSidebar heading={'Xem theo giá'} className={'prices'} isChecked={false} type={'pricesCode'} content={prices} />
          <ItemSidebar heading={'Xem theo diện tích'} content={acreages} isChecked={false} type={'acreagesCode'} className={'acreages'}/>
          <RelatedPost/>
      </div>
    </div>
  );
};

export default List;
