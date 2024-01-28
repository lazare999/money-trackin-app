import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../../utils/firebase';
import { useParams } from 'react-router-dom';

// import calendar from '../../../images/expensIcons/calendar.png';
// import description from '../../../images/expensIcons/description.png';
// import amount from '../../../images/expensIcons/amount.png';

import classes from './Table.module.css';

const TableForCategoryPage = () => {
  const [userData, setUserData] = useState({});
  const { category } = useParams();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const databaseRef = ref(database, `/users/${userId}`);

    const fetchData = async () => {
      try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
        } else {
          console.log('Data not found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalExpense = (category) => {
    const categoryData = userData.transactions && userData.transactions[category];

    if (!categoryData) return 0;

    const totalExpense = Object.values(categoryData).reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    return totalExpense.toFixed(2);
  };

  const images = {
    calendar: '/images/expensIcons/calendar.svg',
    description: '/images/expensIcons/description.svg',
    amount: '/images/expensIcons/amount.svg',
  }

  const categoryIcons = {
    calendar: images.calendar,
    description: images.description,
    amount: images.amount,
  }

  if (category === 'transactions') {
    return (
      <div className={classes.container}>
        {userData.transactions ? (
          Object.keys(userData.transactions).map((category) => (
            <div key={category} className={classes.tableContainer}>
              {/* <h2>Category: {category}</h2> */}
              <table className={classes.contentTable}>
                <thead>
                  <tr>
                    <th>Category: {category}</th>
                    <th> Total Amount:</th>
                    <th>{`${calculateTotalExpense(category)}$`}</th>
                  </tr>
                  <tr>
                    <th className={classes.thForIcons}> {categoryIcons['calendar'] && (
                      <img src={categoryIcons['calendar']} alt="Date icon" className={classes.icons} />
                    )}
                      Date</th>
                    <th className={classes.thForIcons}>{categoryIcons['amount'] && (
                      <img src={categoryIcons['amount']} alt="amount icon" className={classes.icons} />
                    )}Amount</th>
                    <th className={classes.thForIcons}>{categoryIcons['description'] && (
                      <img src={categoryIcons['description']} alt="description icon" className={classes.icons} />
                    )}Description</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.transactions[category] &&
                    Object.keys(userData.transactions[category]).map((transactionKey) => {
                      const transaction = userData.transactions[category][transactionKey];
                      return (
                        <tr key={transactionKey}>
                          <td>{transaction.date}</td>
                          <td>{transaction.amount.toFixed(2)}$</td>
                          <td>{transaction.description}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div>No transaction data found.</div>
        )}
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        {category && userData.transactions && userData.transactions[category] ? (
          <div key={category} className={classes.tableContainer}>
            <table className={classes.contentTable}>
              <thead>
                <tr>
                  <th>Category: {category}</th>
                  <th> Total Amount:</th>
                  <th>{`${calculateTotalExpense(category)}$`}</th>
                </tr>
                <tr>
                  <th className={classes.thForIcons}> {categoryIcons['calendar'] && (
                    <img src={categoryIcons['calendar']} alt="Date icon" className={classes.icons} />
                  )}
                    Date</th>
                  <th className={classes.thForIcons}>{categoryIcons['amount'] && (
                    <img src={categoryIcons['amount']} alt="amount icon" className={classes.icons} />
                  )}Amount</th>
                  <th className={classes.thForIcons}>{categoryIcons['description'] && (
                    <img src={categoryIcons['description']} alt="description icon" className={classes.icons} />
                  )}Description</th>
                </tr>
              </thead>
              <tbody>
                {userData.transactions[category] &&
                  Object.keys(userData.transactions[category]).map((transactionKey) => {
                    const transaction = userData.transactions[category][transactionKey];
                    return (
                      <tr key={transactionKey}>
                        <td>{transaction.date}</td>
                        <td>{transaction.amount.toFixed(2)}$</td>
                        <td>{transaction.description}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>Category data not found.</div>
        )}
      </div>
    );
  }
};

export default TableForCategoryPage;
