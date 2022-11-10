import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { ClienteForm } from './components/ClienteForm';

const Cliente = (props) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3>Cliente</h3>
          <h3 className="page-subhead subhead">
            Adicione um novo cliente ou altere suas informações
          </h3>
        </Col>
      </Row>
      <Row>
        <Col md={6} xs={10}>
          <ClienteForm isHorizontal={false} isAboveError props={props} />
        </Col>
      </Row>
    </Container>
  );
};

export default Cliente;
