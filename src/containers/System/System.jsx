import {React, useEffect} from 'react'
import {useDispatch ,useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../utilities/constant'
import {Header, Sidebar} from './'
import './system.scss'
import * as actions from '../../store/actions'

const System = () => {
  const {isLoggedIn} = useSelector(state => state.auth)
  const {currentData} = useSelector((state) => state.user)
  // console.log(currentData)
  const dispatch = useDispatch()
  useEffect(() =>{
    isLoggedIn && dispatch(actions.getCurrent())
  }, [isLoggedIn])
  if(!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true}/> // replace = true thì sẽ xóa hết lịch sử và không cho quay lại

  return (
    <div className='system'>
      <Header />
      <div className='row system-wrapper'>
        <Sidebar currentData={currentData}/>
        <Outlet/>
      </div>
    </div>
  )
}

export default System