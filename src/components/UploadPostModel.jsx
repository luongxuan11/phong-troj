import {React, memo, useState} from 'react'
import {Address, Overview, Button} from '../components'
import { getCodes, getCodesAcreage } from '../utilities/common/getCodePrices'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { apiCreatePost, apiUpdatePost } from '../services'
import { validate } from '../containers/public/validate'
import icons from '../utilities/icons'
import { resestDataEdit } from '../store/actions'
const {AiOutlineCloseCircle} = icons

const UploadPostModel = ({isEdit, setIsEdit}) => {
  const {dataEdit} = useSelector(state => state.post)
  const dispatch = useDispatch()
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoriesCode,
      description: dataEdit?.description ? JSON.parse(dataEdit?.description) : "",
      title: dataEdit?.title || "",
      priceNumber: (dataEdit?.pricesNumber * Math.pow(10,6)) || 0,
      acreageNumber: dataEdit?.acreagesNumber || 0,
      images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.pricesCode || "",
      acreageCode: dataEdit?.acreagesCode || "",
      target: dataEdit?.overviews?.target || "",
      province: dataEdit?.province || ""
    }
    return initData
  })
  const {prices, acreages, categories} = useSelector(state => state.app)
  const {currentData} = useSelector(state => state.user)
  const [invalidFields, setInvalidFields] = useState([])
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
      category,
      imageId: dataEdit?.imageId,
      attributeId: dataEdit?.attributeId,
      overviewId: dataEdit?.overviewId,
      postId: dataEdit?.id
    }
    // console.log(finalPayload)
    const result = validate(finalPayload, setInvalidFields)
    console.log(result)
    if(result === 0){
      console.log(finalPayload)
      const response = await apiUpdatePost(finalPayload)
    if(response?.data.err === 0){
      Swal.fire("Thành công","Chỉnh sửa thành công", "success").then(() =>{
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
      dispatch(resestDataEdit())
      setIsEdit(false)
    }else{
      Swal.fire("Oops !","Có lỗi rùi...", "error")
    }
    }
  }

  return (
    <div className='system-createPost'>
      <div className='row'>
          <h1 className='system-createPost__heading update-post__heading'>Chỉnh sửa tin đăng</h1>
          <AiOutlineCloseCircle onClick={() => setIsEdit(false)} className='close-icon'/>
      </div>
      
      <p className='potUp'>Nếu bạn đã từng đăng tin trên Phongtro123.com, 
       hãy sử dụng chức năng ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG để làm mới, 
        đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt.</p>
      <div className="system-createPost__box row">
       <div className='system-createPost__box--inner row'>
          <div className="system-createPost__address">
            <Address setInvalidFields={setInvalidFields} invalidFields={invalidFields} payload={payload} setPayload={setPayload}/>
          </div>
          
          <div className="system-create__overview">
            <Overview setInvalidFields={setInvalidFields} invalidFields={invalidFields} payload={payload} setPayload={setPayload}/>
          </div>
       </div>
      </div>
      <Button text={'Chỉnh sửa'} onClick={handleSubmit} btnClass={'system-createPost__btn'}/>
    </div>
  )
}

export default memo(UploadPostModel)