import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserNavbar from '../Components/UserNavbar';
import { getCategory } from '../Services/apiService';
import base_url from '../Services/base_url';

function UserDash() {

  const [cat, setCat] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    }

    const res = await getCategory(headers)
    console.log(res)
    if (res.status == 200) {
      setCat(res.data)
    }
  }

  const divStyle = {
    backgroundImage: `url('https://thumbnails.production.thenounproject.com/pWrMjWlaRAsM5o7A9UrHTkWlI1U=/fit-in/1000x1000/photos.production.thenounproject.com/photos/A0A14528-398D-4A47-9494-5038CD72B0B6.jpg')`, // Use your image URL
    backgroundSize: 'cover', // Cover the entire div
    backgroundPosition: 'center', // Center the image
    height: '600px', // Set a height
    width: '100%', // Set the width
    position: 'relative', // Positioning context for the overlay
  };

  const overlayStyle = {
    position: 'absolute', // Position the overlay on top of the image
    top: 0, // Align to the top
    left: 0, // Align to the left
    right: 0, // Stretch to the right
    bottom: 0, // Stretch to the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    display: 'flex', // Flexbox for centering content
    flexDirection: 'column', // Stack the headings in a column
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  };

  return (
    <>
      <UserNavbar />
      <div style={divStyle}>
        <div className='text-center' style={overlayStyle}>
          <h1 style={{ color: 'white', margin: '10px 0' }}>Welcome to All In One</h1>
          <h5 style={{ color: 'white', margin: '10px 0' }}>"Explore, Manage, and Access All Services in One Click!"</h5>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-column my-3">
        <div className="w-75 border shadow p-3">
          {/* <h4 className='text-center my-2'>Category</h4> */}
          <Row className="justify-content-around mt-3">
            {/* Example Category 1 */}
            {
              cat.length > 0 ?
                cat.map((item) => (
                  <Col className="d-flex flex-column justify-content-center align-items-center mb-3" xs={12} md={3}>
                    <Link to={`/listview/${item.name}`} style={{ textDecoration: 'none' }}><img
                      src={`${base_url}/uploads/${item.image}`}
                      alt="img"
                      className="rounded-circle"
                      style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                    />
                      <h5 className="mt-2">{item.name}</h5></Link>
                  </Col>
                ))
                :
                <h3>No Categories Available</h3>
            }
          </Row>
        </div>
      </div>
    </>
  )
}

export default UserDash