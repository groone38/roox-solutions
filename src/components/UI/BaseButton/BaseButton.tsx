import React, { FC } from 'react'
import classes from './BaseButton.module.scss'

interface BaseButtonProps {
    text: string
    onClick?: () => void
    send?: string
    submit?: "submit" | "button" | "reset" 
    sortData?: (field:string) => void
    search?: string
}

const BaseButton: FC<BaseButtonProps> = ({text, onClick, send, submit="button", sortData, search='id'}) => {
  return (
    <button 
        className={classes.btn}
        onClick={onClick ? onClick : () => sortData(search)}
        style={{background: send && send}}
        type={submit}
    >
        {text}
    </button>
  )
}

export default BaseButton