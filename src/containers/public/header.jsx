import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button, User } from "../../components";
import icons from "../../utilities/icons";
import { menuManage } from "../../utilities/menuManage";
import { path } from '../../utilities/constant'
import * as actions from '../../store/actions'
import { useSearchParams } from 'react-router-dom'

const { GrAddCircle, FiLogOut, IoIosArrowDown } = icons;

const Header = ({ currentData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const runLogin = useCallback((flag) => {
    navigate(!flag ? path.LOGIN : path.REGISTER, { state: { flag } });
  }, [navigate]);

  const [isShowMenu, setIsShowMenu] = useState(false);

  const [searchParam] = useSearchParams();
  const headerRef = useRef();

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [searchParam.get('page')]);

  return (
    <div ref={headerRef} className="container home-header row">
      <Link to={'/'}><img src={logo} alt="" /></Link>
      <div className="btn-box row__inline">
        {!isLoggedIn ?
          <>
            <Button text={"Đăng nhập"} btnClass={" btn-box__login"} onClick={() => { runLogin(false) }} />
            <Button text={"Đăng ký"} btnClass={" btn-box__register"} onClick={() => { runLogin(true) }} />
          </>
          : <>
            <span><User currentData={currentData}/></span>
            <Button text={<>Quản lý tài khoản <IoIosArrowDown /></>} onClick={() => setIsShowMenu(prev => !prev)} btnClass={"btn-box__manage"} />
            {isShowMenu && <div className="btn-box__manage__model row">{menuManage?.map((item) => {
              return (
                <Link onClick={() => setIsShowMenu(false)} className="cursor row ellipsis" key={item?.id} to={item?.path}>{item?.icon} {item?.text}</Link>
              )
            })}
              <p className="cursor row" onClick={() => {
                    setIsShowMenu(false)                
                    dispatch(actions.logout()) 
                  }}>{<FiLogOut />} Đăng xuất!</p>
            </div>}
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
