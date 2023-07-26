import React, {memo} from 'react'

const Button = ({text, btnClass, Icon, onClick, iconSearch, onKeydown}) => {
    // console.log('check reRendle button.jsx in component row 04...')
  return (
     
    <button className={`btn row__inline ${btnClass}`} onKeyDown={onKeydown} onClick={onClick}>{iconSearch} {text} {Icon && <Icon style={{ fontSize: '16px' }}/>}</button>
  )
}

export default memo(Button)