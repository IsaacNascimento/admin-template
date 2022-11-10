import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import PropostaDetalhe from './components/PropostaDetalhe';

const Proposta = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Detalhe da Proposta</h3>
      </Col>
    </Row>
    <Row>
      <PropostaDetalhe props={props} />
    </Row>
  </Container>
);

export default Proposta;
