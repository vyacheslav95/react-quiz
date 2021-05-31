import React from 'react'
import classes from './Input.module.css'

const Input = ({
                 type,
                 label,
                 value,
                 errorMessage,
                 valid,
                 touched,
                 shouldValidate,
                 onChange,
               }) => {

  function isInvalid(valid, touched, shouldValidate) {
    return !valid && shouldValidate && touched
  }

  const inputType = type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`

  return (
    <div className={`${classes.Input} ${isInvalid(valid, touched, shouldValidate) && classes.invalid}`}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />

      {
        isInvalid(valid, touched, shouldValidate) && <span>{errorMessage || 'Введите верное значение'}</span>
      }

    </div>
  )
}

export default Input