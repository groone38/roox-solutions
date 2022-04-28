import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../types/Users";
import classes from "./UserForm.module.scss";
import axios from "axios";
import { Loader } from "./../../loader/Loader";
import BaseButton from "./../../UI/BaseButton/BaseButton";
import BaseInput from "../../UI/BaseInput/BaseInput";

export const UserForm = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
    comment: "",
  });
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const params = Number(useParams().id);

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    setLoader(true);
    try {
      const responce = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users/"
      );
      let user = responce.data.filter((item) => {
        if (item.id === params) return item;
      });

      setUser(user[0]);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
  const propsValue = (user: User) => {
    setUser(user);
  };
  const errorHandler = (error: boolean) => {
    setError(error);
  };

  const editUser: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!error) {
      const json = JSON.stringify(user);
      console.log(json);
    } else {
      console.log("Вы не заплонили поля");
    }
  };
  return (
    <div>
      {loader && <Loader />}
      <div className={classes.header}>
        <h3>Профиль пользоваетля</h3>
        <BaseButton
          text="Редактироввать"
          onClick={() => setDisabled(!disabled)}
        />
      </div>
      <form onSubmit={editUser}>
        <div className={classes.form}>
          <BaseInput
            type="text"
            labelValue={"Name"}
            label={"name"}
            input="name"
            inputValue={user?.name}
            onChange={propsValue}
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <BaseInput
            type="text"
            labelValue={"User name"}
            label={"username"}
            input="username"
            inputValue={user?.username}
            onChange={propsValue}
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <BaseInput
            type="text"
            labelValue={"E-mail"}
            label={"email"}
            input="email"
            inputValue={user?.email}
            onChange={propsValue}
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <BaseInput
            type="text"
            labelValue={"Street"}
            label={"street"}
            input="street"
            inputValue={user?.address.street}
            onChange={propsValue}
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <BaseInput
            type="text"
            labelValue={"City"}
            label={"city"}
            input="city"
            inputValue={user?.address.city}
            onChange={propsValue}
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <BaseInput
            type="text"
            labelValue={"Zip code"}
            label={"zipcode"}
            input="zipcode"
            inputValue={user?.address.zipcode}
            onChange={propsValue}
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <BaseInput
            type="text"
            labelValue={"Phone"}
            label={"phone"}
            input="phone"
            inputValue={user?.phone}
            onChange={propsValue}
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <BaseInput
            type="text"
            labelValue={"Website"}
            label={"website"}
            input="website"
            inputValue={user?.website}
            onChange={propsValue}
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <label htmlFor="coment">Comment</label>
          <textarea
            name="coment"
            id="coment"
            onChange={(e) =>
              setUser({
                ...user,
                [e.currentTarget.name]: e.currentTarget.value,
              })
            }
            disabled={disabled && true}
          ></textarea>
        </div>
        <BaseButton
          text="Отправить"
          send={disabled ? "#AFAFAF" : "#52CF4F"}
          submit="submit"
        />
      </form>
    </div>
  );
};
