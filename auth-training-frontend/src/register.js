import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    const configuration = {
      method: 'post',
      url: 'https://auth-training-app.herokuapp.com/api/v1/register',
      data: {
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => setRegister(true))
      .catch((error) => (error = new Error()));
    e.preventDefault();
  };

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address."
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>

        {register ? (
          <p className="text-success">You are registered successfully!</p>
        ) : (
          <p className="text-failure">You could not be registered.</p>
        )}
      </Form>
    </>
  );
}
