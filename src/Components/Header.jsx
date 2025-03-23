import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
    
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
                            to='/dashadmin'
                            onClick={() => handleLinkClick('/dashadmin')}
                            style={activeLink === '/dashadmin' ? activeStyle : {}}
                        >
                            Home
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/mnguser'
                            onClick={() => handleLinkClick('/mnguser')}
                            style={activeLink === '/mnguser' ? activeStyle : {}}
                        >
                            Users
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/verify'
                            onClick={() => handleLinkClick('/verify')}
                            style={activeLink === '/verify' ? activeStyle : {}}
                        >
                            Verify
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/mngsp'
                            onClick={() => handleLinkClick('/mngsp')}
                            style={activeLink === '/mngsp' ? activeStyle : {}}
                        >
                            Service Providers
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/mngcat'
                            onClick={() => handleLinkClick('/mngcat')}
                            style={activeLink === '/mngcat' ? activeStyle : {}}
                        >
                            Categories
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/ratfeed'
                            onClick={() => handleLinkClick('/ratfeed')}
                            style={activeLink === '/ratfeed' ? activeStyle : {}}
                        >
                            Rating & Feedbacks
                        </Link>
                        <Link
                            className='text-primary btn'
                            to='/viewcom'
                            onClick={() => handleLinkClick('/viewcom')}
                            style={activeLink === '/viewcom' ? activeStyle : {}}
                        >
                            Complaints
                        </Link>
                        <button className='btn btn-outline-primary ms-2' onClick={lgout}>LOG OUT</button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;
