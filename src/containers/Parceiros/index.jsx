import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ParceirosList from './components/ParceirosList';

const Parceiro = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Parceiros Cadastrados</h3>
        <h3 className="page-subhead subhead">
          {' '}
          Adicione um novo parceiro ou altere seu parceiro
        </h3>
      </Col>
    </Row>
    <Row>
      <ParceirosList props={props} />
    </Row>
  </Container>
);

export default Parceiro;
