import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import ParceiroForm from './components/ParceiroForm';

const Parceiro = (props) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Parceiro</h3>
          <h3 className="page-subhead subhead">
            Adicione um novo parceiro ou altere suas informações
          </h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <ParceiroForm isHorizontal={false} isAboveError props={props} />
        </Col>
      </Row>
    </Container>
  );
};

export default Parceiro;
