import React, { useEffect } from "react";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Link, json } from "react-router-dom";
import { path } from "../../utilities/constant";

const ManagePost = () => {
  const dispatch = useDispatch();

  const { postOfCurrent } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, []);
  return (
    <div className="system-manage">
      <div className="manage__heading__box row">
        <h1 className="manage__heading">Quản lý tin đăng</h1>
        <div className="manage__control">
          <select name="" id="">
            <option value="Lọc theo trạng thái">Lọc theo trạng thái</option>
          </select>
          <Button text={"Đăng tin mới"} btnClass={"manage-control__btn"} />
        </div>
      </div>
      <div className="system-manage__table">
        <div className="table__title row">
          <p className="row code">Mã tin</p>
          <p className="row img">Ảnh đại diện</p>
          <p className="row title">Tiêu đề</p>
          <p className="row price">Giá</p>
          <p className="row day-start">Ngày bắt đầu</p>
          <p className="row day-end">Ngày hết hạn</p>
          <p className="row status">Trạng thái</p>
        </div>
        <div className="table__content row">
          {postOfCurrent.length > 0 ? (
            postOfCurrent?.map((item) => {
              return (
                <div key={item?.id} className="table__content-box row">
                  <p className="code">{item?.overviews?.code}</p>
                  <div className="img">
                    <img src={JSON.parse(item?.images?.image)[0]} alt="anh" />
                  </div>
                  <p className="title ellipsis">{item?.title}</p>
                  <p className="price ellipsis">{item?.attribute?.price}</p>
                  <p className="day-start ellipsis">
                    {item?.overviews?.created}
                  </p>
                  <p className="day-end ellipsis">{item?.overviews?.expire}</p>
                  <p className="status">{item?.overviews?.expire}</p>
                </div>
              );
            })
          ) : (
            <div className="missApi">
              Bạn chưa có tin đăng nào. Bấm{" "}
              <Link to={`/he-thong/${path.CREATE_POST}`}>vào đây</Link> để bắt
              đầu đăng tin
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePost;
