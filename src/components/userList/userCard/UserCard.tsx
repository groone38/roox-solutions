import React, { FC } from 'react'
import { User } from '../../../types/Users'
import classes from './UserCard.module.scss'

interface UserCardProps {
    user: User
}

const UserCard: FC<UserCardProps> = ({user}) => {
    console.log(user);
  return (
    <div className={classes.user}>
        <div className={classes.user_info}>
            <div className={classes.info}>
                <p style={{color: '#A3A3A3'}}>Имя: </p>
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
            <p>Подробнее</p>
        </div>
    </div>
  )
}

export default UserCard