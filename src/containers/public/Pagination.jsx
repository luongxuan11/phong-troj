import React, { useEffect, useState } from "react";
import { PageNumber } from "../../components";
import { useSelector } from "react-redux";
import "./containers.scss";
import { useSearchParams } from "react-router-dom";


const Pagination = ({number}) => {
  // console.log('check',typeof number)
  const { post, count } = useSelector((state) => state.post);
  // console.log(count)
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParam] = useSearchParams()
  let postLength = post.length;

  useEffect(() =>{
    // let page = searchParam.get('page')
    number && (+number !== currentPage) && setCurrentPage(+number)
    !number && setCurrentPage(1)
  },[searchParam])

  // console.log(currentPage)
  useEffect(() => {
    if (postLength > 0) {
      let maxPage = Math.floor(count / 10);

      let end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
      let start = currentPage - 2 < 0 ? 1 : currentPage - 1;

      let pages = [];

      for (let i = start; i <= end; ++i) {
        pages.push(i);
      }
      setArrPage(pages);

      currentPage >= (maxPage - 1) ? setIsHideEnd(true) : setIsHideEnd(false)
      currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)
      
      // console.log('check page',pages)
    }
  }, [ count, postLength, number]);
  // console.log(arrPage.length)
  return (
    <div className="home-item__pagination row">
      {!isHideStart && <PageNumber icon={"<<"}  setCurrentPage={setCurrentPage} text={1}/>}
      {!isHideStart && <PageNumber text={"..."} />}
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <PageNumber
              key={item}
              text={item}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          );
        })}
      {!isHideEnd && <PageNumber text={"..."} />}
      {!isHideEnd && <PageNumber icon={">>"} setCurrentPage={setCurrentPage} text={Math.floor(count / postLength)} />}
    </div>
  );
};

export default Pagination;
