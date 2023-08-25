import React, { memo } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Sliders = ({ postImage, userName }) => {
  const images = postImage && JSON.parse(postImage);

  return (
    <div className="post__slider">
        <Swiper pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper">
            {images?.length > 0 && images.map((item, index) =>{
                return (
                    <SwiperSlide key={index}>
                        <img src={item} alt="anh" />
                    </SwiperSlide>
                )
            })}
      </Swiper>
    </div>
  );
};

export default memo(Sliders);



// {images?.length > 0 &&images.map((item, index) => {
//     return (
//       <div key={index} className="slider__list>
//         <img src={item} alt="anh" />
//       </div>
//     );
//   })}