import React from "react";
import classes from "./Filter.module.scss";

const Filter = () => {
  return (
    <div className={classes.filter}>
      <div className={classes.filter_btn}>
        <p>Сортировка</p>
        <button>по городу</button>
        <button>по компании</button>
      </div>
    </div>
  );
};

export default Filter;
