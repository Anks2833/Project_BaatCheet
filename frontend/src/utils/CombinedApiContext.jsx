import { useState, useEffect, createContext } from "react";
import axios from "axios";


export const CombinedApiContext = createContext();

export const CombinedApiProvider = ({ children }) => {
    const [apiData, setApiData] = useState({});
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [response1, response2] = await Promise.all([
            axios.get('/api/data'),
            axios.get('/api/another-data')
          ]);
          
          setApiData({
            data: response1.data,
            anotherData: response2.data
          });
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchData();
    }, []);
    
    return (
      <CombinedApiContext.Provider value={{ apiData }}>
        {children}
      </CombinedApiContext.Provider>
    );
  };