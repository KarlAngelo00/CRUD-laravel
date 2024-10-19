import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login() {
  //State to hold login credentials
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  //Navigation hook to redirect the user on successful login
  const navigate = useNavigate();

  //Handle function for login action
  const handleLogin = () => {
    //Simple hardcoded login logic for demonstration purposes
    if (credentials.username === 'admin' && credentials.password === 'password123') {
      //Redirecting to the dashboard upon successful login
      navigate('/dashboard');
    } else {
      //Displaying an alert on login failure
      alert('Invalid username or password');
    }
  };

  return (
    //Container for centering the login form vertically and horizontally
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          {/*Login form title*/}
          <h2 className="text-center mb-4" style={{ color: '#4b4b4b' }}>Login</h2>
          
          <Form>
            {/*Username field*/}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </Form.Group>

            {/*Password field*/}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </Form.Group>

            {/*Login button*/}
            <Button className="w-100" variant="primary" onClick={handleLogin}>Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
