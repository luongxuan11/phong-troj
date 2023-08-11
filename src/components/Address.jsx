import {React, memo, useEffect, useState} from 'react'
import Select from './Select'
import { apiGetProvince, apiGetDistrict, apiGetWard } from '../services'

const Address = ({setPayload, invalidFields, setInvalidFields}) => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [province, setProvince] = useState()
  const [district, setDistrict] = useState()
  const [ward, setWard] = useState()

  // province
  useEffect(() =>{
    const publicProvince = async() =>{
      const response = await apiGetProvince()
      if(response.status === 200){
        setProvinces(response?.data.results)
      }
    }
    publicProvince()
  }, [])
  // district
  useEffect(() =>{
    setDistrict('')
    setDistricts([])
    const fetchPublicDistrict = async()=>{
      const response = await apiGetDistrict(province)
      if(response.status === 200){
        setDistricts(response.data.results)
      }
    }
    province && fetchPublicDistrict(province)
  }, [province])
  // ward
  useEffect(() =>{
    setWard('')
    setWards([])
    const fetchPublicWard = async()=>{
      const response = await apiGetWard(district)
      console.log(response)
      if(response.status === 200){
        setWards(response.data.results)
      }
    }
    district && fetchPublicWard(district)
  }, [district])

  useEffect(() =>{
    setPayload(prev =>({
      ...prev,
      address: `${ward ? `${wards?.find(item => item.ward_id === ward).ward_name} - ` : ''}${district ? `${districts?.find(item => item.district_id === district).district_name} - ` : ""}${province ? `${provinces?.find(item => item.province_id === province).province_name}` : ""}`,
      province: `${province ? `${provinces?.find(item => item.province_id === province).province_name}` : ""}`

    }))
  }, [province, district, ward])

  return (
    <>
        <h2 className='system-address__heading'>Địa chỉ cho thuê</h2>
        <div className="system-address__select__box row">
         <div className="system-address__select__box--inner row">
            <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} type="province" value={province} setValue={setProvince} options={provinces} label={'Tỉnh/Thành phố'}/>
            <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} type="district" value={district} setValue={setDistrict} options={districts} label={'Quận/Huyện'}/>
            <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} type="ward" value={ward} setValue={setWard} options={wards} label={'Phường/Xã'}/>
         </div>
         <div className="system-address__select__box--exactly">
            <p>Địa chỉ chính xác</p>
            <input className='row'  type="text" value={`${ward ? `${wards?.find(item => item.ward_id === ward).ward_name} - ` : ''}${district ? `${districts?.find(item => item.district_id === district).district_name} - ` : ""}${province ? `${provinces?.find(item => item.province_id === province).province_name}.` : ""}`} readOnly/>
         </div>
        </div>
    </>
  )
}

export default memo(Address)