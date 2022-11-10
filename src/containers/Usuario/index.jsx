import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { UsuarioForm } from './components/UsuarioForm';

const Usuario = (props) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3>Usuario</h3>
          <h3 className="page-subhead subhead">
            Adicione um novo usuário ou altere suas informações
          </h3>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <UsuarioForm isHorizontal={false} isAboveError props={props} />
        </Col>
      </Row>
    </Container>
  );
};

export default Usuario;
