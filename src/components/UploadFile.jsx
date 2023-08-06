import React, { memo, useState } from 'react'
import icons from '../utilities/icons'
import { apiUploadImages } from '../services/post'
import Loading from './Loading'

    const {FcSwitchCamera, RiDeleteBin5Line} = icons

const UploadFile = ({id, type, payload ,setPayload}) => {
  const [preview, setPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleFiles = async (e) =>{
    e.stopPropagation()
    setIsLoading(true)
    let arrayImages = []
    const files = e.target.files
    const images = new FormData()
    for(let i of files){
      images.append('file', i)
      images.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSEST_NAME)
      const response = await apiUploadImages(images)
      console.log(response)
      if(response?.status === 200){
        arrayImages = [...arrayImages, response.data.secure_url]

      }
    }
    setIsLoading(false)
    setPreview(prev => [...prev, ...arrayImages])
    setPayload(prev => ({...prev, images: [...payload,...arrayImages]}))
  }
  const handleDeleteImage = (image) =>{
    setPreview(prev => prev?.filter(item => item !== image))
    setPayload(prev => ({
      ...prev,
      images: payload?.filter(item => item !== image)
    }))
  }
  return (
    <>
        <h3 className='overview-image__heading'>Hình ảnh</h3>
        <small className='overview-image__introduce'>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
        <div className="overview-image__file">
            {isLoading ? <Loading/> : <label htmlFor={id}><FcSwitchCamera/><span>Thêm ảnh</span></label>}
            
            <input onChange={(e) =>handleFiles(e)} type={id} id={id} multiple/>
        </div>
        <div className="preview row">
            {preview?.map((item, index) => {
              return (
                <div key={index} className="preview-images row">
                  <img  src={item} alt="ảnh"/>
                  <RiDeleteBin5Line onClick={() => handleDeleteImage(item)}/>
                </div>
              )
            })}
        </div>
        
    </>
  )
}

export default memo(UploadFile)