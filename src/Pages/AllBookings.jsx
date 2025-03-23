import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import UserNavbar from '../Components/UserNavbar';
import { getUserBooking, updateBookingStatus } from '../Services/apiService';
import { Link } from 'react-router-dom';

function AllBookings() {
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        };
        try {
            const res = await getUserBooking(headers);
            if (res.status === 200) {
                setBooking(res.data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error.response?.data || error.message);
            alert('Failed to fetch bookings');
        }
    };

    const handleCancelBooking = async (id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        };
        try {
            const res = await updateBookingStatus(id, 'canceled', headers);
            if (res.status === 200 && res.data.success) {
                setBooking((prevBooking) =>
                    prevBooking.map((item) =>
                        item._id === id ? { ...item, status: 'canceled' } : item
                    )
                );
                alert('Booking canceled successfully');
            } else {
                alert('Failed to cancel the booking');
            }
        } catch (error) {
            console.error('Error canceling booking:', error.response?.data || error.message);
            alert('Error canceling booking');
        }
    };

    const handleUPIPayment = (amount, upiId) => {
        const upiUrl = `upi://pay?pa=${upiId}&am=${amount}`;
        const timeout = setTimeout(() => {
            window.location.href = "https://play.google.com/store/search?q=upi+app&c=apps";
        }, 3000);

        window.location.href = upiUrl;

        const handleBlur = () => clearTimeout(timeout);
        window.addEventListener("blur", handleBlur);

        return () => window.removeEventListener("blur", handleBlur);
    };

    const isCancellable = (status) => status === 'pending' || status === 'accepted';
    const isPayable = (status) => status === 'accepted' || status === 'payment pending';

    return (
        <>
            <UserNavbar />
            <div className='mx-4 d-flex justify-content-center my-5 mb-3 flex-column'>
                <h1 className='text-center my-3'>All Bookings</h1>
                <div className="w-100 p-md-5 rounded-4 shadow p-3 mb-3">
                    <div className="mb-3">
                        {booking.length > 0 ? (
                            booking.map((item) => (
                                <Row
                                    key={item._id}
                                    className='w-100 rounded d-flex flex-md-row p-md-3 p-1 mb-3'
                                >
                                    <div>
                                        <h3>{item.spName}</h3>
                                        <h6>{item.date}</h6>
                                        <h6>Status: {item.status}</h6>
                                        <h6>Amount: Rs.{item.amount}</h6>
                                        <h6>UpiID: {item.upiId}</h6>
                                        <div className="d-flex justify-content-start my-3">
                                            {isCancellable(item.status) && (
                                                <button
                                                    className='btn btn-danger rounded-3 me-2'
                                                    onClick={() => handleCancelBooking(item._id)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {isPayable(item.status) && (
                                                <button
                                                    onClick={() => handleUPIPayment(item.amount || 0, item.upiId || 'example@upi')}
                                                    className="btn btn-success rounded-3"
                                                >
                                                    Pay
                                                </button>
                                            )}
                                            {item.status === 'canceled' && (
                                                <span className='btn-danger btn'>
                                                    Booking has been canceled.
                                                </span>
                                            )}
                                            {/* {item.status === 'completed' && (
                                                <Link
                                                    to={`/ratfeeduser/${item._id}?providerName=${encodeURIComponent(`${item.spName}`)}`}
                                                    className="btn btn-warning mt-2"
                                                >
                                                    Rating & Feedbacks
                                                </Link>
                                            )} */}
                                        </div>
                                    </div>
                                </Row>
                            ))
                        ) : (
                            <h2>No Bookings</h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllBookings;
