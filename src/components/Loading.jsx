import React, { memo } from "react";
import "./efect.scss";

const Loading = () => {
  return (
    <div className="loading_box row">
      <div class="progress">
        <div class="inner"></div>
      </div>
      <div class="loader">
       <p>Đang tải lên..</p>
       <div class="words">
           <span class="word">Chờ một chút!</span>
           <span class="word">Chờ một chút!</span>
           <span class="word">Phòng trọ123</span>
           <span class="word">Nhanh chóng</span>
           <span class="word">Bảo mật</span>
       </div>
</div>
    </div>
  );
};

export default memo(Loading);
