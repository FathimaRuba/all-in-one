import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../Components/Header';
import { getUserCountContext } from '../context/userCountApi';
import { getServiceCountContext } from '../context/ServiceCount';
import { getComplaintContext } from '../context/ComplaintApi';

function AdminDash() {
    const { user } = useContext(getUserCountContext); 
    const { servicers } = useContext(getServiceCountContext);  
    const { complaints } = useContext(getComplaintContext);  


    const divStyle = {
        backgroundImage: `url('https://thumbnails.production.thenounproject.com/pWrMjWlaRAsM5o7A9UrHTkWlI1U=/fit-in/1000x1000/photos.production.thenounproject.com/photos/A0A14528-398D-4A47-9494-5038CD72B0B6.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '600px',
        width: '100%',
        position: 'relative',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <>
            <Header />
            <div style={divStyle}>
                <div className="text-center" style={overlayStyle}>
                    <h1 style={{ color: 'white', margin: '10px 0' }}>Welcome to the Admin Dashboard</h1>
                    <h5 style={{ color: 'white', margin: '10px 0' }}>Complete Home Solutions: Quality Services at Your Fingertips.</h5>
                </div>
            </div>

            <div className='d-flex justify-content-center align-items-center flex-column my-3'>
                <div className='w-75 border shadow p-3'>
                    <Row className="justify-content-around mt-3">
                        <Col className="d-flex flex-column justify-content-center align-items-center mb-3" xs={12} md={4}>
                        <i className="fa-solid fa-user fs-1" /><br />
                            <h4>{user.length}</h4>
                            <h4>Users</h4>
                        </Col>
                        <Col className="d-flex flex-column justify-content-center align-items-center mb-3" xs={12} md={4}>
                            <i className="fa-solid fa-comment fs-1" /><br />
                            <h4>{complaints.length}</h4>
                            <h4>Complaints</h4>
                        </Col>
                        <Col className="d-flex flex-column justify-content-center align-items-center mb-3" xs={12} md={4}>
                            <i className="fa-solid fa-users fs-1 mb-3" />
                            <h4 className='text-center'>{servicers.length}</h4>
                            <h4>Service-Providers</h4>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default AdminDash;
