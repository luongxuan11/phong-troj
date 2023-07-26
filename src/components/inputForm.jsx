import React, { memo } from 'react'

const InputForm = ({htmlFor,label, type, id, value, setValue, invalidFields, setInvalidFields}) => { // trong cái invalidFields nhận được cái arr
  return (
    <>
        <label htmlFor={htmlFor}>{label}</label>
        <input id={id} type={type} value={value} onFocus={() => setInvalidFields([])} onChange={(e) =>  setValue(prev => ({...prev ,[type]: e.target.value}))}/>  {/*giải prev vì prev là 1 setState với dạng obj  */}
                                                                                                                  {/* type nào thay đổi thì chỉ thằng input đó thay đổi  =>> type = phone thì sẽ gán value = thằng type đó*/}
                                                          

        {invalidFields.length > 0 && invalidFields.some(i => i.name === type) && <small className='home-login__error'>{invalidFields.find(i => i.name === type)?.mess}</small>}

        {/*nếu arr > 0 tức là arr đang có lỗi thì trả về true::  =>> còninvalid.some là: hàm some sẽ tìm nếu có ít nhất 1 pt thỏa mãn sẽ trả về true */}
        {/* ở hàm some thì sẽ tìm i.name === type tức cái ô này render cho pass thì sẽ tìm đến name có trùng với type pass k nếu đúng trả về true*/}
        {/*hàm find sẽ tìm phần tử thỏa mãn điều kiện nhưng chỉ lần pt đầu tiên */}

        {/*đi số nhiều với some là every tức là tất cả phần tử phải thỏa mãn mới là true còn chỉ cần 1 cái k thỏa mãn thì cả arr đó là false*/}
        {/*số nhiều của find là filter */}


    </>
  )
}

export default memo(InputForm)