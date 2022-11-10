import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CsvDropDown from './components/CsvDropDown';

const ClientesBase = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Importar base de clientes</h3>
      </Col>
    </Row>
    <Row>
      <CsvDropDown isHorizontal={false} isAboveError props={props} />
    </Row>
  </Container>
);

export default ClientesBase;
