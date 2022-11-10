import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import SimulacoesList from './components/SimulacoesList';

const Simulacoes = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Consultar Simulações</h3>
      </Col>
    </Row>
    <Row>
      <SimulacoesList />
    </Row>
  </Container>
);

export default Simulacoes;
