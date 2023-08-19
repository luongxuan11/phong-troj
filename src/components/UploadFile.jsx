import React, { memo, useEffect, useState } from 'react'
import icons from '../utilities/icons'
import { apiUploadImages } from '../services/post'
import Loading from './Loading'
import { useSelector } from 'react-redux'

    const {FcSwitchCamera, RiDeleteBin5Line} = icons

const UploadFile = ({id, type, payload ,setPayload, setInvalidFields, invalidFields}) => {
  const {dataEdit} = useSelector(state => state.post)
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
  useEffect(() =>{
    if(dataEdit){
      let images = JSON.parse(dataEdit?.images?.image)
      images && setPreview(images)
    }
  }, [dataEdit])
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
        <small className='select--error input--error'>
            {invalidFields?.some(item => item.name === "images") && invalidFields?.find(item => item.name === "images")?.mess}
          </small>
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