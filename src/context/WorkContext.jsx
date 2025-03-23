import React,{ createContext ,useEffect ,useState } from 'react'
import { getacceptedWorks } from '../Services/apiService'

export const getWorkContext = createContext()

function WorkContext({ children }) {

    const [works,setWorks] = useState([])

    useEffect(() => {
            getData();
        }, []);  
    
        const getData = async () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            };
            try {
                const res = await getacceptedWorks(headers);
                console.log('getworks',res)
                if (res.status === 200) {
                    setWorks(res.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
  return (
    <getWorkContext.Provider value={{ works }}>
        {children}
    </getWorkContext.Provider>
  )
}

export default WorkContext
