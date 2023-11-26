import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';

import goBack from '../../../images/arrow.png'

import classes from './CategoryHeader.module.css'

const CategoryHeader = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  // console.log(category)

  const options = [
    { value: 'fun', label: 'Fun' },
    { value: 'shoping', label: 'Shopping' },
    { value: 'other', label: 'Other' },
    { value: 'cash_out', label: 'Cash Out' },
    { value: 'tax', label: 'Tax' },
    { value: 'transactions', label: 'all expenses' },
  ];
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === category) || options[0]
    // options.value
    // console.log(options.find((option) => option.value === category))
  );

  const handleOptionSelect = (selected) => {
    setSelectedOption(selected);
    navigate(`/category/${selected.value}`);
  };

const prevPageHandler = () => {
  navigate(-1);
  // setSelectedOption(category);
}

  return (

    <div className={classes.container}>
      <img src={goBack} alt='go back icon' className={classes.img}  onClick={prevPageHandler}/>
      <div className={classes.category}>
        <h2>Category:</h2>
        <Select options={options}
          value={selectedOption}
          onChange={handleOptionSelect}
          className={classes.reactSelectContainer}
          classNamePrefix={classes.reactSelect} />
      </div>
    </div>
  )
}

export default CategoryHeader;