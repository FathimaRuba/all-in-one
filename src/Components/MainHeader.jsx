import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function MainHeader() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="px-2" style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
                <Navbar.Brand href="#home">All-In-One</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Navbar>
        </>
    )
}

export default MainHeader
