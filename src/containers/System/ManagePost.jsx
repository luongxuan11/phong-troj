import React, { useEffect, useState } from "react";
import { Button, UpdatePost, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Link, json } from "react-router-dom";
import { path } from "../../utilities/constant";
import moment from "moment";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";

const ManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false)
  const [updateData, setUpdateData] = useState(false)
  const [status, setStatus] = useState('')
  const { postOfCurrent} = useSelector((state) => state.post);
  const [postCurrent, setPostCurrent] = useState([])
  useEffect(() =>{
    setPostCurrent(postOfCurrent)
  }, [postOfCurrent])
  // console.log(postOfCurrent)
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, [isEdit, updateData]);

  const checkStatus = (dateTime) => {
    let today = new Date().toLocaleString().split(" ")[1];
    let formatToday = moment(today, process.env.REACT_APP_FORMAT_DATE);
    let formatTime = moment(dateTime, process.env.REACT_APP_FORMAT_DATE); // 3 tham số: 1. ngày giờ được tạo, 2. định dạng, 3. chế độ kiểm tra tính hợp lệ
    return formatTime.isSameOrAfter(formatToday)
  };

  const handleDelete = async (postId, fileName) =>{
    const response = await apiDeletePost(postId, fileName)
    if(response.data.err === 0){
      Swal.fire("Thành công","Đã xóa bài đăng", "success").then(() =>{
        setUpdateData(prev => !prev)
      })
    }else{
      Swal.fire("Oops !","Có lỗi rùi...", "error")
    }
  }

  // status
 useEffect(() =>{
  // console.log(status)
    if(status === 1){
      const activePost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expire?.split(",")[2]))
      setPostCurrent(activePost)
    }else if(status === 2){
      const expirePost = postOfCurrent?.filter(item => !checkStatus(item?.overviews?.expire?.split(",")[2]))
      setPostCurrent(expirePost)
    }else if(status === 0){
      setPostCurrent(postOfCurrent)
    }
 }, [status])

  return (
    <>
      <div className="system-manage">
      <div className="manage__heading__box row">
        <h1 className="manage__heading">Quản lý tin đăng</h1>
        <div className="manage__control">
          <select onChange={e => setStatus(+e.target.value)} value={status} name="" id="">
            <option value="">Lọc theo trạng thái</option>
            <option value="1">Đang hoạt động</option>
            <option value="2">Đã hết hạn</option>
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
          {postCurrent.length > 0 ? (
            postCurrent?.map((item) => {
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
                  <p className="status">
                    {checkStatus(item?.overviews?.expire?.split(",")[2])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </p>
                  <div className="setting row">
                    <Button
                      text={"sửa"}
                      onClick={() => {
                        setIsEdit(true);
                        dispatch(actions.dataEdit(item))
                      }}
                      btnClass={"setting__btn--config"}
                    />
                    <Button text={"xóa"} onClick={() => handleDelete(item.id, item?.images?.fileName)} btnClass={"setting__btn--delete"} />
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
      {isEdit && <UpdatePost setLoading={setLoading} setIsEdit={setIsEdit} />}
    </div>
      {loading && <Loading/>}
    </>
  );
};

export default ManagePost;
