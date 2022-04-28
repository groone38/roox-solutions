import React, { FC } from 'react'
import { User } from '../../../types/Users'

interface BaseInputProps {
    labelValue: string
    label: string
    input: string
    inputValue: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled: boolean
}

const BaseInput: FC<BaseInputProps> = ({labelValue, label, input, inputValue, onChange, disabled}) => {
  return (
    <>
        <label htmlFor={label}>{labelValue}</label>
        <input type="text" id={input} name={input} onChange={onChange} value={inputValue} disabled={disabled}/>
    </>
  )
}

export default BaseInput