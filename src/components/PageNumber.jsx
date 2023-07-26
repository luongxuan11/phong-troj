import React, { memo, useEffect } from "react";
import {createSearchParams,useNavigate,useSearchParams, useLocation} from "react-router-dom";

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation()
  let entries = params.entries();

  const append = (entries) => {
    let param = [];
    params.append("page", +text); // append mấy cái số trong nút phân trang á
    for (let entry of entries) {
      param.push(entry);
    }
    let searchParamObj = {};
    param.forEach((i) => {
      if(Object.keys(searchParamObj)?.some((item) => item === i[0] && item !== "page")){
        searchParamObj[i[0]] = [...searchParamObj[i[0]], i[1]]
      }else{
        searchParamObj = { ...searchParamObj, [i[0]]: [i[1]]};
      }
    });
    return searchParamObj;
  };

  const handleChangePage = () => {
    if (!(text === "...")) {
      // console.log('check', append(entries));
      
      setCurrentPage(+text);

      navigate({
        pathname: location.pathname,
        search: createSearchParams(append(entries)).toString(), // đẩy obj vào vì thằng createSearchParams nhận vào 1 obj
      });
    }
  };

  return (
    <button
      className={`page-number__action ${
        +text === currentPage
          ? "page-number__action--active"
          : `'' ${text === "..." ? "page-number__action--cursor" : ""}`
      }`}
      onClick={handleChangePage}>
      {icon || text}
    </button>
  );
};

export default memo(PageNumber);
