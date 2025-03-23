import React, { useState } from 'react';
import HeaderSp from '../Components/HeaderSp';
import { Row, Col, Button, Form } from 'react-bootstrap';

function ChatSp() {
    const [activeChat, setActiveChat] = useState(null);
    const [contacts] = useState([
        { id: 1, name: 'Manu' },
        { id: 2, name: 'Alice' },
        { id: 3, name: 'Bob' },
    ]);
    const [messages, setMessages] = useState({
        1: [{ sender: 'Manu', text: 'Hello!' }],
        2: [{ sender: 'Alice', text: 'Hi, how are you?' }],
        3: [{ sender: 'Bob', text: 'Hey, what’s up?' }],
    });
    const [newMessage, setNewMessage] = useState('');

    const handleChatOpen = (contactId) => {
        setActiveChat(contactId);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && activeChat !== null) {
            setMessages((prevMessages) => ({
                ...prevMessages,
                [activeChat]: [...prevMessages[activeChat], { sender: 'You', text: newMessage }],
            }));
            setNewMessage('');
        }
    };

    return (
        <>
            <HeaderSp />
            <div className="m-3">
                <Row>
                    {/* Left column: Contact list */}
                   
                        <Col md={4} className="border-end">
                        <div className='shadow border rounded-4 p-5' style={{height:'80vh'}}>
                            <h2>Messages</h2>
                            <div className="mt-4">
                                {contacts.map((contact) => (
                                    <div key={contact.id} className="d-flex justify-content-between align-items-center mb-3">
                                        <h5>{contact.name}</h5>
                                        <Button variant="info" onClick={() => handleChatOpen(contact.id)}>Chat</Button>
                                    </div>
                                ))}
                            </div>
                            </div>
                        </Col>
                    

                    {/* Right column: Chat window */}
                    <Col md={8}>
                    <div className='shadow border rounded-4 p-5' style={{height:'80vh'}}>
                        <h2>Chat</h2>
                        <div className="chat-window border p-3 mb-3" style={{ height: '60vh', overflowY: 'auto' }}>
                            {activeChat ? (
                                messages[activeChat].map((message, index) => (
                                    <div key={index} className={message.sender === 'You' ? 'text-end' : 'text-start'}>
                                        <p className="bg-light p-2 rounded" style={{ display: 'inline-block' }}>
                                            <strong>{message.sender}:</strong> {message.text}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Select a contact to start chatting</p>
                            )}
                        </div>
                        {activeChat && (
                            <Form.Group className="d-flex">
                                <Form.Control
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <Button variant="primary" onClick={handleSendMessage} className="ms-2">
                                    Send
                                </Button>
                            </Form.Group>
                        )}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ChatSp;
