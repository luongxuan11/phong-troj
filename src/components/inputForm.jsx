import React, { memo } from 'react'

const InputForm = ({htmlFor,label, type, id, value, setValue}) => {
  return (
    <>
        <label htmlFor={htmlFor}>{label}</label>
        <input id={id} type={type} value={value} onChange={(e) =>  setValue(prev => ({...prev ,[type]: e.target.value}))}/>  {/*giải prev vì prev là 1 setState với dạng obj  */}
                                                                                                                  {/* type nào thay đổi thì chỉ thằng input đó thay đổi  =>> type = phone thì sẽ gán value = thằng type đó*/}

    </>
  )
}

export default memo(InputForm)