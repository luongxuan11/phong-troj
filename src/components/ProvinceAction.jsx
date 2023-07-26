import React from 'react'


const ProvinceAction = ({name, image}) => {
  return (
    <div className='province-box__inner'>
        <img src={image} alt='hcm' className='province-box__img'/>
        <p className="province-box__title"><strong>{name}</strong></p>
    </div>
  )
}

export default ProvinceAction