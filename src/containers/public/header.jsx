import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; //sử dụng useNavigate, React Router DOM sẽ cập nhật URL trên thanh địa chỉ của trình duyệt và render lại component tương ứng với đường dẫn mới.
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import icons from "../../utilities/icons";
import { path } from '../../utilities/constant'
import * as actions from '../../store/actions'
import {useSearchParams} from 'react-router-dom'


const { GrAddCircle } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector((state) => state.auth) // userSelector là 1 hooks của redux giúp lấy được giá trị trong reducer
  const runLogin = useCallback((flag) =>{
    navigate(!flag ? path.LOGIN : path.REGISTER, { state: {flag} })  // set flag khi click
  },[navigate])

  const [searchParam] = useSearchParams()
  const headerRef = useRef()  // useRef dùng để tham chiếu đến DOM
  useEffect(() =>{
    headerRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})  // ở đây scrollIntoView đảm bảo cho pt được chọn nằm trong mh
  },[searchParam.get('page')])
  
  return (
    <div ref={headerRef} className="container home-header row">   {/*nơi đặt useRef */}
      <Link to={'/'}><img src={logo} alt="" /></Link>
      <div className="btn-box row__inline">
        {!isLoggedIn ? 
          <>
           <Button text={"Đăng nhập"} btnClass={" btn-box__login"} onClick={() => {runLogin(false)}}/>    {/* mang flag đi dạng đối số*/}
            <Button text={"Đăng ký"} btnClass={" btn-box__register"} onClick={() => {runLogin(true)}}/>  {/* mang flag đi dạng đối số*/}
          </> 
          :  <>
                <span>Xluong2322001.com Xin chào!</span>
                <Button text={"Đăng xuất"} btnClass={" btn-box__out"} onClick={() => dispatch(actions.logout())}/>
             </>
        }

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
