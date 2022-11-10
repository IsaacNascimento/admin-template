import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import PropostasList from './components/PropostasList';

const Propostas = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Consultar Propostas</h3>
      </Col>
    </Row>
    <Row>
      <PropostasList />
    </Row>
  </Container>
);

export default Propostas;
