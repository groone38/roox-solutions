import React, { FC } from 'react'
import classes from './BaseButton.module.scss'

interface BaseButtonProps {
    text: string
    onClick?: () => void
    send?: string
    submit?: "submit" | "button" | "reset" | undefined
}

const BaseButton: FC<BaseButtonProps> = ({text, onClick, send, submit="button"}) => {
  return (
    <button 
        className={classes.btn}
        onClick={onClick} 
        style={{background: send && send}}
        type={submit}
    >
        {text}
    </button>
  )
}

export default BaseButton