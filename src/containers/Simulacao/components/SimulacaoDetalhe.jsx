import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Spinner } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/pt-br';
import { getSimulacao } from '../../../redux/actions/simulacaoActions';
import { priceFormatter } from '../../../utils/helpers';
import { formatarCpf, telefoneMask } from '../../../utils/helpers';

const SimulacaoDetalhe = ({ props }) => {
  const dispatch = useDispatch();
  const simulacao = useSelector((state) => state.simulacoes.simulacao);
  const isFetching = useSelector((state) => state.simulacoes.isFetching);
  const { id } = props.match.params;
  moment.locale('pt-br');

  useEffect(() => {
    dispatch(getSimulacao(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {isFetching && <Spinner className="loading-spinner" />}
      {simulacao && !isFetching && (
        <Fragment>
          <Col md={12} lg={6}>
            <Card>
              <CardBody>
                <table className="project-summary__info">
                  <tbody>
                    <tr>
                      <th className="pb-2">CPF:</th>
                      <td className="pb-2 pl-3">
                        {formatarCpf(simulacao.cpf)}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Telefone:</th>
                      <td className="pb-2 pl-3">
                        {simulacao.telCelular &&
                          telefoneMask(simulacao.telCelular)}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Data de nascimento:</th>
                      <td className="pb-2 pl-3">
                        {simulacao.dataNascimento &&
                          moment(simulacao.dataNascimento).format('DD/MM/YYYY')}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Data/Hora:</th>
                      <td className="pb-2 pl-3">
                        {moment(simulacao.createdAt).format('DD/MM/YYYY hh:mm')}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Produto:</th>
                      <td className="pb-2 pl-3">
                        {simulacao?.parceiroProduto?.produto?.nome}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Parceiro:</th>
                      <td className="pb-2 pl-3">
                        {simulacao?.parceiroProduto?.parceiro?.nome}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Valor:</th>
                      <td className="pb-2 pl-3">
                        {priceFormatter(simulacao.valorSolicitado)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SimulacaoDetalhe;
