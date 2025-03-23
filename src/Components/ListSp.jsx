import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import base_url from '../Services/base_url';

function ListSp({ serviceProviders }) {

    useEffect(()=>{
        console.log('Listing',serviceProviders)
    },[serviceProviders])

    return (
        <>
            {/* <UserNavbar /> */}
            <div className="w-100 w-md-75 p-md-5 rounded-4 shadow mx-0" >
                <div className="mb-3">
                    <div className='d-flex justify-content-center'>
                        <input type="text" placeholder='Enter Location To Search' className='rounded-3 w-50 mb-3 form-control' />
                    </div>
                    {
                        serviceProviders.length > 0 ?
                            <Row className='w-100 border rounded d-flex flex-md-row p-1'>
                                {/* Profile Image Column */}
                                {
                                    serviceProviders.map(item => (
                                        <>
                                            <Col xs={4} md={3} className="d-flex justify-content-center align-items-center">
                                                <div className="my-3">
                                                    <div className="mx-auto" style={{ maxWidth: '100vw' }}>
                                                        <img
                                                            src={`${base_url}/uploads/${item.image}`}
                                                            alt="Profile"
                                                            className="img-fluid shadow"
                                                            style={{
                                                                objectFit: 'cover',
                                                                width: '100%',
                                                                height: 'auto',
                                                                maxHeight: '40vh',
                                                                borderRadius: '10%'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>


                                            <Col xs={8} md={8} className="d-flex flex-column justify-content-center my-3">
                                                <div>
                                                    <div className='text-white mb-4 d-flex flex-wrap'>
                                                        <div className='mb-2'><span className='me-2 bg-info p-1 px-2 rounded' style={{ width: '100px' }}>Electrician</span></div>
                                                        <div className='mb-1'>
                                                            <Link to="/ratfeeduser" className="bg-warning text-white px-2 text-center p-1 rounded text-decoration-none w-100 w-sm-auto" style={{ maxWidth: '100px' }}>
                                                                <i className="fa-solid fa-star" /> 4.3
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <h3>{item.firstname}{item.lastname}</h3>
                                                    <h5>{item.location}</h5>
                                                    <h5>{item.phone}</h5>
                                                    <p style={{ lineHeight: '1.4', fontSize: '1rem', textAlign: 'justify' }}>
                                                        {item.description}
                                                    </p>
                                                    <div className="d-flex justify-content-start">
                                                        <Link to="/chatuser" className="btn btn-primary mt-2 me-3">Chat</Link>
                                                        <Link to="/booksp" className="btn btn-success mt-2">Book</Link>
                                                    </div>
                                                </div>
                                            </Col>
                                        </>
                                    ))
                                }

                            </Row>
                            :
                            <h3>No Service Providers Available In This Category</h3>
                    }
                </div>
            </div>
        </>
    );
}

export default ListSp;
