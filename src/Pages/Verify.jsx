import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { getAllServiceProviders, updateServiceProviderStatus } from '../Services/apiService';

function Verify() {
    const [servicers, setServicers] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    // Fetch service providers
    const getData = async () => {
        try {
            const headers = {
                'Content-Type':'application/json',
                'Authorization':`Token ${localStorage.getItem('token')}`
            }
            const res = await getAllServiceProviders(headers);
            if (res.status==200) {
                setServicers(res.data); // Assuming the response structure contains `success` and `data`
            } else {
                console.error('Failed to fetch service providers:', res.message);
            }
        } catch (err) {
            console.error('Error fetching service providers:', err);
        }
    };

    // Update service provider status
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await updateServiceProviderStatus(id, newStatus);
    
            if (res.status == 200) {
                // Update local state with the new status
                setServicers((prevServicers) =>
                    prevServicers.map((servicer) =>
                        servicer._id === id ? { ...servicer, status: newStatus } : servicer
                    )
                );
            }
        } catch (error) {
            console.error('Error updating service provider status:', error);
        }
    };
    

    return (
        <>
            <Header />
            <div className="container-fluid">
                <h2 className="m-3">Verify Service Providers</h2>
                {servicers.length > 0 ? (
                    <table className="table table-bordered table-dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicers.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>{item.status || 'Pending'}</td>
                                    <td>
                                        {item.status !== 'accepted' && item.status !== 'rejected' && (
                                            <>
                                                <button
                                                    className="btn btn-outline-success me-3 mb-2"
                                                    onClick={() => handleStatusUpdate(item._id, 'accepted')}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger mb-2"
                                                    onClick={() => handleStatusUpdate(item._id, 'rejected')}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h3>No Requests</h3>
                )}
            </div>
        </>
    );
}

export default Verify;
