import React, { useState, useEffect, memo } from "react";
import icons from "../../utilities/icons";
import { Button } from "../../components";
import { getNumber, getNumberAcreage } from "../../utilities/common/getnumber";
// import {getCodes,getCodesAcreage} from "../../utilities/common/getCodePrices";
import {ModelItem} from "../../components"

const { BsArrowLeft } = icons;
const Model = ({setIsShowModel, content, name, text, handleSubmit, queries, arrMinMax, defaultText}) => {
  // console.log(">>>>>>>>>>>>>",queries[`${[name]}Code`])
  const textToLower = text.toLowerCase()
  // console.log(defaultText, textToLower)
  const [presentMin, setPresentMin] = useState(
    name === "prices" && arrMinMax?.pricesArr
      ? arrMinMax?.pricesArr[0]
      : name === "acreages" && arrMinMax?.acreagesArr
      ? arrMinMax?.acreagesArr[0]
      : 0
  );
  const [presentMax, setPresentMax] = useState(
    name === "prices" && arrMinMax?.pricesArr
      ? arrMinMax?.pricesArr[1]
      : name === "acreages" && arrMinMax?.acreagesArr
      ? arrMinMax?.acreagesArr[1]
      : 100
  );
  const [activeElement, setActiveElement] = useState("");
  
  useEffect(() => {
    const activeTrack = document.querySelector(".track-active");
    if (activeTrack) {
      if (presentMax <= presentMin) {
        activeTrack.style.left = `${presentMax}%`;
        activeTrack.style.right = `${100 - presentMin}%`;
      } else {
        activeTrack.style.left = `${presentMin}%`;
        activeTrack.style.right = `${100 - presentMax}%`;
      }
    }
  }, [presentMax, presentMin]);

  const handleStack = (e) => {
    e.stopPropagation();
    const stackElement = document.querySelector(".line");
    const stackSize = stackElement.getBoundingClientRect(); // lấy ra kích thước và vị trí
    setActiveElement("");
    let location = Math.floor(
      ((e.clientX - stackSize.left) * 100) / stackSize.width
    );
    if (Math.abs(location - presentMin) < Math.abs(location - presentMax)) {
      setPresentMin(location);
    } else {
      setPresentMax(location);
    }
  };
  // convert price
  const convert100ToTarget = (percent) => {
    return name === "prices"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "acreages"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };
  const convert15To100 = (percent) => {
    let target = name === "prices" ? 15 : name === "acreages" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };
  // end convert


  const resultPresentMax = convert100ToTarget(presentMax);
  const resultPresentMin = convert100ToTarget(presentMin);

  // handle price
  const handleActive = (id, value) => {
    setActiveElement(id);
    let arrMaxMin =
      name === "prices" ? getNumber(value) : getNumberAcreage(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        // đặt mặc định
        setPresentMin(0);
        setPresentMax(convert15To100(1)); // 7%
      }
      if (arrMaxMin[0] === 20) {
        // đặt mặc định
        setPresentMin(0);
        setPresentMax(convert15To100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPresentMin(100);
        setPresentMax(100);
      }
    }
    if (arrMaxMin.length === 2) {
      setPresentMin(convert15To100(arrMaxMin[0]));
      setPresentMax(convert15To100(arrMaxMin[1]));
    }
  };

  //className
  const getListItemClassName = (itemId, itemValue) => {
    let min = resultPresentMin < resultPresentMax ? resultPresentMin : resultPresentMax;
    let max = resultPresentMin < resultPresentMax ? resultPresentMax : resultPresentMin;
    if (itemId === activeElement) {
      return "model-province__quickPick--bgr";
    } else if (name === "prices") {
      return (
        getNumber(itemValue)[0] === min &&
        getNumber(itemValue)[1] === max
          ? "model-province__quickPick--bgr"
          : ""
      );
    } else if (name === "acreages") {
      return getNumberAcreage(itemValue)[0] === min &&
        getNumberAcreage(itemValue)[1] === max
        ? "model-province__quickPick--bgr"
        : "";
    } else {
      return "";
    }
  };

  // handle before submit
  const handleBeforeSubmit = (e) => {
    let min =
      resultPresentMin < resultPresentMax ? resultPresentMin : resultPresentMax;
    let max =
      resultPresentMin < resultPresentMax ? resultPresentMax : resultPresentMin;
    let arrMinMax = [min, max];
    // const gaps =
    //   name === "prices"
    //     ? getCodes(arrMinMax, content)
    //     : name === "acreages"
    //     ? getCodesAcreage(arrMinMax, content)
    //     : console.error("mày vào sửa ở file model dòng 104");
    //     console.log(gaps)
    handleSubmit( e, {
        [`${name}Number`]: arrMinMax,
        [name]:
          resultPresentMin === resultPresentMax
            ? `${resultPresentMin} ${name === "prices" ? "triệu" : "m2"}`
            : name === "prices"
            ? `Từ ${min} - ${max} triệu`
            : `Từ ${min} - ${max} m2`,
      },
      {
        [`${name}Arr`]: [presentMin, presentMax],
      }
    );
  };

  // return jsx
  return (
    <div onClick={(e) => {
        setIsShowModel(false);
      }} className="model-province row">
      <div onClick={(e) => {
          e.stopPropagation(); // event k cho các phẩn tử cha dính event
          setIsShowModel(true); // tức là khi click vào đây mặc định thằng cha sẽ ăn theo nhưng nếu có stopPropagation thì sẽ k bị ăn
        }} className="model-province__box">
        <div className="model-province__header row">
          <BsArrowLeft onClick={(e) => {
              e.stopPropagation();
              setIsShowModel(false);
            }}
            className="model-province__header__icon"
          />
          <span className="model-province__header__title">{text}</span>
        </div>

        {/* name categories and province */}
        {(name === "categories" || name === "provinces") && (
          <ModelItem  name={name} defaultText={defaultText} textToLower={textToLower} queries={queries} handleSubmit={handleSubmit} content={content}/>
        )}

        {/* name prices and acreage */}
        {(name === "prices" || name === "acreages") && (
          <div className="model-province__content">
            <span className="model-province__content--statis">
              {resultPresentMin === resultPresentMax
                ? `${resultPresentMin} ${name === "prices" ? "triệu" : "m2"}`
                : `Từ ${
                    presentMin <= presentMax
                      ? resultPresentMin
                      : resultPresentMax
                  } - ${
                    presentMax >= presentMin
                      ? resultPresentMax
                      : resultPresentMin
                  } ${name === "prices" ? "triệu" : "m2"}`}
            </span>
            <div className="model-province__rangeBox">
              <div onClick={handleStack} className="line"></div>
              <div onClick={handleStack} className="track-active"></div>
              <input
                className="model-province__rangeBox--range"
                type="range"
                max={100}
                min={0}
                value={presentMin}
                step={1}
                onChange={(e) => {
                  setPresentMin(+e.target.value);
                  activeElement && setActiveElement("");
                }}
              />
              <input
                className="model-province__rangeBox--range"
                type="range"
                max={100}
                min={0}
                value={presentMax}
                step={1}
                onChange={(e) => {
                  setPresentMax(+e.target.value);
                  activeElement && setActiveElement("");
                }}
              />
            </div>
            <div className="model-province__numberChange row">
              <span className="cursor">0</span>
              <span className="cursor">
                {name === "prices"
                  ? "Trên 15 triệu"
                  : name === "acreages"
                  ? "Trên 90m2"
                  : ""}
              </span>
            </div>
            <h4>Chọn nhanh:</h4>
            <ul className="model-province__quickPick row">
              {content?.map((item) => {
                return (
                  <li
                    className={`cursor ${getListItemClassName(
                      item.id,
                      item.value
                    )} `}
                    onClick={() => handleActive(item.id, item.value)}
                    key={item?.id}>
                    {item?.value}
                  </li>
                );
              })}
            </ul>
            <Button
              onClick={handleBeforeSubmit}
              btnClass={"model-province__btn row"}
              text={"Áp dụng"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Model);
