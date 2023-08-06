import React from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../utilities/constant'


const Header = () => {
    
  return (
    <div className='system-header row'>
        <ul className="system-header__navigation row">
          <li className="system-header__item--li">Phongtro123.com</li>
          <Link className="system-header__item" to={'/'}><li>Trang chủ</li></Link>
          <Link className="system-header__item" target="_blank" to={`/${path.CHO_THUE_PHONG_TRO}`}><li>Phòng trọ</li></Link>
          <Link className="system-header__item" target="_blank" to={`/${path.NHA_CHO_THUE}`}><li>Nhà cho thuê</li></Link>
          <Link className="system-header__item" target="_blank" to={`/${path.CHO_THUE_CAN_HO}`}><li>Căn hộ</li></Link>
          <Link className="system-header__item" to={''}><li>Bảng giá dịch vụ</li></Link>
        </ul>
    </div>
  )
}

export default Header