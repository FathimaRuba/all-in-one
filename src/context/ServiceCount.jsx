import React, { createContext, useState, useEffect } from 'react'
import { getServiceProviders } from '../Services/apiService';

export const getServiceCountContext = createContext()

function ServiceCount({ children }) {

    const [servicers, setServicers] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const headers = {
                'Content-Type':'application/json',
                'Authorization':`Token ${localStorage.getItem('token')}`
            }
            const res = await getServiceProviders(headers);
            
            setServicers(res.data); 
        } catch (err) {
            console.error('Error fetching service providers:', err);
        }
    }
    
    return (
        <>
        <getServiceCountContext.Provider value={{servicers}}>
            {children}
        </getServiceCountContext.Provider>
        </>
    )
}

export default ServiceCount