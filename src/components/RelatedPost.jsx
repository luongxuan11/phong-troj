import React, { memo, useEffect } from 'react'
import {ItemNewPost} from './index'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../store/actions'

const RelatedPost = () => {

  const { newPost } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(actions.getNewPost())
  }, [])
  // console.log('check newpost', newPost)

  return (
    <div className='home-list__relatedPost'>
      <h3 className='home-relatedPost__heading'>Tin mới đăng</h3>
      {newPost?.map((item) =>{
        return (
          <ItemNewPost key={item?.id} image={JSON.parse(item?.images?.image)} title={item?.title} price={item?.attribute?.price} createdAt={item?.createdAt}/>
        )
      })}
    </div>
  )
}

export default memo(RelatedPost)