import React, {memo} from 'react'

const Button = ({text, btnClass, Icon, onClick}) => {
    // console.log('check reRendle button.jsx in component row 04...')
  return (
    <button className={`btn row__inline ${btnClass}`}  onClick={onClick}> {text} {Icon && <Icon style={{ fontSize: '16px' }}/>}</button>
  )
}

export default memo(Button)