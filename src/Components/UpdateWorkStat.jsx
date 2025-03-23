import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateBookingStatus } from '../Services/apiService';
import { toast } from 'react-toastify';

function UpdateWorkStat({ workId, currentStatus }) {
    const [show, setShow] = useState(false);
    const [newStatus, setNewStatus] = useState(currentStatus); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            };

            const res = await updateBookingStatus(workId, newStatus, headers);
            if (res.status === 200) {
                toast.success('Status updated successfully!');
                handleClose();
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status.');
        }
    };

    return (
        <>
            <button className='btn btn-success rounded-5' onClick={handleShow}>
                Update
            </button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Work Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select
                        aria-label="Update Work Status"
                        className='form-control mb-2'
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="completed">Completed</option>
                        <option value="canceled">Cancelled</option>
                        <option value="payment pending">Payment Pending</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateWorkStat;
