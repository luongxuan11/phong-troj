import React, {useState} from 'react'
import "./containers.scss"
import {InputForm, Button} from "../../components"
import Swal from 'sweetalert2'

const Contact = () => {
    const [payload, setPayload] = useState({
      name: '',
      phone: '',
      content: ''
    })

    const handleSubmit = () =>{
      Swal.fire(`Cảm ơn ${payload.name ? payload.name : 'bạn!'}`, "Phản hồi của bạn đã được chúng tôi ghi nhận.", "success").then(()=>{
        setPayload({
          name: '',
          phone: '',
          content: ''
        })
      })
    }
  return (
    <div className='contact-public'>
      <h1 className='heading'>Liên hệ với chúng tôi</h1>
      <div className='contact-public__box row'>
        <div className='contact-public__info row'>
          <h3>Thông tin liên hệ</h3>
          <p>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com</p>
          <p><strong>Điện thoại: </strong>077859xxx</p>
          <p><strong>Email: </strong>phongtro123@gmail</p>
          <p><strong>Zalo: </strong>077859xxx</p>
          <p><strong>Viber: </strong>077859xxx</p>
          <p><strong>Địa chỉ: </strong>LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.</p>
        </div>
        <div className='form row'>
          <h3>Liên hệ trực tuyến: </h3>
          <InputForm setValue={setPayload} type={'name'} value={payload.name} label={"Họ và tên của bạn:"}/>
          <InputForm setValue={setPayload} type={'phone'} value={payload.phone}  label={"Số điện thoại:"}/>
          <div className="content">
            <label htmlFor="content">Nội dung</label>
            <textarea onChange={e => setPayload(prev => ({...prev, content: e.target.value}))} value={payload.content} name="" id="content" cols="50" rows="5"></textarea>
          </div>
          <Button onClick={handleSubmit} text={"Gửi liên hệ"} btnClass={'form-btn__contact row'}/>
        </div>
      </div>
    </div>
  )
}

export default Contact