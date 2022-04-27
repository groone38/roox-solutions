import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../types/Users";
import classes from "./UserForm.module.scss";
import axios from "axios";
import { Loader } from './../../loader/Loader';
import BaseButton from './../../UI/BaseButton/BaseButton';

export const UserForm = () => {
  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const params = useParams().id;
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    setLoader(true)
    try {
      const responce = await axios.get("https://jsonplaceholder.typicode.com/users/" + params);
      setUser(responce.data)
    } catch (error) {
        console.log(error);
    }
    setLoader(false)
  };
  return (
    <div>
        {loader && <Loader/>}
      <div className={classes.header}>
        <h3>Профиль пользоваетля</h3>
        <BaseButton text="Профиль пользоваетля" onClick={() => setDisabled(false)}/>
      </div>
      <form>
        <div className={classes.form}>
          <label htmlFor="">Name</label>
          <input type="text" placeholder={user?.name} disabled={disabled && true}/>
          <label htmlFor="">User name</label>
          <input type="text" placeholder={user?.username}/>
          <label htmlFor="">E-mail</label>
          <input type="text" placeholder={user?.email}/>
          <label htmlFor="">Street</label>
          <input type="text" placeholder={user?.address.street}/>
          <label htmlFor="">City</label>
          <input type="text" placeholder={user?.address.city}/>
          <label htmlFor="">Zip code</label>
          <input type="text" placeholder={user?.address.zipcode}/>
          <label htmlFor="">Phone</label>
          <input type="text" placeholder={user?.phone}/>
          <label htmlFor="">Website</label>
          <input type="text" placeholder={user?.website}/>
          <label htmlFor="">Comment</label>
          <textarea name=""></textarea>
        </div>
        <BaseButton text="Отправить" send={disabled ? "#AFAFAF" : '#52CF4F'} />
      </form>
    </div>
  );
};
