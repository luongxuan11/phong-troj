import React, { memo } from 'react'
import icons from '../utilities/icons'
import avatar from '../../src/assets/avatar.jpg'

const {BsFacebook} = icons
const User = ({currentData}) => {
    console.log(currentData)
  return (
    <div className='info-user row'>
        <div className="info-user__image">
            <img src={currentData?.avatar || avatar} title={currentData?.userName} alt='hinh anh' />
        </div>
        <div className="info-user__wrapper row">
            <p className="info-user__welcome">Xin chào: <strong>{currentData?.userName}</strong></p>
            <p className='info-user__code'>Mã tài khoản: <strong>{currentData?.id?.split('-')[0]}</strong></p>
            <a className='info-user__fb cursor' href={currentData?.facebook} onClick={() => !currentData?.facebook && alert('Hiện chưa có')} target="_blank" rel="noopener noreferrer">Liên hệ qua: <BsFacebook/></a>
        </div>
    </div>
  )
}

export default memo(User)