import React, { FC } from "react";
import { User } from "../../types/Users";
import UserCard from "./userCard/UserCard";
import classes from "./UsersList.module.scss";
import { Loader } from "./../loader/Loader";

interface UsersListProps {
  users: User[];
  loader: boolean;
}

const UsersList: FC<UsersListProps> = ({ users, loader }) => {
  return (
    <>
      <h2>Список пользователей</h2>
      {loader && <Loader />}
      <div className={classes.users}>
        <div className={classes.users_card}>
          {users.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
        </div>
      </div>
    </>
  );
};

export default UsersList;
