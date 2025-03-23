import React, { useState, useEffect } from 'react';
import HeaderSp from '../Components/HeaderSp';
import { getSpBooking, updateBookingStatus, updateBookingAmount,deleteBooking } from '../Services/apiService';
import { toast } from 'react-toastify';

function ServiceRequest() {
    const [booking, setBooking] = useState([]);
    const [showModal, setShowModal] = useState(false); // Manage modal visibility
    const [selectedBookingId, setSelectedBookingId] = useState(null); // Booking ID for updating amount
    const [amount, setAmount] = useState(''); // To store the amount input
    const [upiId, setUpiId] = useState(''); // To store the UPI ID

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
            setBooking(res.data);
        } else {
            toast.error('Failed to fetch bookings.');
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            };
            const res = await updateBookingStatus(id, newStatus, headers);
            if (res.status === 200) {
                setBooking((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking._id === id ? { ...booking, status: newStatus } : booking
                    )
                );
                toast.success(`Booking updated to ${newStatus}`);
            } else {
                toast.error('Failed to update booking status.');
            }
        } catch (error) {
            console.error('Error updating booking status:', error);
            toast.error('Error updating booking status.');
        }
    };

    const handleDelete = async(id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        };
        const res = await deleteBooking(id,headers)
        if(res.status==200){
            getData()
        } 
    }

    const handleOpenModal = (id) => {
        setSelectedBookingId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setAmount('');
        setUpiId('');
    };

    const handleAmountSubmit = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            toast.warning('Please enter a valid amount.');
            return;
        }

        if (!upiId || !/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
            toast.warning('Please enter a valid UPI ID.');
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        };

        try {
            const res = await updateBookingAmount(selectedBookingId, { amount, upiId }, headers);
            console.log('Submitting Amount and UPI ID:', { amount, upiId });
            console.log(res)
            if (res.status === 200) {
                toast.success('Amount updated successfully.');
                setShowModal(false);
                setAmount('');
                setUpiId('');
                getData();
            } else {
                toast.error('Failed to update amount.');
            }
        } catch (error) {
            console.error('Error updating amount:', error);
            toast.error('Error updating amount.');
        }
    };

    return (
        <>
            <HeaderSp />
            <div className="container-fluid">
                <h2 className="m-3">Verify Service Request</h2>
                {booking.length > 0 ? (
                    <table className="table table-bordered table-dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {booking.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.location}</td>
                                    <td>{item.dateFor}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {item.status === 'pending' && (
                                            <>
                                                <button
                                                    className="btn btn-outline-success me-2 mb-2"
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
                                        {item.status !== 'pending' && (
                                            <span className={`badge ${item.status === 'accepted' ? 'bg-success' : 'bg-danger'}`}>
                                                {item.status}
                                            </span>
                                        )}
                                        {item.status === 'accepted' && item.amount === 0 && (
                                            <button
                                                className="btn btn-info mb-2"
                                                onClick={() => handleOpenModal(item._id)}
                                            >
                                                Set Amount
                                            </button>
                                        )}
                                    </td>
                                    <td><button className='btn' onClick={()=>handleDelete(item._id)}><i className="fa-solid fa-trash" style={{ color: "#a40414", }} /></button></td>                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h3>No Requests</h3>
                )}
            </div>

            {/* Modal for UPI ID and Amount Input */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter UPI ID and Amount</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Enter UPI ID"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                />
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAmountSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ServiceRequest;
