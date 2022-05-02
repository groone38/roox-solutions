import React, { FC } from 'react'
import { User } from '../../../types/Users'
import classes from './BaseInput.module.scss'
import { useState } from 'react';
interface BaseInputProps {
    labelValue: string
    label: string
    input: string
    inputValue: string
    onChange: (e: string) => void
    error: boolean
    disabled: boolean
    type: string
}

const BaseInput: FC<BaseInputProps> = ({labelValue, label, input, inputValue, disabled, onChange, error, type}) => {
  
  const valueHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.currentTarget.value)
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