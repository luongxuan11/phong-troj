import React, { memo, useEffect, useState } from 'react'
import {ItemNewPost} from './index'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../store/actions'

const RelatedPost = ({hotNew}) => {

  const { newPost, hotNews } = useSelector((state) => state.post)

  const [posts, setPosts] = useState(hotNew ? hotNews : newPost)
  const dispatch = useDispatch()

  useEffect(() =>{
    hotNew ?  dispatch(actions.getHotNews()) : dispatch(actions.getNewPost())
  }, [])

  useEffect(() => {
    hotNew ? setPosts(hotNews) : setPosts(newPost)
  }, [hotNew, newPost])


  return (
    <div className='home-list__relatedPost'>
      <h3 className='home-relatedPost__heading'>{hotNew ? "Tin nổi bật" : "Tin mới đăng"}</h3>
      {posts?.map((item) =>{
        return (
          <ItemNewPost key={item?.id} image={JSON.parse(item?.images?.image)} title={item?.title} price={item?.attribute?.price} createdAt={item?.createdAt}/>
        )
      })}
    </div>
  )
}

export default memo(RelatedPost)