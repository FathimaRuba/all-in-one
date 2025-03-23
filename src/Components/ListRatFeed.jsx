import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { addRatFeed, getRatFeed } from '../Services/apiService';
import { toast } from 'react-toastify';

function ListRatFeed({ spid }) {

    const [ratfeed, setRatFeed] = useState({
        rating: 0.0,
        feedback: '',
        username: ''
    });
    const [data, setData] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setRatFeed({ ...ratfeed, username: localStorage.getItem('username') });
        }
        getData();
    }, []);

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        };
        const res = await getRatFeed(headers, spid);
        if (res.status === 200) {
            setData(res.data);
            calculateAverageRating(res.data);
        }
    };

    const calculateAverageRating = (ratings) => {
        if (ratings.length > 0) {
            const totalRating = ratings.reduce((acc, item) => acc + parseFloat(item.rating), 0);
            const average = totalRating / ratings.length;
            setAverageRating(average.toFixed(1)); // Round to one decimal place
            // setAvgRating(average.toFixed(1))
        } else {
            setAverageRating(0);
            // setAvgRating(0)
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = async () => {
        const { rating, feedback } = ratfeed;
        if (!rating || !feedback) {
            toast.warning('Please enter valid inputs!!');
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        };

        const formattedDate = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const data = {
            rating, feedback, ratedTo: spid, date: formattedDate, username: localStorage.getItem('username')
        };

        try {
            const res = await addRatFeed(data, headers);
            if (res.status === 200) {
                toast.success('Added Successfully');
                handleClose();
                getData(); // Refresh data after adding
            } else {
                toast.error('Failed to add feedback!');
            }
        } catch (error) {
            toast.error('An error occurred while submitting feedback!');
        }
    };

    const handleRatingClick = (value) => {
        setRatFeed({ ...ratfeed, rating: parseFloat(value) });
    };

    return (
        <>
            <div className="p-md-5 d-flex justify-content-center">
                <div className="border mb-3 w-100 w-md-75 rounded-4 p-3 p-md-5 shadow">
                    <div className="text-center mb-3">
                        <div className="text-center bg-warning text-white py-1 px-2 rounded" style={{ width: '100px' }}>
                            <i className="fa-solid fa-star me-1 mt-1" /> <span>{averageRating}</span>
                        </div>
                    </div>
                    <button className="btn btn-primary my-3" style={{ width: '250px' }} onClick={handleShow}>
                        Add
                    </button>
                    <Row className="d-flex flex-wrap align-items-center p-2 mb-3">
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <div key={index} className="mb-2 border rounded-3 p-2">
                                    <div className="d-flex align-items-center me-3 mb-2 mb-md-0" style={{ minWidth: '120px' }}>
                                        <div className="border rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                            <i className="fa-regular fa-user" />
                                        </div>
                                        <span className="fw-bold ms-2">{item.username}</span>
                                    </div>
                                    <div className="d-flex align-items-center me-3 mb-2 mb-md-0 mt-2" style={{ minWidth: '90px' }}>
                                        <span className="bg-warning text-white py-1 px-2 rounded d-flex align-items-center">
                                            <i className="fa-solid fa-star me-1" style={{ marginTop: '1px' }} /> <span>{item.rating}</span>
                                        </span>
                                    </div>
                                    <div className="flex-grow-1">
                                        <span className="d-block mb-1 mt-1">Reviewed on {item.date}</span>
                                        <p className="fw-bold mb-0" style={{ textAlign: 'justify' }}>
                                            {item.feedback}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3>No Rating & Feedbacks Added</h3>
                        )}
                    </Row>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Rating & Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <div className="d-flex">
                            {[1.0, 2.0, 3.0, 4.0, 5.0].map((star) => (
                                <i
                                    key={star}
                                    className={`fa-star ${star <= ratfeed.rating ? 'fa-solid text-warning' : 'fa-regular text-secondary'}`}
                                    style={{ fontSize: '24px', cursor: 'pointer' }}
                                    onClick={() => handleRatingClick(star)}
                                ></i>
                            ))}
                        </div>
                    </div>
                    <FloatingLabel controlId="floatingfeed" label="Feedback">
                        <Form.Control
                            type="text"
                            onChange={(e) => setRatFeed({ ...ratfeed, feedback: e.target.value })}
                            placeholder="Write your feedback"
                            required
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ListRatFeed;
