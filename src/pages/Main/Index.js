import React, { useEffect, useState } from 'react'
import { ref, get } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigate } from 'react-router-dom'

import PieChart from '../../components/Pie/PieChart/Index';
import Header from '../../components/Header/Index';
import TableForMainPage from '../../components/Table/TableForMainPage/TableForMainPage';

import classes from './Main.module.css'
import Footer from '../../components/Footer/Index';

const Main = () => {
  const [userData, setUserData] = useState({});
  const [expendedMoney, setExpendedMoney] = useState({
    cash_out: 0,
    fun: 0,
    other: 0,
    shoping: 0,
    tax: 0,
  })
  // const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId")

    const databaseRef = ref(database, `/users/${userId}`);

    const fetchData = async () => {
      try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
        } else {
          console.log("Data not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();


  }, []);

  useEffect(() => {
    if (Object.keys(userData).length < 0) {
      return
    }
    const transactions = userData.transactions;
    const updatedExpendedMoney = {
      cash_out: 0,
      fun: 0,
      other: 0,
      shoping: 0,
      tax: 0,
    };

    for (const category in transactions) {
      for (const transactionKey in transactions[category]) {
        const transaction = transactions[category][transactionKey];
        updatedExpendedMoney[category] += transaction.amount;
      }
    }

    setExpendedMoney(updatedExpendedMoney);

  }, [userData]);

  const handleCategoryClick = (category) => {
    if (userData.transactions && userData.transactions[category]) {
      // setSelectedCategoryData(userData.transactions[category]);
      console.log(userData.transactions[category]);
      console.log(category)
      navigate(`/category/${category}`);
    }
  };

  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <PieChart expendedMoney={expendedMoney} />
        <TableForMainPage expendedMoney={expendedMoney} handleCategoryClick={handleCategoryClick} />
      </div>
      <Footer />
      {/* <div>
        <h2>Selected Category Data:</h2>
        {selectedCategoryData && (
          <pre>{JSON.stringify(selectedCategoryData, null, 2)}</pre>
        )}
      </div> */}
    </div>
  )
}

export default Main;