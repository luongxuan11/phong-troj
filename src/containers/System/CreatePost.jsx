import {React, memo, useEffect, useState} from 'react'
import {Address, Overview, MapCreatePost, Button} from '../../components'
import { getCodes, getCodesAcreage } from '../../utilities/common/getCodePrices'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { apiCreatePost } from '../../services'
import { validate } from '../public/validate'
import { resestDataEdit } from '../../store/actions'

const CreatePost = () => {
  const dispatch = useDispatch()
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
  useEffect(() =>{
    dispatch(resestDataEdit())
  }, [])
  const {prices, acreages, categories} = useSelector(state => state.app)
  const {currentData} = useSelector(state => state.user)
  const [invalidFields, setInvalidFields] = useState([])
  // console.log(currentData)
  // console.log(prices)
  const handleSubmit = async () =>{
    let priceCodeArr = getCodes((+payload.priceNumber / Math.pow(10,6)), prices, 1, 15)
    let acreageCodeArr = getCodesAcreage(+payload.acreageNumber, acreages, 20, 90)
    let priceCode = priceCodeArr[0]?.code
    let acreageCode = acreageCodeArr[0]?.code
    let labelCode = `${categories?.find(item => item.code === payload?.categoryCode)?.value} tại ${payload?.address?.split(" - ")?.slice(0, 2)}`
    let category = categories?.find(item => item.code === payload?.categoryCode)?.value
    // console.log(category)
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
    const result = validate(finalPayload, setInvalidFields)
    console.log(result)
    if(result === 0){
      const response = await apiCreatePost(finalPayload)
    if(response?.data.err === 0){
      Swal.fire("Thành công","Đã thêm bài đăng mới", "success").then(() =>{
        setPayload({
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
      })
    }else{
      Swal.fire("Oops !","Có lỗi rùi...", "error")
    }
    }
  }
  return (
    <div className='system-createPost'>
      <h1 className='system-createPost__heading'>Đăng tin mới</h1>
      
      <p className='potUp'>Nếu bạn đã từng đăng tin trên Phongtro123.com, 
       hãy sử dụng chức năng ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG để làm mới, 
        đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt.</p>
      <div className="system-createPost__box row">
       <div className='system-createPost__box--inner row'>
          <div className="system-createPost__address"><Address setInvalidFields={setInvalidFields} invalidFields={invalidFields} payload={payload} setPayload={setPayload}/></div>
          <div className="system-create__overview"><Overview setInvalidFields={setInvalidFields} invalidFields={invalidFields} payload={payload} setPayload={setPayload}/></div>
       </div>
        <div className='system-createPost__box--map'><MapCreatePost/></div>
      </div>
      <Button text={'Túc tiệp'} onClick={handleSubmit} btnClass={'system-createPost__btn'}/>
    </div>
  )
}

export default memo(CreatePost)