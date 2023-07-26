import React, { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { InputForm, Button } from "../../components";
import * as actions from '../../store/actions'
import {useDispatch, useSelector} from 'react-redux'
import { validate } from "./validate";


const Login = () => {
  const location = useLocation() // nhận flag tại dòng 12 header.jsx
  // console.log(location)
  const dispatch = useDispatch()
  const navigate = useNavigate() // là 1 hooks của react router giúp điều hướng

  // login 
  const {isLoggedIn, mess, update} = useSelector((state) => state.auth)  // userSelector là 1 hooks của redux giúp lấy được giá trị trong reducer
  
  // check register
  const [isRegister, setRegister] = useState(location.state?.flag) // nếu lần đầu tiên mà vào ngay trang login thì state: flag đang là null nên phải check bằng ?.

  // validate
  const [invalidFields, setInvalidFields] = useState([]) // invalid fields => trường không hợp lệ

  // payload
  const [payload, setPayload] = useState({
    userName: '',
    phone: '',
    password: '',
  })
  // console.log(payload)
 useEffect(() =>{
  if (isRegister) {
    setPayload((prevState) => {
      return {
        userName: '',
        ...prevState,
      };
    });
  } else {
    setPayload((prevState) => {
      const { userName, ...rest } = prevState;
      return rest;
    });
  }
 }, [isRegister])

  // set false thì là login true là register xem tại header.jsx
  useEffect(() =>{          
    setRegister(location.state?.flag)
  },[location.state?.flag])            // khi mà flag thay đổi sẽ set lại giá trị

  // check islogin
  useEffect(() =>{
    isLoggedIn && navigate('/') // navigate =>> react router
  }, [isLoggedIn, navigate])


  // sweet alert2
  useEffect(() =>{
    mess && Swal.fire('Oops !', mess, 'error')
  }, [mess, update])


// auth
  const handleSubmit = async(e) =>{
    // console.log(">> check login at row 22..",payload)
    e.preventDefault()
    let invalids = validate(payload, setInvalidFields)
    if(invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
   console.log(invalids)
  }
  // console.log( invalidFields)

  return (
      <form onSubmit={handleSubmit}>
        <div className="home-login__wrapper">
          <h3 className="home-login__title">{isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}</h3>        {/* ràng buộc tại row 05*/}
          <div className="home-login__control">
           {isRegister &&  <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} htmlFor={"name"} type={"userName"} label={"Họ và tên"} id={"name"} value={payload.userName || ""} setValue={setPayload}/>}   {/* ràng buộc tại row 05*/}
           <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} htmlFor={"phone"} type={"phone"} label={"Số điện thoại"} id={"phone"} value={payload.phone} setValue={setPayload}/>
           <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields} htmlFor={"password"} type={"password"} label={"Mật khẩu"} id={"password"} value={payload.password} setValue={setPayload}/>
       </div>
        <Button type="submit" text={isRegister ? "Tạo tài khoản" : "Đăng nhập"} btnClass={"home-login__btn row"} />     {/* ràng buộc tại row 05*/}
        <div className="row home-login__option">
          {isRegister ? <small>Bạn đã có tài khoản? <span onClick={() => {setRegister(false); setPayload({userName: '', phone: '', password: ''})}} className="home-login__ask-register">Đăng nhập ngay</span> </small> 
         : <>
             <small className="home-login__ask-login">Bạn quên mật khẩu?</small>                                                        {/* ràng buộc tại row 05*/} 
             <small onClick={() => {setRegister(true); setPayload({userName: '', phone: '', password: ''})}} className="home-login__ask-login">Tạo tài khoản mới.</small>
           </>}
        </div> 
      </div>
      </form>
  );
};

export default Login;
