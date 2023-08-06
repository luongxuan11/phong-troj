import React, { memo } from 'react'

const Input = ({type, id, label, row, cols, readOnly, className, value, unit, setValue, small}) => {

  const handleOnChange = (e) =>{
    setValue(prev => ({...prev, [id]: e.target.value}))
  }

  return (
    <>
        <div className="overview-type__input--box row">
          <label htmlFor={id}>{label}</label>
          <div className={`${className && className.includes("flag") ? "setting1" : undefined} setting`}>
             {id === "description" ? <textarea onChange={(e) => handleOnChange(e)} value={value} id={id} cols={cols} rows={row}></textarea> : <input value={value} onChange={(e) => handleOnChange(e)} className={className} readOnly={readOnly} type={type} id={id}/>}
             {className?.includes("flag") && <span>{unit}</span>}
             {className?.includes('price') && <small>{small}</small>}
          </div>
        </div>
    </>
  )
}

export default memo(Input)