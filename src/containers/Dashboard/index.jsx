import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Col, Container, Row } from 'reactstrap';
import {
  fetchSearchSimulacoes,
  getStatsSimulacoes,
} from '../../redux/actions/simulacaoActions';
import SimulacoesPorDiaGrafico from './components/simulacoesPorDiaGrafico';

const Dashboard = ({ rtl }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatsSimulacoes());
    dispatch(
      fetchSearchSimulacoes(parseInt(1), 1, {
        dateFilters: {
          createdAt: {
            start: '2022-05-01',
          },
        },
      })
    );
  }, [dispatch]);
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Dashboard</h3>
        </Col>
      </Row>
      <Row>
        <SimulacoesPorDiaGrafico />
      </Row>
    </Container>
  );
};

export default Dashboard;
