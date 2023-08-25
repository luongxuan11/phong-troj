import React, { memo } from 'react'
import {Button, RelatedPost} from './'
import icons from '../utilities/icons'
import avatar from "../assets/avatar.jpg"

const {GoDotFill} = icons;

const AsideUser = ({posts}) => {
  return (
    <>
        <div className="aside-user row">
              <img src={posts?.user?.avatar || avatar} alt="" />
              <strong>{posts?.user?.userName}</strong>
              <p className="row"><GoDotFill style={{ color: "green"}}/> Đang hoạt động</p>
              <Button btnClass={'aside-user__btn row hihi'} text={posts?.user?.phone}/>
              <Button btnClass={'aside-user__btn row'} text={'Zalo'}/>
              <Button btnClass={'aside-user__btn row'} text={'Yêu thích'}/>
        </div>
        <RelatedPost hotNew/>
        <RelatedPost/>
    </>
  )
}

export default memo(AsideUser)