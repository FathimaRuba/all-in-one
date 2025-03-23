import React,{ useEffect,useState,createContext } from 'react'
import { getSpBooking } from '../Services/apiService'

export const getReqContext = createContext()

function ReqContext({children}) {

    const [ req,setReq ] = useState([])

    useEffect(() => {
            getData();
        }, []);
    
        const getData = async () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            };
            const res = await getSpBooking(headers);
            console.log('req',res)
    
            if (res.status === 200) {
                setReq(res.data);
            } else {
                toast.error('Failed to fetch bookings.');
            }
        };

  return (
    <getReqContext.Provider value={{ req }}>
        {children}
    </getReqContext.Provider>
  )
}

export default ReqContext