import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import classes from "./App.module.scss";
import Filter from './components/filter/Filter';
import UsersList from "./components/userList/UsersList";
import axios from "axios"
import { User } from "./types/Users";

const App = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const responce = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      setUsers(responce.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BrowserRouter>
      <Filter/>
      <div className={classes.wrapp}>
        <UsersList users={users}/>
      </div>
      <Routes>
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
