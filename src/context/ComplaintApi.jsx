import React, { createContext, useState, useEffect } from 'react';
import { getComplaint } from '../Services/apiService';

// Create the context
export const getComplaintContext = createContext();

function ComplaintApi({ children }) {
    // Initialize complaints as an empty array
    const [complaints, setComplaints] = useState([]);

    // Fetch complaints when the component mounts
    useEffect(() => {
        getData();
    }, []);

    // Function to fetch complaints from the API
    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`, // Use the token from localStorage
        };

        try {
            const res = await getComplaint(headers);  // Call API service to get complaints
            
            if (res.status === 200) {
                setComplaints(res.data);  // Update state with fetched complaints
            } else {
                console.log(res);
            }
        } catch (err) {
            console.log('Error fetching complaints:', err);
        }
    };

    // Provide both the complaints and the getData function to the context consumers
    return (
        <getComplaintContext.Provider value={{ complaints, setComplaints }}>
            {children}
        </getComplaintContext.Provider>
    );
}

export default ComplaintApi;
