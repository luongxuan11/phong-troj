import React from 'react'
import UploadPostModel from './UploadPostModel'

const UpdatePost = ({setIsEdit}) => {
  return (
    <div className='update-post row'>
        <div className="update-post__wrapper">
            <UploadPostModel setIsEdit={setIsEdit} isEdit/>
        </div>
    </div>
  )
}

export default UpdatePost