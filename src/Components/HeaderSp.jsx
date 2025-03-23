import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function HeaderSp() {
    const [activeLink, setActiveLink] = useState(""); // Track the active link

    // Function to handle setting the active link
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    // Style for the active link with a bottom border
    const activeStyle = {
        borderBottom: '2px solid black', // Change color and thickness as needed
        transform: 'translateY(2px)', // Slight downward translation
        transition: 'transform 0.2s ease, border-bottom-color 0.2s ease', // Smooth animation
    };

    const nav = useNavigate()

    const lgout=()=>{
        nav('/authUser')
        localStorage.clear()
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="px-2" style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
                <Navbar.Brand href="#home">All-In-One</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Link
                            className='text-primary btn'
                            to='/dashservice'
                            onClick={() => handleLinkClick('/dashservice')}
                            style={activeLink === '/dashservice' ? activeStyle : {}}
                        >
                            Home
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/profilesp'
                            onClick={() => handleLinkClick('/profilesp')}
                            style={activeLink === '/profilesp' ? activeStyle : {}}
                        >
                            Profile
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/workstat'
                            onClick={() => handleLinkClick('/workstat')}
                            style={activeLink === '/workstat' ? activeStyle : {}}
                        >
                            Works
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/servicereq'
                            onClick={() => handleLinkClick('/servicereq')}
                            style={activeLink === '/servicereq' ? activeStyle : {}}
                        >
                             Requests
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/workhis'
                            onClick={() => handleLinkClick('/workhis')}
                            style={activeLink === '/workhis' ? activeStyle : {}}
                        >
                            History
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/ratfeedsp'
                            onClick={() => handleLinkClick('/ratfeedsp')}
                            style={activeLink === '/ratfeedsp' ? activeStyle : {}}
                        >
                            Rating & Feedbacks
                        </Link>
                        {/* <Link
                            className='text-primary btn'
                            to='/chatsp'
                            onClick={() => handleLinkClick('/chatsp')}
                            style={activeLink === '/chatsp' ? activeStyle : {}}
                        >
                            chat
                        </Link> */}
                        <button className='btn btn-outline-primary ms-2' onClick={lgout}>LOG OUT</button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default HeaderSp;
