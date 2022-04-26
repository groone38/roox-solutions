import React, { FC } from 'react'
import { User } from '../../types/Users'
import UserCard from './userCard/UserCard'
import classes from './UsersList.module.scss'

interface UsersListProps {
    users: User[]
}

const UsersList: FC<UsersListProps> = ({users}) => {
  return (
    <div className={classes.users}>
        <h2>Список пользователей</h2>
        <div className={classes.users_card}>
            {users.map(user => {
                return <UserCard user={user}/>
            })}
        </div>
    </div>
  )
}

export default UsersList