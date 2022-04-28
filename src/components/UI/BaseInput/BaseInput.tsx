import React, { FC } from 'react'
import { User } from '../../../types/Users'
import classes from './BaseInput.module.scss'
import { useState } from 'react';
interface BaseInputProps {
    labelValue: string
    label: string
    input: string
    inputValue: string
    onChange: (e: User) => void
    errorHandler: (e: boolean) => void
    disabled: boolean
    user: User
    type: string
}

const BaseInput: FC<BaseInputProps> = ({labelValue, label, input, inputValue, disabled, user, onChange, errorHandler, type}) => {
  const [error, setError] = useState(false)
  
  const valueHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {

  if(e.currentTarget.value === '') {
    setError(true)
    errorHandler(true)
  } else {
    setError(false)
    errorHandler(false)
  }

  const regEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if(e.target.name === 'email') {
    if(!regEmail.test(String(e.currentTarget.value).toLocaleLowerCase())) {
      setError(true)
      errorHandler(true)
    } else {
      setError(false)
      errorHandler(false)
    }
  }

  if(e.target.name === 'phone' || e.target.name === 'zipcode') {
    if(e.currentTarget.value.length < 5) {
      setError(true)
      errorHandler(true)
    } else {
      setError(false)
      errorHandler(false)
    }
  } 

  if(e.target.name === 'name' || e.target.name === 'username' || e.target.name === 'street' || e.target.name === 'city') {
    if(e.currentTarget.value.length < 2) {
      setError(true)
      errorHandler(true)
    } else {
      setError(false)
      errorHandler(false)
    }
  }

  let regWebsite = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  if(e.target.name === 'website') {
    if(!regWebsite.test(String(e.currentTarget.value).toLocaleLowerCase())) {
      setError(true)
      errorHandler(true)
    } else {
      setError(false)
      errorHandler(false)
    }
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
        {error && <p style={{color: 'red'}}>Некорректно заполненно поле</p>}
        <input
         className={classes.input + ' ' + (error && classes.error)} 
         type={type} 
         id={input} 
         name={input} 
         onChange={valueHandler} 
         value={inputValue} 
         disabled={disabled}
        />
    </>
  )
}

export default BaseInput