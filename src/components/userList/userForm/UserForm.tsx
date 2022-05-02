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
  const [sedError, setSendError] = useState(false);
  const [error, setError] = useState({
    name: false,
    username: false,
    email: false,
    address: {
      street: false,
      city: false,
      zipcode: false,
    },
    phone: false,
    website: false,
    company: {
      name: false,
    },
  });
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

  const propsValueName = (name: string) => {
    if (name.length < 2) {
      setError({ ...error, name: true });
      setSendError(true);
    } else {
      setError({ ...error, name: false });
      setSendError(false);
    }
    setUser({ ...user, name });
  };

  const propsValueUserName = (username: string) => {
    if (username.length < 2) {
      setError({ ...error, username: true });
      setSendError(true);
    } else {
      setError({ ...error, username: false });
      setSendError(false);
    }
    setUser({ ...user, username });
  };
  const propsValueEmail = (email: string) => {
    const regEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regEmail.test(String(email).toLocaleLowerCase())) {
      setError({ ...error, email: true });
      setSendError(true);
    } else {
      setError({ ...error, email: false });
      setSendError(false);
    }
    setUser({ ...user, email });
  };
  const propsValueStreet = (street: string) => {
    if (street.length < 2) {
      setError({ ...error, address: {...error.address, street: true} });
      setSendError(true);
    } else {
      setError({ ...error, address: {...error.address, street: false} });
      setSendError(false);
    }
    setUser({ ...user, address: {...user.address, street} });
  }
  const propsValueCity = (city: string) => {
    if (city.length < 2) {
      setError({ ...error, address: {...error.address, city: true} });
      setSendError(true);
    } else {
      setError({ ...error, address: {...error.address, city: false} });
      setSendError(false);
    }
    setUser({ ...user, address: {...user.address, city} });
  }
  const propsValueZipcode = (zipcode: string) => {
    if(zipcode.length < 5) {
      setError({ ...error, address: {...error.address, zipcode: true} });
      setSendError(true);
    } else {
      setError({ ...error, address: {...error.address, zipcode: false} });
      setSendError(false);
    }
    setUser({ ...user, address: {...user.address, zipcode} });
  }
  const propsValuePhone = (phone: string) => {
    if(phone.length < 5) {
      setError({ ...error, phone: true});
      setSendError(true);
    } else {
      setError({ ...error, phone: false});
      setSendError(false);
    }
    setUser({ ...user, phone});
  }
  const propsValueWebsite = (website: string) => {
    let regWebsite = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    if (!regWebsite.test(String(website).toLocaleLowerCase())) {
      setError({ ...error, website: true });
      setSendError(true);
    } else {
      setError({ ...error, website: false });
      setSendError(false);
    }
    setUser({ ...user, website });
  }

  const editUser: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!sedError) {
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
            onChange={propsValueName}
            error={error.name}
            disabled={disabled && true}
          />
          <BaseInput
            type="text"
            labelValue={"User name"}
            label={"username"}
            input="username"
            inputValue={user?.username}
            onChange={propsValueUserName}
            error={error.username}
            disabled={disabled && true}
          />
          <BaseInput
            type="text"
            labelValue={"E-mail"}
            label={"email"}
            input="email"
            inputValue={user?.email}
            onChange={propsValueEmail}
            error={error.email}
            disabled={disabled && true}
          />
          <BaseInput
            type="text"
            labelValue={"Street"}
            label={"street"}
            input="street"
            inputValue={user?.address.street}
            onChange={propsValueStreet}
            error={error.address.street}
            disabled={disabled && true}
          />
          <BaseInput
            type="text"
            labelValue={"City"}
            label={"city"}
            input="city"
            inputValue={user?.address.city}
            onChange={propsValueCity}
            error={error.address.city}
            disabled={disabled && true}
          />
          <BaseInput
            type="text"
            labelValue={"Zip code"}
            label={"zipcode"}
            input="zipcode"
            inputValue={user?.address.zipcode}
            onChange={propsValueZipcode}
            error={error.address.zipcode}
            disabled={disabled && true}
          />
          <BaseInput
            type="text"
            labelValue={"Phone"}
            label={"phone"}
            input="phone"
            inputValue={user?.phone}
            onChange={propsValuePhone}
            error={error.phone}
            disabled={disabled && true}
          />
          <BaseInput
            type="text"
            labelValue={"Website"}
            label={"website"}
            input="website"
            inputValue={user?.website}
            onChange={propsValueWebsite}
            error={error.website}
            disabled={disabled && true}
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
        <input
          className={classes.submit}
          type={"submit"}
          disabled={disabled && true}
          style={{ background: disabled ? "#AFAFAF" : "#52CF4F" }}
          value="Отправить"
        />
      </form>
    </div>
  );
};
