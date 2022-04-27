import React, { FC } from 'react'
import classes from './BaseButton.module.scss'

interface BaseButtonProps {
    text: string
    onClick?: () => void
    send?: string
}

const BaseButton: FC<BaseButtonProps> = ({text, onClick, send}) => {
  return (
    <button className={classes.btn} onClick={onClick} style={{background: send && send}}>
        {text}
    </button>
  )
}

export default BaseButton