import React, { FC } from "react";
import BaseButton from "../UI/BaseButton/BaseButton";
import classes from "./Filter.module.scss";

interface FilterProps {
  sortData: (field: string) => void
}

const Filter: FC<FilterProps> = ({sortData}) => {
  return (
    <div className={classes.filter}>
      <div className={classes.filter_btn}>
        <p>Сортировка</p>
        <BaseButton text="по городу" sortData={sortData} search='city'/>
        <BaseButton text="по компании" sortData={sortData} search='name'/>
      </div>
    </div>
  );
};

export default Filter;
