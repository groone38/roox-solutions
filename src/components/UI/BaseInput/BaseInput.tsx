import React, { FC } from 'react'
import { User } from '../../../types/Users'
import classes from './BaseInput.module.scss'
import { useState } from 'react';
interface BaseInputProps {
    labelValue: string
    label: string
    input: string
    inputValue: string
    // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChange: (e: User) => void
    errorHandler: (e: boolean) => void
    disabled: boolean
    user: User
}

const BaseInput: FC<BaseInputProps> = ({labelValue, label, input, inputValue, disabled, user, onChange, errorHandler}) => {
  const [error, setError] = useState(false)
  const valueHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
  if(e.currentTarget.value === '') {
    setError(true)
    errorHandler(true)
  } else {
    setError(false)
    errorHandler(false)
  }
  let newUser = {...user}
  if(e.target.name === 'street') {
    newUser.address.street = e.currentTarget.value
  } else if(e.target.name === 'city') {
    newUser.address.city = e.currentTarget.value
  } else if(e.target.name === 'zipcode') {
    newUser.address.zipcode = e.currentTarget.value
  } else {
    newUser = {...newUser, [e.currentTarget.name]: e.currentTarget.value}
  }
  onChange(newUser)
};
  return (
    <>
        <label htmlFor={label}>{labelValue}</label>
        <input className={classes.input + ' ' + (error && classes.error)} type="text" id={input} name={input} onChange={valueHandler} value={inputValue} disabled={disabled}/>
    </>
  )
}

export default BaseInput