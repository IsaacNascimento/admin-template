import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { UsuariosList } from './components/UsuariosList';

const Usuarios = (props) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Usuarios</h3>
        </Col>
      </Row>
      <Row>
        <UsuariosList props={props} />
      </Row>
    </Container>
  );
};

export default Usuarios;
