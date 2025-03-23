// ServiceDash.js
import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import HeaderSp from '../Components/HeaderSp';
import { getWorkContext } from '../context/WorkContext';
import { getReqContext } from '../context/ReqContext';
import { RatingContext } from '../context/Avgrating'; // Import RatingContext

function ServiceDash() {
    const { works } = useContext(getWorkContext); // Example of using other context
    const { req } = useContext(getReqContext); // Example of using other context
    const { averageRating } = useContext(RatingContext); // Consume RatingContext

    const divStyle = {
        backgroundImage: `url('https://thumbnails.production.thenounproject.com/pWrMjWlaRAsM5o7A9UrHTkWlI1U=/fit-in/1000x1000/photos.production.thenounproject.com/photos/A0A14528-398D-4A47-9494-5038CD72B0B6.jpg')`, // Use your image URL
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
            <HeaderSp />
            <div style={divStyle}>
                <div className='text-center' style={overlayStyle}>
                    <h1 style={{ color: 'white', margin: '10px 0' }}>Welcome to All In One</h1>
                    <h5 style={{ color: 'white', margin: '10px 0' }}>One app, endless possibilities. Take control of your bookings, client management, and more!</h5>
                </div>
            </div>

            <div className='d-flex justify-content-center align-items-center flex-column my-3'>
                <div className='w-75 border shadow p-3'>
                    <Row className="justify-content-around mt-3">
                        <Col className="d-flex flex-column justify-content-center align-items-center mb-3" xs={12} md={4}>
                            <i className="fa-regular fa-user fs-1" /><br />
                            <h4>{req.length}</h4>
                            <h4>Requests</h4>
                        </Col>
                        <Col className="d-flex flex-column justify-content-center align-items-center mb-3" xs={12} md={4}>
                            <i className="fa-solid fa-list-check fs-1" /> <br />          
                            <h4>{works.length}</h4>
                            <h4>Works</h4>
                        </Col>
                        <Col className="d-flex flex-column justify-content-center align-items-center mb-3" xs={12} md={4}>
                            <i className="fa-regular fa-star fs-1" /><br />
                            <h4>{averageRating}</h4>
                            <h4>Ratings</h4>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default ServiceDash;
