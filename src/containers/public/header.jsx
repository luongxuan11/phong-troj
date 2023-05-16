import React, { useCallback } from "react";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import { useNavigate, Link } from "react-router-dom"; //sử dụng useNavigate, React Router DOM sẽ cập nhật URL trên thanh địa chỉ của trình duyệt và render lại component tương ứng với đường dẫn mới.
import icons from "../../utilities/icons";
import { path } from '../../utilities/constant'

const { GrAddCircle } = icons;

const Header = () => {
  const navigate = useNavigate();
  const runLogin = useCallback((flag) =>{
    navigate(path.LOGIN, { state: {flag} })  // set flag khi click
  },[navigate])
  
  return (
    <div className="container home-header row">
      <Link to={"/"}><img src={logo} alt="" /></Link>
      <div className="btn-box row__inline">
        <span>Xluong2322001.com Xin chào!</span>
        <Button text={"Đăng nhập"} btnClass={" btn-box__login"} onClick={() => {runLogin(false)}}/>    {/* mang flag đi dạng đối số*/}
        <Button text={"Đăng ký"} btnClass={" btn-box__register"} onClick={() => {runLogin(true)}}/>  {/* mang flag đi dạng đối số*/}
        <Button
          text={"Thêm tin mới"}
          btnClass={" btn-box__news"}
          Icon={GrAddCircle}
        />
      </div>
    </div>
  );
};

export default Header;
