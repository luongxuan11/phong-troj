import React, { useEffect } from 'react'
import { Button } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom'
import { path } from '../../utilities/constant'

const ManagePost = () => {
    const dispatch = useDispatch()
    
    const {postOfCurrent} = useSelector(state => state.post)
    useEffect(() =>{
        dispatch(actions.getPostsLimitAdmin())
    }, [])
    console.log('check',!postOfCurrent)
  return (
    <div className='system-manage'>
        <div className="manage__heading__box row">
            <h1 className="manage__heading">Quản lý tin đăng</h1>
            <div className="manage__control">
                <select name="" id="">
                    <option value="Lọc theo trạng thái">Lọc theo trạng thái</option>
                </select>
                <Button text={'Đăng tin mới'} btnClass={'manage-control__btn'}/>
            </div>
        </div>
        <table className='system-manage__table'>
            <thead>
                <tr>
                    <th>Mã tin</th>
                    <th>Ảnh đại diện</th>
                    <th>Tiêu đề</th>
                    <th>Giá</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày hết hạn</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {postOfCurrent 
                ? <tr>
                    <td className='missing-post' colSpan={"7"}>Bạn chưa có tin đăng nào. Bấm <Link to={`/he-thong/${path.CREATE_POST}`}>vào đây</Link> để bắt đầu đăng tin</td>
                </tr>
                : postOfCurrent?.map(item =>{}) 
                }
            </tbody>
        </table>
    </div>
  )
}

export default ManagePost