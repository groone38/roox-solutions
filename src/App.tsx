import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import classes from "./App.module.scss";
import Filter from './components/filter/Filter';
import UsersList from "./components/userList/UsersList";
import axios from "axios"
import { User } from "./types/Users";
import { Loader } from './components/loader/Loader.js';
import { UserForm } from './components/userList/userForm/UserForm';

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoader(true)
    try {
      const responce = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      setUsers(responce.data)
    } catch (error) {
      console.log(error);
    }
    setLoader(false)
  }

  return (
    <BrowserRouter>
      <Filter/>
      <div className={classes.wrapp}>
      <Routes>
        <Route path="/" element={<UsersList users={users} loader={loader}/>} />
        <Route path="/:id" element={<UserForm/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
