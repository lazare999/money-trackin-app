import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase';

function Test() {
  const [userData, setUserData] = useState({});

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

  return (
    <div className="App">
      <h1>User Data</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}

export default Test;
