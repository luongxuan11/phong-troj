import React, { memo } from 'react'

const Select = ({label, options, value, setValue, type, name}) => {
  return (
    <div className='system-address__select__box--inner--small row'>
      <label htmlFor="select--address">{label}</label>
      <select className='select' value={value} onChange={(e) => !name ? setValue(e.target.value) : setValue(prev => ({...prev, [name]: e.target.value}))} id="select--address">
        <option value="">{`--Chọn ${label}--`}</option>
        {options?.map(item =>{
          return (
            <option key={type === "province" ? item?.province_id : type === "district" ? item?.district_id : type === "ward" ? item?.ward_id : item?.code} 
            value={type === "province" ? item?.province_id : type === "district" ? item?.district_id : type === "ward" ? item?.ward_id : item?.code}>
              {type === "province" ? item?.province_name : type === "district" ? item?.district_name : type === "ward" ? item?.ward_name : item?.value}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default memo(Select)