import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import UserNavbar from '../Components/UserNavbar';
import { Link } from 'react-router-dom';

function ChatUser() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages([...messages, input]);
//       setInput('');
//     }
//   };

  return (
    <>
    {/* <Header /> */}
    <UserNavbar />
    <Container className='my-5'
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        height: '80vh',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header with image and name */}
      <Row>
        <div className='p-3 bg-primary'>
        <Link className='btn' to='/listview'><i className="fa-solid fa-chevron-left text-white " /></Link>
            <img src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" className='rounded-circle me-2' style={{width:'60px' , height:'50px'}} alt="" />
            <span className='fw-bold text-white'>Sharan SK</span>
        </div>
      </Row>

      {/* Messages Display */}
      <Row
        style={{
          flex: 1,
          padding: '10px',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#e1f5fe',
              margin: '8px 0',
              padding: '8px',
              borderRadius: '5px',
            }}
          >
            {msg}
          </div>
        ))}
      </Row>

      {/* Input and Send Button */}
      <Row
        style={{
          padding: '10px',
          backgroundColor: '#fff',
          borderTop: '1px solid #ccc',
        }}
      >
        <Col md={10} xs={9}>
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              marginRight: '8px',
              borderRadius: '5px',
            }}
          />
        </Col>

        <Col md={2} xs={3}>
          <Button className='btn-primary btn rounded'>
            <i className="fa-regular fa-paper-plane" />
          </Button>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default ChatUser;
