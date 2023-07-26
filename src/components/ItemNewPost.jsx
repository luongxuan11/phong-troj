import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'

const ItemNewPost = ({image, title, price, createdAt}) => {

  const formatVi = (createdAt) =>{
    moment.locale('vi')
    return moment(createdAt).fromNow()
  }

  return (
    <div className='relatedPost-item row'>
        <div className="relatedPost-image">
            <img className="relatedPost-image__img" src={image[0]} alt='anh'/>
        </div>
        <div className="relatedPost-box">
            <h5 className="relatedPost-box__title ellipsis">{title} </h5>
            <div className="relatedPost-box__inner row">
                <p className="relatedPost-box__inner__price "><strong>{price}</strong></p>
                <span className="relatedPost-box__inner__createdAt ellipsis">{formatVi(createdAt)}</span>
            </div>
        </div>
    </div>
  )
}

export default ItemNewPost