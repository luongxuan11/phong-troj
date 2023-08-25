import React from "react";
import map from '../assets/map.png'
const MapCreatePost = ({detail}) => {
  return (
    <div className={`create__map--inner ${detail ? "" : "row"}`}>
      <div className="map__detail"><img src={map} alt="" /></div>

      {!detail ? <div className="map__title__box">
        <h4 className="map__title--heading">Luu ý khi đăng tin</h4>
        <ul className="map__title">
          <li className="map__title__content">Nội dung phải viết bằng tiếng Việt có dấu</li>
          <li className="map__title__content">Tiêu đề tin không dài quá 100 kí tự</li>
          <li className="map__title__content">Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.</li>
          <li className="map__title__content">Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.</li>
          <li className="map__title__content">Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!</li>
        </ul>
      </div> : ""}
    </div>
  );
};

export default MapCreatePost;
