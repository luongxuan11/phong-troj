import React from 'react'
import ProvinceAction from './ProvinceAction';
import { locationCity } from '../utilities/constant';

const Province = () => {
  return (
    <div className="province-box row">
        {locationCity.map((item) => {
          return (
            <ProvinceAction key={item.id} image={item.image} name={item.name} provinceCode={item.provincesCode}/>
          );
        })}
      </div>
  )
}

export default Province