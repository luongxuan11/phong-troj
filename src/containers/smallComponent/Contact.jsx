import React, { memo } from 'react'
import { text } from '../../utilities/DataContact'
import {Button} from '../../components'

const Contact = () => {
  return (
    <div className='contact container'>
      <div className="contact-image">
        <img src={text?.imageContact} alt="batdongsan" className="contact-image__img" />
      </div>
      <p className='contact__content'>{text?.contentContact}</p>
      <div className="contact-list row">
      {text?.contacts.map((item, index) =>{
            return (
              <ul className='contact-list__item' key={index}>
                <li>{item.support}</li>
                <li>{item.phone}</li>
                <li>{item.zalo}</li>
              </ul>
            )
          })}
      </div>
      <Button btnClass={'contact-Btn'} text={'Gửi liên hệ'}/>
    </div>
  )
}

export default memo(Contact)