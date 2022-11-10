import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { FunilDetail } from './components/FunilDetail';

const FunilVenda = (props) => {
  return (
    <Container>
      <Row>
        <FunilDetail props={props} />
      </Row>
    </Container>
  );
};

export default FunilVenda;
