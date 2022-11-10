import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Spinner } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/pt-br';
import { priceFormatter } from '../../../utils/helpers';
import { formatarCpf, telefoneMask } from '../../../utils/helpers';
import { getProposta } from '../../../redux/actions/propostaActions';

const PropostaDetalhe = ({ props }) => {
  const dispatch = useDispatch();
  const proposta = useSelector((state) => state.propostas.proposta);
  const isFetching = useSelector((state) => state.propostas.isFetching);
  const { id } = props.match.params;
  moment.locale('pt-br');
  console.log(proposta);

  useEffect(() => {
    dispatch(getProposta(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {isFetching && <Spinner className="loading-spinner" />}
      {proposta && !isFetching && (
        <Fragment>
          <Col md={12} lg={6}>
            <Card>
              <CardBody>
                <table className="project-summary__info">
                  <tbody>
                    <tr>
                      <th className="pb-2">Nome:</th>
                      <td className="pb-2 pl-3">{proposta.cliente?.nome}</td>
                    </tr>
                    <tr>
                      <th className="pb-2">CPF:</th>
                      <td className="pb-2 pl-3">
                        {formatarCpf(proposta.cliente?.cpf)}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Telefone:</th>
                      <td className="pb-2 pl-3">
                        {proposta.cliente?.telCelular &&
                          telefoneMask(proposta.cliente?.telCelular)}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Data/Hora:</th>
                      <td className="pb-2 pl-3">
                        {moment(proposta.createdAt).format('DD/MM/YYYY hh:mm')}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Produto:</th>
                      <td className="pb-2 pl-3">
                        {proposta?.parceiro_produto?.produto?.nome}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Valor:</th>
                      <td className="pb-2 pl-3">
                        {priceFormatter(proposta.valor)}
                      </td>
                    </tr>
                    <tr>
                      <th className="pb-2">Número da Proposta:</th>
                      <td className="pb-2 pl-3">{proposta.numero_proposta}</td>
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

export default PropostaDetalhe;
