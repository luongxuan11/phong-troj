import React from 'react'
import CreatePost from "../containers/System/CreatePost"

const UpdatePost = ({setIsEdit}) => {
  return (
    <div className='update-post row'>
        <div className="update-post__wrapper">
            <CreatePost setIsEdit={setIsEdit} isEdit/>
        </div>
    </div>
  )
}

export default UpdatePost