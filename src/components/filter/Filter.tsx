import React from "react";
import BaseButton from "../UI/BaseButton/BaseButton";
import classes from "./Filter.module.scss";

const Filter = () => {
  return (
    <div className={classes.filter}>
      <div className={classes.filter_btn}>
        <p>Сортировка</p>
        <BaseButton text="по городу"/>
        <BaseButton text="по компании"/>
      </div>
    </div>
  );
};

export default Filter;
