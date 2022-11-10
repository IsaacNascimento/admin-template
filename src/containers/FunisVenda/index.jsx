import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { FunisList } from './components/FunisList';

const FunisVenda = (props) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Funis de Venda</h3>
        </Col>
      </Row>
      <Row>
        <FunisList props={props} />
      </Row>
    </Container>
  );
};

export default FunisVenda;
