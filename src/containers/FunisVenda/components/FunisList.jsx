/*----- Hook Imports -----*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

/*----- Other Imports -----*/
import {
  Col,
  Card,
  CardBody,
  Row,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap';
import { FetchSearchProcessos } from '../../../redux/actions/processoActions';

export const FunisList = () => {
  const dispatch = useDispatch();
  const processos = useSelector((state) => state.processos.processos);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});

  useEffect(() => {
    dispatch(FetchSearchProcessos(parseInt(page), pageSize, search));
  }, [dispatch, page, pageSize, search]);

  return (
    <Col md={12} lg={12} xl={12}>
      <div className="card__title">
        <h5 className="bold-text">Listagem de Funis</h5>
      </div>
      <Row>
        {processos.map((item) => (
          <Col key={item._id} sm={6} md={4} lg={3} xl={3}>
            <Link to={`/funil/venda/${item._id}`}>
              <Card>
                <CardBody>
                  <CardTitle tag="h3">{item.nome}</CardTitle>
                  <CardText>{item.descricao}</CardText>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Col>
  );
};
