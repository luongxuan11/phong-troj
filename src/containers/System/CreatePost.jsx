import {React, useState} from 'react'
import {Address, Overview, MapCreatePost, Button} from '../../components'
import { getCodes, getCodesAcreage } from '../../utilities/common/getCodePrices'
import { useSelector } from 'react-redux'
import { apiCreatePost } from '../../services'

const CreatePost = () => {

  const [payload, setPayload] = useState({
    categoryCode: '',
    description: '',
    title: '',
    priceNumber: 0,
    acreageNumber: 0,
    images: '',
    address: '',
    priceCode: '',
    acreageCode: '',
    target: '',
    province: ''
  })
  const {prices, acreages, categories} = useSelector(state => state.app)
  const {currentData} = useSelector(state => state.user)
  // console.log(currentData)
  const handleSubmit = async () =>{
    let priceCodeArr = getCodes(+payload.priceNumber, prices, 1, 15)
    let acreageCodeArr = getCodesAcreage(+payload.acreageNumber, acreages, 20, 90)
    let priceCode = priceCodeArr[0]?.code
    let acreageCode = acreageCodeArr[0]?.code
    let labelCode = `${categories?.find(item => item.code === payload?.categoryCode)?.value} tại ${payload?.address?.split(" - ")?.slice(0, 2)}`
    let category = categories?.find(item => item.code === payload?.categoryCode)?.value
    console.log(category)
    let finalPayload = {
      ...payload,
      priceCode,
      acreageCode,
      userId: currentData?.id,
      priceNumber: +payload.priceNumber / Math.pow(10,6),
      acreageNumber: +payload.acreageNumber,
      target: payload.target || 'Tất cả',
      labelCode: labelCode,
      category
    }
    console.log(finalPayload)
    const response = await apiCreatePost(finalPayload)
    // console.log(response)
  }

  return (
    <div className='system-createPost'>
      <h1 className='system-createPost__heading'>Đăng tin mới</h1>
      <p className='potUp'>Nếu bạn đã từng đăng tin trên Phongtro123.com, 
       hãy sử dụng chức năng ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG để làm mới, 
        đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt.</p>
      <div className="system-createPost__box row">
       <div className='system-createPost__box--inner row'>
          <div className="system-createPost__address"><Address payload={payload} setPayload={setPayload}/></div>
          <div className="system-create__overview"><Overview payload={payload} setPayload={setPayload}/></div>
       </div>
       <div className='system-createPost__box--map'><MapCreatePost/></div>
      </div>
      <Button text={'Túc tiệp'} onClick={handleSubmit} btnClass={'system-createPost__btn'}/>
    </div>
  )
}

export default CreatePost