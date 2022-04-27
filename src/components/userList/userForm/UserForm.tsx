import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../types/Users";
import classes from "./UserForm.module.scss";
import axios from "axios";
import { Loader } from './../../loader/Loader';
import BaseButton from './../../UI/BaseButton/BaseButton';

export const UserForm = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
        name: '',
        catchPhrase: '',
        bs: ''
    },
    comment: ''
  });
  const [loader, setLoader] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const params = useParams().id;
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    setLoader(true)
    try {
      const responce = await axios.get<User>("https://jsonplaceholder.typicode.com/users/" + params);
      setUser(responce.data)
    } catch (error) {
        console.log(error);
    }
    setLoader(false)
  };
  const valueHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  const editUser: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(user);
  }
  return (
    <div>
        {loader && <Loader/>}
      <div className={classes.header}>
        <h3>Профиль пользоваетля</h3>
        <BaseButton text="Редактироввать" onClick={() => setDisabled(!disabled)}/>
      </div>
      <form onSubmit={editUser}>
        <div className={classes.form}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={valueHandler} value={user?.name} disabled={disabled && true}/>
          <label htmlFor="user">User name</label>
          <input type="text" id="user" name="user" onChange={valueHandler} value={user?.username} disabled={disabled && true}/>
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" name="email" onChange={valueHandler} value={user?.email} disabled={disabled && true}/>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" onChange={valueHandler} value={user?.address.street} disabled={disabled && true}/>
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" onChange={valueHandler} value={user?.address.city} disabled={disabled && true}/>
          <label htmlFor="zip">Zip code</label>
          <input type="text" id="zip" name="zip" onChange={valueHandler} value={user?.address.zipcode} disabled={disabled && true}/>
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" onChange={valueHandler} value={user?.phone} disabled={disabled && true}/>
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" onChange={valueHandler} value={user?.website} disabled={disabled && true}/>
          <label htmlFor="coment">Comment</label>
          <textarea name="coment" id="coment" onChange={valueHandler} disabled={disabled && true}></textarea>
        </div>
        <BaseButton text="Отправить" send={disabled ? "#AFAFAF" : '#52CF4F'} submit="submit"/>
      </form>
    </div>
  );
};
