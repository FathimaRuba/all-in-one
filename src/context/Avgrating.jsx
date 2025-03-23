// Avgrating.js
import React, { createContext, useState, useEffect } from 'react';
import { getRatFeed } from '../Services/apiService';

export const RatingContext = createContext();

function Avgrating({ children }) {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const spid = 'someServiceId';  // Ensure you have spid defined or passed correctly
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        };
        const res = await getRatFeed(headers, spid);
        if (res.status === 200) {
            calculateAverageRating(res.data);
        }
    };

    const calculateAverageRating = (ratings) => {
        if (ratings.length > 0) {
            const totalRating = ratings.reduce((acc, item) => acc + parseFloat(item.rating), 0);
            const average = totalRating / ratings.length;
            setAverageRating(average.toFixed(1)); 
        } else {
            setAverageRating(0);
        }
    };

    return (
        <RatingContext.Provider value={{ averageRating }}>
            {children}
        </RatingContext.Provider>
    );
};

export default Avgrating;
