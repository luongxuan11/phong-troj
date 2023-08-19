import React, {useState, useEffect} from 'react'
import {Input, Button} from "../../components"
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.jpg'
import "../../components/animation/btn.scss"
import { useSelector, useDispatch } from 'react-redux'
import { validate } from '../public/validate'
import { fileToBase64, blobToBase64 } from '../../utilities/common/tob64'
import { apiUpdateUser } from '../../services'
import Swal from 'sweetalert2'
import { getCurrent } from '../../store/actions'

const EditAccount = () => {

  const dispatch = useDispatch()

  const {currentData} = useSelector(state => state.user)
  const [invalidFields, setInvalidFields] = useState([])
  // console.log(currentData)
  const [payload, setPayload] = useState({
    userName: '',
    zalo: '',
    facebook: '',
    avatar: ''
  })

  useEffect(() => {
    setPayload({
      userName: currentData.userName || '',
      zalo: currentData.zalo || '',
      facebook: currentData.facebook || '',
      avatar: blobToBase64(currentData.avatar) || avatar
    });
  }, [currentData]);


  const handleSubmit = async () =>{
    const invalid = validate(payload, setInvalidFields)
    if(invalid === 0){
      const response = await apiUpdateUser(payload)
      console.log(response)
      if(response.data.err === 0){
        Swal.fire("Thành công","Chỉnh sửa thành công", "success").then(() =>{
          dispatch(getCurrent())
        })
      }else{
        Swal.fire("Oops !","Có lỗi rùi...", "error")
      }
    }
  }

  const handleUploadFile = async (e) =>{
    const image = await fileToBase64(e.target.files[0])
    // console.log(image)
    setPayload(prev => ({
      ...prev,
      avatar: image
    }))
  }

  return (
    <div className='edit-account--wrapper'>
      <h1 className="edit-account__heading">Cập nhật thông tin cá nhân</h1>
      <div className="edit-account__info--box row">
        <Input type={'text'} value={currentData?.id || ''} id={'hashtag'} label={'Mã thành viên:'} readOnly={true}/>
        <Input className={'edit-phone'} value={currentData.phone || ''} type={'text'} id={'phone'} label={'Số điện thoại:'} unit={"Đổi số điện thoại"} readOnly={true}/>
      </div>

      <div className="edit-account__info--box edit-account__info--box1 row">
        <Input edit={"userName"} type={'text'} setValue={setPayload} value={payload.userName} invalidFields={invalidFields} setInvalidFields={setInvalidFields} id={'userName'} label={'Tên hiển thị:'}/>

        <Input edit={"zalo"} type={'text'} setValue={setPayload} value={payload.zalo} invalidFields={invalidFields} setInvalidFields={setInvalidFields} id={'zalo'} label={'Số Zalo:'}/>

        <Input edit={"facebook"} type={'text'} setValue={setPayload} value={payload.facebook} invalidFields={invalidFields} setInvalidFields={setInvalidFields} id={'facebook'} label={'Facebook link:'}/>

        <div className="overview-type__input--box overview-type__input--box2 row">
          <label htmlFor="password">Mật khẩu:</label>
          <Link className='password'>Đổi mật khẩu</Link>
        </div>
        
        <div className="overview-type__input--box overview-type__input--box3 row">
          <label htmlFor="avatar">Ảnh đại diện:</label>
          <div className="image__user row">
           <img src={payload.avatar} alt="anh" />
           <input onChange={(e) => handleUploadFile(e)} type="file" />
          </div>
        </div>
        <Button onClick={() => handleSubmit()} btnClass={'edit-account__btn btn-effect row'} text={"Lưu & Cập nhật"}/>
      </div>
    </div>
  )
}

export default EditAccount