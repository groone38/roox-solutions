import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../../../types/Users'
import classes from './UserCard.module.scss'

interface UserCardProps {
    user: User
}

const UserCard: FC<UserCardProps> = ({user}) => {
  return (
    <div className={classes.user}>
        <div className={classes.user_info}>
            <div className={classes.info}>
                <p style={{color: '#A3A3A3'}}>ФИО: </p>
                <p>{user.name}</p>
            </div>
            <div className={classes.info}>
                <p style={{color: '#A3A3A3'}}>город: </p>
                <p>{user.address.city}</p>
            </div>
            <div className={classes.info}>
                <p style={{color: '#A3A3A3'}}>компания: </p>
                <p>{user.company.name}</p>
            </div>
        </div>
        <div className={classes.user_btn}>
            <NavLink to={'/user/' + user.id}>Подробнее</NavLink>
        </div>
    </div>
  )
}

export default UserCard