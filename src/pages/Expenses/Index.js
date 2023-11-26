import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase';
// import classes from './expenses.module.css'
import TableForCategoryPage from '../../components/Table/TableForCategoryPage/Index';
import Header from '../../components/Header/Index';
import CategoryHeader from '../../components/Header/CategoryHeader/Index';
// import AreaPieces from '../../components/Pie/AreaPieces/Index';
import TestChart from '../../components/Pie/TestChart/Index';
import Footer from '../../components/Footer/Index';

const Expenses = () => {
    const { category } = useParams();
    const [UserData, setUserData] = useState(null)
    console.log(UserData)

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

    //   const transactionsData = UserData
    // ? Object.entries(UserData).map(([key, value]) => [value.date, value.amount])
    // : [];


      const transactionsDates = UserData
      ? Object.entries(UserData).map(([key, value]) => value.date)
      : [];

    const transactionsAmounts = UserData
      ? Object.entries(UserData).map(([key, value]) => value.amount)
      : [];
    return (
        <div>
            <Header />
            <CategoryHeader />
            {/* <AreaPieces transactionsData={transactionsData}/> */}
            <TestChart transactionsDates={transactionsDates} transactionsAmounts={transactionsAmounts}/>
            <TableForCategoryPage />
            <Footer />
        </div>
    )
}

export default Expenses;