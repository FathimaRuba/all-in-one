import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserNavbar from '../Components/UserNavbar';
import { addComplaint, getComplaintsById } from '../Services/apiService';
import { toast } from 'react-toastify';
import { getComplaintContext } from '../context/ComplaintApi';

function ComplaintsUser() {

    const { setComplaint } = useContext(getComplaintContext);
    const [data, setData] = useState([]);
    const [comp, setComp] = useState({ complaint: "", name: "", date: "", reply: "" });  // Include 'reply' here
    const [show, setShow] = useState(false);

    const username = localStorage.getItem('username');    // Assuming username is stored in localStorage

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        };

        try {
            const res = await getComplaintsById(headers);
            console.log("Response from getComplaint:", res);
            if (res.status === 200) {
                setData(res.data);
                setComplaint(res);
            } else {
                console.log(res);
            }
        } catch (err) {
            console.log("Error fetching complaints:", err);
        }
    };

    const handleSend = async () => {
        // Validate required fields before proceeding
        if (!comp.complaint || !comp.name) {
            toast.warning('Please fill out all required fields.');
            return;
        }
    
        // Get the current date in "Month Day, Year" format (e.g., "October 25, 2024")
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    
        // Prepare complaint data with the formatted date and userid
        const complaintData = {
            complaint: comp.complaint,
            name: comp.name,
            date: currentDate,
            username: username || '',
            // userid: localStorage.getItem('userid') || '',  // Ensure you send userid here
        };
    
        console.log(complaintData); // Debug log
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
        };
    
        try {
            // Send complaint data to the backend
            const res = await addComplaint(complaintData, headers);
    
            if (res.status === 200) {
                toast.success('Complaint Sent Successfully');
                handleClose();
                setComp({ complaint: "", name: "", date: "" }); // Clear form
            } else {
                toast.error('Complaint Not Sent');
            }
        } catch (error) {
            console.error('Error sending complaint:', error);
            toast.error('Error occurred while sending complaint');
        }
    };
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <UserNavbar />
            <div className="mx-4 d-flex justify-content-center my-5 mb-3 flex-column">
                <h1 className="text-center my-3">Complaints</h1>
                <div>
                    <button className="btn btn-primary my-3" onClick={handleShow}>
                        New Complaint?
                    </button>
                </div>

                {/* Modal to Add New Complaint */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Complaint</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 className="fw-bolder">Complaint</h5>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter Service Provider Name / App Name"
                            onChange={(e) => setComp({ ...comp, name: e.target.value })}
                        />
                        <textarea
                            onChange={(e) => setComp({ ...comp, complaint: e.target.value })}
                            className="form-control"
                            placeholder="Enter Your Complaints Here"
                            style={{ height: '200px' }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSend}>
                            Send
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Complaints Display Section */}
                <div className="w-100 p-md-5 rounded-4 shadow p-3 mb-3">
                    {data?.length > 0 ? (
                        <Row className="rounded d-flex mb-3">
                            {data?.map((item, index) => (
                                <Col key={item._id || index} xs={12} md={12} className="mb-4">
                                    <div>
                                        <h3>{item.name}</h3>
                                        <h6>{item.date}</h6>
                                        <h5
                                            style={{
                                                lineHeight: '1.4',
                                                textAlign: 'justify',
                                                textTransform: 'lowercase',
                                            }}
                                        >
                                            {item.complaint}
                                        </h5>
                                        <h5>
                                            Reply: <span style={{ textTransform: 'lowercase' }}>
                                                {item.reply || 'Pending'}
                                            </span>
                                        </h5>
                                    </div>
                                    <hr />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <h3 className='text-center text-danger'>No Complaints Added!!</h3>
                    )}
                </div>
            </div>
        </>
    );
}

export default ComplaintsUser;
