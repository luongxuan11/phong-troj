import React from 'react'
import UploadPostModel from './UploadPostModel'

const UpdatePost = ({setIsEdit,setLoading}) => {
  return (
    <div className='update-post row'>
        <div className="update-post__wrapper">
            <UploadPostModel setLoading={setLoading} setIsEdit={setIsEdit} isEdit/>
        </div>
    </div>
  )
}

export default UpdatePost