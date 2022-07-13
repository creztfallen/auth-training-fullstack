import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    const configuration = {
      method: 'post',
      url: 'https://auth-training-app.herokuapp.com/api/v1/login',
      data: {
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        setLogin(true);

        cookies.set('TOKEN', result.data.token, {
          path: '/',
        });
        window.location.href = '/auth';
      })
      .catch((error) => (error = new Error()));
    e.preventDefault();
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address."
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword2">
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

        {login ? (
          <p className="text-success"> You have successfully logged in.</p>
        ) : (
          <p className="text-failure"> You could not log in.</p>
        )}
      </Form>
    </>
  );
}
