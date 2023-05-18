import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { InputForm, Button } from "../../components";
// import { apiRegister } from "../../services/auth";
import * as actions from '../../store/actions'
import {useDispatch} from 'react-redux'

const Login = () => {
  const location = useLocation() // nhận flag tại dòng 12 header.jsx
  // console.log(location)
  const dispatch = useDispatch()
  
  const [isRegister, setRegister] = useState(location.state?.flag) // nếu lần đầu tiên mà vào ngay trang login thì state: flag đang là null nên phải check bằng ?.
  const [payload, setPayload] = useState({
    userName: '',
    phone: '',
    password: '',
  })
  useEffect(() =>{          
    setRegister(location.state?.flag)
  },[location.state?.flag])            // khi mà flag thay đổi sẽ set lại giá trị


  const handleSubmit = async() =>{
    console.log(">> check login at row 22..",payload)
   dispatch(actions.register(payload))
  }

  return (
      <div className="home-login__wrapper">
        <h3 className="home-login__title">{isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}</h3>        {/* ràng buộc tại row 05*/}
        <div className="home-login__control">
         {isRegister &&  <InputForm htmlFor={"name"} type={"userName"} label={"Họ và tên"} id={"name"} value={payload.userName} setValue={setPayload}/>}   {/* ràng buộc tại row 05*/}
          <InputForm htmlFor={"phone"} type={"phone"} label={"Số điện thoại"} id={"phone"} value={payload.phone} setValue={setPayload}/>
          <InputForm htmlFor={"password"} type={"password"} label={"Mật khẩu"} id={"password"} value={payload.password} setValue={setPayload}/>
        </div>
        <Button onClick={handleSubmit} text={isRegister ? "Tạo tài khoản" : "Đăng nhập"} btnClass={"home-login__btn row"} />     {/* ràng buộc tại row 05*/}
        <div className="row home-login__option">
          {isRegister ? <small>Bạn đã có tài khoản? <span onClick={() => {setRegister(false)}} className="home-login__ask-register">Đăng nhập ngay</span> </small> 
         : <>
             <small className="home-login__ask-login">Bạn quên mật khẩu?</small>                                                        {/* ràng buộc tại row 05*/} 
             <small onClick={() => {setRegister(true)}} className="home-login__ask-login">Tạo tài khoản mới.</small>
           </>}
        </div>
      </div>
  );
};

export default Login;
