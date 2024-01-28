import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../../utils/firebase';

import TableForCategoryPage from '../../components/Table/TableForCategoryPage/Index';
import Header from '../../components/Header/MainHeader/Index';
import CategoryHeader from '../../components/Header/CategoryHeader/Index';
import TestChart from '../../components/Pie/TestChart/Index';
import Footer from '../../components/Footer/Index';
// import AreaPieces from '../../components/Pie/AreaPieces/Index';

import classes from './Expenses.module.css';

const Expenses = () => {
  const { category } = useParams();
  const [UserData, setUserData] = useState(null)
  // const [UserDataForAllCategory, setUserDataForAllCategory] = useState(null);
  // console.log(UserDataForAllCategory)

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const databaseRef = ref(database, `/users/${userId}`);

    const fetchData = async () => {
      try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data.transactions[category]);
        } else {
          console.log("Data not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [category]);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId")
  //   const databaseRef = ref(database, `/users/${userId}`);

  //   const fetchData = async () => {
  //     try {
  //       const snapshot = await get(databaseRef);
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         setUserDataForAllCategory(data);
  //       } else {
  //         console.log("Data not found.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();

  // }, [category]);

  const transactionsDates = useMemo(() => {
    if (!UserData) {
      return [];
    }
    return Object.entries(UserData).map(([key, value]) => value.date);
  }, [UserData]);

  const transactionsAmounts = useMemo(() => {
    if (!UserData) {
      return [];
    }
    return Object.entries(UserData).map(([key, value]) => value.amount);
  }, [UserData]);

  // const allTransactionsDates = useMemo(() => {
  //   if (!UserDataForAllCategory || !UserDataForAllCategory.transactions) {
  //     return [];
  //   }
  //   return Object.values(UserDataForAllCategory.transactions).flatMap(category =>
  //     Object.values(category).map(transaction => transaction.date)
  //   );
  // }, [UserDataForAllCategory]);

  // const sortedDates = allTransactionsDates.sort((a, b) => new Date(a) - new Date(b));

  // const allTransactionsAmounts = useMemo(() => {
  //   if (!UserDataForAllCategory || !UserDataForAllCategory.transactions) {
  //     return [];
  //   }
  //   return Object.values(UserDataForAllCategory.transactions).flatMap(category =>
  //     Object.values(category).map(transaction => transaction.amount)
  //   );
  // }, [UserDataForAllCategory]);



  return (
    <div>
      <Header />
      <CategoryHeader />
      {/* <AreaPieces transactionsData={transactionsData}/> */}
      {category === 'transactions' ? <h1 className={classes.allExpenses}>For all expenses there is no charts!</h1> : <TestChart transactionsDates={transactionsDates} transactionsAmounts={transactionsAmounts} />}
      <TableForCategoryPage />
      <Footer />
    </div>
  )
}

export default Expenses;
