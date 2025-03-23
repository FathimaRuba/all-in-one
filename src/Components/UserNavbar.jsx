import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { getCategory } from '../Services/apiService';

const UserNavbar = () => {
    const [cat, setCat] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        };

        const res = await getCategory(headers);
        if (res.status === 200) {
            setCat(res.data);
        }
    };

    const nav = useNavigate();
    const expand = 'false';

    const handlelgOut = () => {
        localStorage.clear();
        nav('/authUser');
    };

    return (
        <Navbar expand={expand} className="bg-body-tertiary mb-3 text-white">
            <Container fluid>
                <Navbar.Brand href="#" className="text-dark">All in One</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    className="bg-primary text-white"
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton className="border text-white m-3" style={{color:'white'}}>
                        <Offcanvas.Title className="text-white p-3" id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <div className="border border-white p-3 mb-3">
                                <Link to="/dashuser" className="text-white" style={{ textDecoration: 'none' }}>Dashboard</Link>
                            </div>
                            <div className="border border-white p-3 mb-3">
                                <Link to="/allbook" className="text-white" style={{ textDecoration: 'none' }}>Bookings</Link>
                            </div>
                            <div className="border border-white p-3 mb-3">
                                <Link to="/complaints" className="text-white" style={{ textDecoration: 'none' }}>Complaints</Link>
                            </div>
                            <div className="border border-white p-2 px-3 mb-3">
                                {cat.length > 0 ? (
                                    <NavDropdown
                                        title="Categories" className='bg-primary'
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                        }}
                                        menuVariant="dark" // Ensures dropdown items have dark styling
                                    >
                                        {cat.map((item, index) => (
                                            <NavDropdown.Item
                                                as={Link}
                                                to={`/listview/${item.name}`}
                                                key={index} className='bg-primary'
                                                style={{
                                                    backgroundColor: '#000000', // Match primary color
                                                    color: 'white',
                                                }}
                                            >
                                                {item.name}
                                            </NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                ) : (
                                    <h3></h3>
                                )}
                            </div>
                            <div className="shadow d-grid mb-3">
                                <button
                                    onClick={handlelgOut}
                                    className="btn btn-danger"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <i
                                        className="fa-solid fa-right-from-bracket"
                                        style={{ color: "#a30505" }}
                                    />
                                    {" "} LogOut
                                </button>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default UserNavbar;
