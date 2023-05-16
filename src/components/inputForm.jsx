import React from 'react'

const InputForm = ({htmlFor,label, type, id}) => {
  return (
    <>
        <label htmlFor={htmlFor}>{label}</label>
        <input type={type} id={id}/>
    </>
  )
}

export default InputForm