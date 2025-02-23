import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define types for the data you're fetching
interface Data {
  id: number;
  name: string;
  description: string;
}

const API: React.FC = () => {
  // State variables to store data and loading/error states
  const [data, setData] = useState<Data[] | null>(null);  // Data fetched from API
  const [error, setError] = useState<string | null>(null); // Error state
  const [loading, setLoading] = useState<boolean>(true);   // Loading state

  // Fetch data when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users.php') 
      .then((response) => {
        setData(response.data);    // Set fetched data to state
        setLoading(false);   
        console.log(response.data)       // Set loading to false after fetching
      })
      .catch((error) => {
        setError(error.message);    // Set error if the API call fails
        setLoading(false);          // Set loading to false if there's an error
      });
  }, []);  // Empty dependency array means this runs once when the component mounts

  // Conditionally render based on loading, error, or data state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data from API</h1>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default API;