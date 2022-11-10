import React from 'react';
import { Container, Col, Row } from 'reactstrap';
// import ProdutoActionBar from './components/ProdutoActionBar';
import ProdutoForm from './components/ProdutoForm';

const Produto = (props) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Produto</h3>
          <h3 className="page-subhead subhead">
            Adicione um novo produto ou altere suas informações
          </h3>
        </Col>
      </Row>
      {/* <EventoActionBar props={props} /> */}
      <Row>
        <Col md={12}>
          <ProdutoForm isHorizontal={false} isAboveError props={props} />
        </Col>
      </Row>
    </Container>
  );
};

export default Produto;
