import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../types/Users";
import classes from "./UserForm.module.scss";
import axios from "axios";
import { Loader } from "./../../loader/Loader";
import BaseButton from "./../../UI/BaseButton/BaseButton";
import BaseInput from "../../UI/BaseInput/BaseInput";

interface UserFormProps {
  users: User[];
}

export const UserForm: FC<UserFormProps> = ({ users }) => {
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
  // const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false)
  const params = Number(useParams().id);
  // console.log(users);
  // console.log(params);

  useEffect(() => {
    fetchUser()
  }, []);
  // console.log(user);
  const fetchUser = async () => {
    setLoader(true)
    try {
      const responce = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users/");
      let us = responce.data.filter((item) => {
        if(item.id === params)
          return item
      });
      
      setUser(us[0])
    } catch (error) {
        console.log(error);
    }
    setLoader(false)
  };
  const propsValue = (user: User) => {
    setUser(user)
  }
  const errorHandler = (error: boolean) => {
    setError(error)
  }
  // let data = user.filter(item => item.id === params)
  // const valueHandler: React.ChangeEventHandler<
  //   HTMLInputElement | HTMLTextAreaElement
  // > = (e) => { 
  //   let newValue = {...user}
  //   if(e.target.name === 'street') {
  //     newValue.address.street = e.currentTarget.value
  //   } else if(e.target.name === 'city') {
  //     newValue.address.city = e.currentTarget.value
  //   } else if(e.target.name === 'zipcode') {
  //     newValue.address.zipcode = e.currentTarget.value
  //   } else {
  //     newValue = {...newValue, [e.currentTarget.name]: e.currentTarget.value}
  //   }
    
    // console.log(newValue);
    // setUser(newValue)
    // if(user?.address.street === e.target.name) {
    //   setUser({
    //     ...user,
    //     user: ...user.address, user.address.street = 'kek'
    //   })
    
    // }
    // console.log({[e.currentTarget.name]: e.currentTarget.value});
    // let kek = e.currentTarget.name
    // let newValue = {...user}
    // for(let key in user){
    //   console.log(user[key]);
    // }
    // let newValue = {[e.currentTarget.name]: e.currentTarget.value}
    // // setUser((prev)=>{…prev,newValue})
    // setUser({
    //   ...user,
    //   [e.currentTarget.name]: e.currentTarget.value
    // })
  // };
  const editUser: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if(!error) {
      console.log(user);
    }
    // for(let myProp in user) {
    //   let key = myProp as keyof typeof user; // Define a key of an Object
    //   let value = user[key];
    //   console.log(value);
    // }
    
  };
  // console.log(user);
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
            labelValue={'Name'} 
            label={"name"} 
            input="name" 
            inputValue={user?.name} 
            onChange={propsValue} 
            errorHandler={errorHandler}
            disabled={disabled && true}
            user={user}
          />
          <BaseInput
           labelValue={'User name'} 
           label={"username"} 
           input="username" 
           inputValue={user?.username} 
           onChange={propsValue} 
           errorHandler={errorHandler}
           disabled={disabled && true}
           user={user}
          />
          <BaseInput
           labelValue={'E-mail'} 
           label={"email"} 
           input="email" 
           inputValue={user?.email} 
           onChange={propsValue} 
           errorHandler={errorHandler}
           disabled={disabled && true}
           user={user}
          />
          <BaseInput
           labelValue={'Street'} 
           label={"street"} 
           input="street" 
           inputValue={user?.address.street} 
           onChange={propsValue} 
           errorHandler={errorHandler}
           disabled={disabled && true}
           user={user}
          />
          <BaseInput
           labelValue={'City'} 
           label={"city"} 
           input="city" 
           inputValue={user?.address.city} 
           onChange={propsValue} 
           errorHandler={errorHandler}
           disabled={disabled && true}
           user={user}
          />
          <BaseInput
           labelValue={'Zip code'} 
           label={"zipcode"} 
           input="zipcode" 
           inputValue={user?.address.zipcode} 
           onChange={propsValue} 
           errorHandler={errorHandler}
           disabled={disabled && true}
           user={user}
          />
          <BaseInput
           labelValue={'Phone'} 
           label={"phone"} 
           input="phone" 
           inputValue={user?.phone} 
           onChange={propsValue} 
           errorHandler={errorHandler}
           disabled={disabled && true}
           user={user}
          />
          <BaseInput
           labelValue={'Website'} 
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
            onChange={(e) => setUser({...user, [e.currentTarget.name]: e.currentTarget.value})}
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
