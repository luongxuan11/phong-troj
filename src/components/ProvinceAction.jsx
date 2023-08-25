import React, { memo, useCallback } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { path } from '../utilities/constant'


const ProvinceAction = ({name, image, provinceCode}) => {

  const navigate = useNavigate()

  const handleOnclick = () =>{

    const titleSearchHeading = `Cho thuê ${name}`
     // chuyển trang và tạo url tương ứng
    navigate({
      pathname: `/${path.SEARCH}`,
      search: createSearchParams({
        provincesCode: provinceCode
      }).toString(),
    }, {state: {titleSearchHeading}})
  }

  return (
    <div onClick={handleOnclick} className='province-box__inner'>
        <img src={image} alt='hcm' className='province-box__img'/>
        <p className="province-box__title"><strong>{name}</strong></p>
    </div>
  )
}

export default memo(ProvinceAction)