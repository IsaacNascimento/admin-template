import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProdutosList from './components/ProdutosList';

const Produto = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Produto</h3>
        <h3 className="page-subhead subhead">
          {' '}
          Adicione um novo produto ou altere seu produto
        </h3>
      </Col>
    </Row>
    <Row>
      <ProdutosList props={props} />
    </Row>
  </Container>
);

export default Produto;
