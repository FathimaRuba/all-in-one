import React, { useState, useEffect } from 'react';
import HeaderSp from '../Components/HeaderSp';
import UpdateWorkStat from '../Components/UpdateWorkStat';
import { getacceptedWorks } from '../Services/apiService';

function WorkStatus() {
    const [works, setWorks] = useState([]);

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
        <>
            <HeaderSp />
            <div className='container-fluid'>
                <h2 className='m-3'>View & Update Work Status</h2>
                {works.length > 0 ? (
                    <table className='table table-bordered table-dark'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {works.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.location}</td>
                                    <td>{item.dateFor}</td>
                                    <td>{item.amount}</td>
                                    <td>
                                        <div className='d-flex justify-content-between'>
                                            <span>{item.status}</span>
                                            {item.status !== 'canceled' && item.status !== 'completed'  && (
                                                <UpdateWorkStat
                                                    workId={item._id}
                                                    currentStatus={item.status}
                                                />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h3>No Accepted Works</h3>
                )}
            </div>
        </>
    );
}

export default WorkStatus;
