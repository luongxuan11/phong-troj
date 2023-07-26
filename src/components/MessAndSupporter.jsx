import React, { memo, useEffect, useState } from "react";
import { Button } from "./index";
import icons from "../utilities/icons";

const { BsFillArrowUpCircleFill } = icons;

const MessAndSupporter = () => {
  const [scrollOnTop, setScrollOnTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOnTop(window.scrollY >= 500);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      // console.log('hihi')
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(scrollOnTop);

  return (
    <>
      {scrollOnTop && <div className="messAndSporter row">
      <Button text={<BsFillArrowUpCircleFill />} />
    </div>}
    </>
  );
};

export default memo(MessAndSupporter);
