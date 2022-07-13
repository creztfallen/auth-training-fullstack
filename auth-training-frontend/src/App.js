import { Container, Col, Row } from 'react-bootstrap';
import Register from './register';
import Login from './login';

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>React Authentication</h1>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Register />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Login />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
