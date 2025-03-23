import React, { useContext, useState, useEffect } from 'react';
import Header from '../Components/Header';
import { getComplaintContext } from '../context/ComplaintApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { replyComplaint } from '../Services/apiService';
import { getComplaint } from '../Services/apiService';

function ViewComplaints() {
    const { complaints, setComplaints } = useContext(getComplaintContext); // Added setComplaints to update the context
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [reply, setReply] = useState({ reply: '' }); // Initialize as an object

    // Fetch complaints from API when component mounts
    useEffect(() => {
        getData();
    }, [setComplaints]);

    const getData = async () => {
        try {
            const headers = {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            };
            const response = await getComplaint(headers);
            if (response.status === 200) {
                setComplaints(response.data);
            }
        } catch (error) {
            console.error('Error while fetching complaints:', error);
            toast.error('Error fetching complaints');
        }
    };

    const handleClose = () => setShow(false);

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setReply({ reply: '' }); // Reset reply object
        setShow(true);
    };

    const handleSendReply = async () => {
        if (!reply.reply) {
            toast.warning('Please enter a valid reply');
        } else {
            try {
                const headers = {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                };
    
                const res = await replyComplaint(
                    selectedComplaint._id,
                    { reply: reply.reply },
                    headers
                );
                if (res.status === 200) {
                    toast.success('Reply sent successfully');
                    setShow(false);
                    setReply({ reply: '' }); // Reset reply object
    
                    // Update the complaints list with the new reply
                    const updatedComplaints = complaints.map(complaint =>
                        complaint._id === selectedComplaint._id
                            ? { ...complaint, reply: res.data.reply }
                            : complaint
                    );
                    setComplaints(updatedComplaints);
                } else {
                    toast.error('Something went wrong!');
                }
            } catch (error) {
                toast.error('Error while sending reply');
                console.error('Error while sending reply:', error);
            }
        }
    };
    

    return (
        <>
            <Header />
            <div className='container-fluid'>
                <h2 className='m-3'>View Complaints and Send Reply</h2>

                {complaints.length > 0 ? (
                    <table className='table table-bordered table-dark'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Complaint</th>
                                <th>Reply</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint, index) => (
                                <tr key={complaint._id}>
                                    <td>{index + 1}</td>
                                    <td>{complaint.username}</td>
                                    <td>{complaint.complaint}</td>
                                    <td>{complaint.reply || 'Pending'}</td>
                                    <td>
                                        {
                                            complaint.reply === 'pending' ?
                                            <button
                                            onClick={() => handleShow(complaint)}
                                            className='btn btn-outline-info'
                                        >
                                            Reply
                                        </button>
                                        :
                                        <h6 className='btn btn-success'>Replied</h6>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1 className='text-center text-danger mt-5'>No Complaints</h1>
                )}
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="" className='fw-bolder'>Complaint</label>
                    {selectedComplaint && (
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Complaint"
                            value={selectedComplaint.complaint}
                            readOnly
                        />
                    )}
                    <textarea
                        onChange={(e) => setReply({ ...reply, reply: e.target.value })}
                        value={reply.reply}
                        className="form-control"
                        placeholder="Reply"
                        style={{ height: '200px' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSendReply}>
                        Send Reply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewComplaints;
