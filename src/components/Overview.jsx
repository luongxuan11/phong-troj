import React, { memo } from 'react'
import Select from './Select'
import { useSelector } from 'react-redux'
import {Input, UploadFile} from './'

const tagets = [
  {code: 'Tất cả', value: 'Tất cả'},
  {code: 'Nam', value: 'Nam'},
  {code: 'Nữ', value: 'Nữ'},
]

const Overview = ({payload ,setPayload}) => {
  const {categories} = useSelector(state => state.app)
  const {currentData} = useSelector(state => state.user)
  return (
    <div className='create-overview'>
      <h3 className='create-overview__heading'>Thông tin mô tả</h3>
      <div className="overview-type">
        <Select options={categories} value={payload.categoryCode} setValue={setPayload} name='categoryCode' label='Loại chuyên mục'/>
        <Input type={'text'} value={payload.title} setValue={setPayload} id={'title'} label={'Tiêu đề'}/>
        <Input type={'text'} id={'description'} setValue={setPayload} value={payload.description} label={'Nội dung mô tả'} cols={95} row={7}/>
        <Input className={'contactInfo'} value={currentData?.userName || ''} type={'text'} id={'contactInfo'} label={'Thông tin liên hệ'} readOnly={true}/>
        <Input className={'phone'} value={currentData?.phone || ''} type={'text'} id={'phone'} label={'Điện thoại'} readOnly={true}/>
        <Input className={'price flag'} value={payload.priceNumber} setValue={setPayload} small={'Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'} unit={"Đồng"} type={'number'} id={'priceNumber'} label={'Giá cho thuê'}/>
        <Input className={'acreage flag'} value={payload.acreageNumber} setValue={setPayload} unit={"m2"} type={'number'} id={'acreageNumber'} label={'Diện tích'}/>
        <Select options={tagets} value={payload.target} name='target' setValue={setPayload} label={'Đối tượng cho thuê'}/>
      </div>
      <div className="overview-image">
        <UploadFile payload={payload.images} setPayload={setPayload} id={'file'}/>
      </div>
    </div>
  )
}

export default memo(Overview)