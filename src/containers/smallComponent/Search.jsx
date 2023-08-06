import React, {memo, useCallback, useEffect, useState} from 'react'
import './smallComponent.scss'
import { useSelector } from 'react-redux'
import {useNavigate, createSearchParams, useLocation} from 'react-router-dom'
import {SearchItem} from '../../components'
import icons from '../../utilities/icons'
import { Button } from '../../components'
import {Model} from './index'
import { path } from '../../utilities/constant'

const {GrFormNext, FiDelete, AiOutlineFileSearch, FiSearch, CiLocationOn, TbReportMoney, RiCrop2Line} = icons
// đang nằm trong home page
const Search = () => {

  const navigate = useNavigate()

  const [isShowModel, setIsShowModel] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [queries, setQueries] = useState({})
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')
  const location = useLocation()

  useEffect(() =>{
    if(!location.pathname.includes(path.SEARCH)){
      setArrMinMax({})
      setQueries({})
    }
  }, [location])
  
  const {provinces, acreages, prices, categories} = useSelector(state => state.app)
  // console.log(getCodesAcreage([35,85], acreages))
  // console.log(prices)
  // console.log("check price >> ",getCodePrices(prices))
  // console.log("check acreage >> ",getCodeAcreage(acreages))

  // handle isShowModel
  let handleIsShowModel = (content, name, text, defaultText) =>{
    setText(text)
    setName(name)
    setContent(content)
    setDefaultText(defaultText)
    setIsShowModel(true)
  }
  // submit
  const handleSubmit = useCallback((e, query, arrMinMax) =>{
    e.stopPropagation();
    setQueries(prev => ({...prev, ...query}))
    setIsShowModel(false)
    arrMinMax && setArrMinMax(prev => ({...prev, ...arrMinMax}))
    console.log(isShowModel, queries)
  }, [isShowModel, queries])

  // handle search
  const handleSearch = () => {
    const filteredQueries = Object.entries(queries).filter((item) => item[0].includes('Number') || item[0].includes('Code')).filter((item) => item[1])
    let resultFilteredQueries = {}
    filteredQueries.forEach((item) => resultFilteredQueries[item[0]] = item[1])

    const filteredQueriesText = Object.entries(queries).filter((item) => (!item[0].includes('Number') && !item[0].includes('Code')))
    // console.log("chek text>>>>>>", filteredQueriesText)
    const titleSearchHeading = filteredQueriesText.map((item) => item[1]).join(' > ');
    // console.log(titleSearchHeading || defaultText)
    console.log(filteredQueriesText)
    navigate({ // chuyển trang và tạo url tương ứng
      pathname: `/${path.SEARCH}`,
      search: createSearchParams(resultFilteredQueries).toString(),
    }, {state: {titleSearchHeading}})
  }
    
  return (
    <div className='home-search container'>
        <div className="home-search__list row">
            <SearchItem onClick={() => handleIsShowModel(categories, 'categories', 'CHỌN LOẠI BẤT ĐỘNG SẢN', 'Tìm tất cả')} text={queries.categories} defaultText={'Tìm tất cả'} firstIcon={<AiOutlineFileSearch/>} lastIcon={<FiDelete style={{ marginLeft: 'auto'}} />}/>
            <SearchItem onClick={() => handleIsShowModel(provinces, 'provinces', 'CHỌN TỈNH THÀNH', 'Toàn quốc')} text={queries.provinces} defaultText={'Toàn quốc'} firstIcon={<CiLocationOn />} lastIcon={<GrFormNext style={{ marginLeft: 'auto'}}/>}/>
            <SearchItem onClick={() => handleIsShowModel(prices, 'prices', 'CHỌN GIÁ', 'Chọn giá')} text={queries.prices} defaultText={'Chọn giá'} firstIcon={<TbReportMoney />} lastIcon={<GrFormNext style={{ marginLeft: 'auto'}}/>}/>
            <SearchItem onClick={() => handleIsShowModel(acreages, 'acreages', 'CHỌN DIỆN TÍCH', 'Chọn diện tích')} text={queries.acreages} defaultText={'Chọn diện tích'} firstIcon={<RiCrop2Line />} lastIcon={<GrFormNext style={{ marginLeft: 'auto'}}/>}/>
            <Button btnClass={'home-search__action'} onClick={handleSearch} text={'Tìm kiếm'} iconSearch={<FiSearch/>}/>
        </div>
        {isShowModel && <Model handleSubmit={handleSubmit} defaultText={defaultText} queries={queries} arrMinMax={arrMinMax} content={content} setIsShowModel={setIsShowModel} name={name} text={text}/>}
    </div>
  )
}

export default memo(Search)