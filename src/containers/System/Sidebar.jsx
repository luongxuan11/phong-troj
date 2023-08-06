import React from 'react'
import { Button } from '../../components'
import avartar from '../../assets/avatar.jpg'
import { menuManageSystem } from '../../utilities/menuManage'
import { NavLink } from 'react-router-dom'
import icons from '../../utilities/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
    const {FiLogOut} = icons

    const activeStyle = 'system-sidebar__control--active row'
    const notActiveStyle = 'system-sidebar__control--not row'

const Sidebar = ({currentData}) => {
    const dispatch = useDispatch()
    let price = 0
  return (
    <div className='system-sidebar'>
        <div className="system-sidebar__info row">
            <img src={currentData?.avatar || avartar} alt="avatar" />
            {/* src={avartar}  */}
            <div className="system-sidebar__detail row">
                <p className="system-sidebar__useName">{currentData?.userName}</p>
                <p className="system-sidebar__phone">{currentData?.phone}</p>
            </div>
        </div>
        <p className="system-sidebar__code">Mã thành viên: <strong>{currentData?.id?.split('-')[0]}</strong></p>
        <p className="system-sidebar__price">TK chính: <strong>{price}</strong></p>
        <div className="system-sidebar__btn row">
            <Button text={'Nạp tiền'} btnClass={"system-sidebar__btn--price"}/>
            <Button text={'Đăng tin'} btnClass={"system-sidebar__btn--post"}/>
        </div>
        <div className="system-sidebar__control row">
            {menuManageSystem?.map((item) => {
                return(
                    <NavLink className={({isActive}) => isActive ? activeStyle : notActiveStyle} key={item?.id} to={item?.path}>
                        {item?.icon}
                        {item?.text}
                    </NavLink>
                )
            })}
            <span onClick={() => dispatch(actions.logout())} className='system-sidebar__control--span row'><FiLogOut/>Thoát</span>
        </div>
    </div>
  )
}

export default Sidebar