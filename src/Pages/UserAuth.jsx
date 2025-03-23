import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registerApi, loginApi } from '../Services/apiService'; // Assuming you have loginApi

function UserAuth() {

  const nav = useNavigate();
  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState({
    email: '', username: '', password: '', role: ''
  });
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility

  // Toggle between login and register form
  const changeAuth = () => {
    setAuthStatus(!authStatus);
    setUser({
      email: '', password: '', username: '', role: ''
    });
  };

  // Handle login
  const handleLogin = async () => {
    const { email, password } = user;

    if (!email || !password) {
        toast.warning("Please enter valid inputs!");
        return;
    }

    try {
        const res = await loginApi(user); // Call the login API

        if (res?.status === 200) {
            toast.success("Login Successful!");

            const { _id, token, role, username, firstname, lastname, category, location, phone, image, description } = res.data;

            // Store data in localStorage
            localStorage.setItem('userid', _id);
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('firstname', firstname);
            localStorage.setItem('lastname', lastname);
            localStorage.setItem('category', category);
            localStorage.setItem('location', location);
            localStorage.setItem('phone', phone);
            localStorage.setItem('image', image);
            localStorage.setItem('description', description);

            // Navigate based on the role
            switch (role) {
                case 'user':
                    nav('/dashUser');
                    break;
                case 'service-provider':
                    nav('/dashService');
                    break;
                case 'admin':
                    nav('/dashadmin');
                    break;
                default:
                    toast.error("Unknown role, please contact support.");
            }
        } else {
            toast.error("Invalid credentials or account not approved.");
        }
    } catch (err) {
        console.error("Login error:", err);
        if (err.response) {
            toast.error(err.response.data?.error || "Invalid credentials or account not approved.");
        } else {
            toast.error("An unexpected error occurred.");
        }
    }
};




  

  // Handle registration
  const handleRegister = async () => {
    const { email, password, username, role } = user;
    if (!email || !password || !username || !role) {
      toast.warning("Please Enter Valid Inputs!!");
    } else {
      try {
        const res = await registerApi(user);  // Call register API
        if (res.status === 200) {
          toast.success("Registration Successful!");
          setUser({
            email: '', username: '', password: '', role: ''
          });
          changeAuth();
        } else {
          toast.error("Registration Failed!");
        }
      } catch (err) {
        toast.error("Error registering. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-3 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Row>
          <Col sm={12} md={6}>
            <img src="https://img.freepik.com/premium-vector/register-access-login-password-internet-online-website-concept-flat-illustration_385073-108.jpg" className="img-fluid" alt="" />
          </Col>
          <Col sm={12} md={6}>
            <div className="mt-5 justify-content-center flex-column">
              <h2>{authStatus ? 'Register' : 'Login'}</h2>

              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  placeholder="name@example.com"
                />
              </FloatingLabel>

              {authStatus && 
  <FloatingLabel controlId="floatingUsr" label="Username" className="mb-3">
    <Form.Control
      value={user.username}
      onChange={(e) => setUser({ ...user, username: e.target.value })}
      type="text"
      placeholder="name"
    />
  </FloatingLabel>
}

<FloatingLabel controlId="floatingPassword" label="" className="mb-3">
  <div className="position-relative">
    <Form.Control
      value={user.password}
      placeholder='Password'
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      type={showPassword ? 'text' : 'password'}
      style={{ paddingRight: '40px' }}  // More padding to the right for the eye icon
    />
    <span
      className="eye-icon"
      onClick={() => setShowPassword(!showPassword)}
      style={{
        cursor: 'pointer',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1, // Ensures icon is above the input
      }}
    >
      <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ fontSize: '1.2em' }}></i>
    </span>
  </div>
</FloatingLabel>



              {authStatus &&
                <Form.Select aria-label="Default select example" onChange={(e) => setUser({ ...user, role: e.target.value })}>
                  <option>Select Role</option>
                  <option value="user">User</option>
                  <option value="service-provider">Service-Provider</option>
                </Form.Select>
              }

              <div className="d-flex justify-content-between my-3">
                {authStatus ?
                  <button className="btn btn-success" onClick={handleRegister}>Register</button> :
                  <button className="btn btn-info" onClick={handleLogin}>Login</button>
                }

                <button className="btn btn-link" onClick={changeAuth}>
                  {authStatus ? <span>Already a User? Login</span> : <span>New User? Signup</span>}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserAuth;
