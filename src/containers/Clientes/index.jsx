import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ClientesList } from './components/ClientesList';

const Clientes = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Clientes</h3>
      </Col>
    </Row>
    <Row>
      <ClientesList props={props} />
    </Row>
  </Container>
);

export default Clientes;
