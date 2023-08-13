import React, { useEffect, useState } from "react";
import { Button, UpdatePost } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Link, json } from "react-router-dom";
import { path } from "../../utilities/constant";
import moment from "moment";

const ManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false)
  const { postOfCurrent } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, []);

  const checkStatus = (dateTime) =>{
    let today = new Date().toDateString()
    console.log(moment(dateTime, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(today))
    return moment(dateTime, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(today)
  }

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
          <div className="table__title-box row code">
            <p className="ellipsis">Mã tin</p>
          </div>
          <div className="table__title-box img row">
            <p className="ellipsis">Ảnh đại diện</p>
          </div>
          <div className="table__title-box row title">
            <p className="ellipsis">Tiêu đề</p>
          </div>
          <div className="table__title-box row price">
            <p className="ellipsis">Giá</p>
          </div>
          <div className="table__title-box row day-start">
            <p className="ellipsis">Ngày bắt đầu</p>
          </div>
          <div className="table__title-box row day-end">
            <p className="ellipsis">Ngày hết hạn</p>
          </div>
          <div className="table__title-box row status">
            <p className="ellipsis">Trạng thái</p>
          </div>
          <div className="table__title-box row setting">
            <p className="ellipsis">Tùy chọn</p>
          </div>
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
                  <p className="status">{checkStatus(item?.overviews?.expire?.split(',')[1].split(' ')[2]) ? "Đang hoạt động" : "Đã hết hạn"}</p>
                  <div className="setting row">
                    <Button text={'sửa'} onClick={() => setIsEdit(true)} btnClass={'setting__btn--config'}/>
                    <Button text={'xóa'} btnClass={'setting__btn--delete'}/>
                  </div>
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
      {isEdit && <UpdatePost setIsEdit={setIsEdit}/>}
    </div>
  );
};

export default ManagePost;
