import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import SimulacaoDetalhe from './components/SimulacaoDetalhe';

const Simulacao = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Detalhe da simulação</h3>
      </Col>
    </Row>
    <Row>
      <SimulacaoDetalhe props={props} />
    </Row>
  </Container>
);

export default Simulacao;
