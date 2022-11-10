/*----- Hook Imports -----*/
import React, { useEffect } from 'react';

/*----- Component Imports -----*/
import Board from '@asseinfo/react-kanban';
import { Col, Spinner } from 'reactstrap';
import { BadgePropostaPosVenda } from '../../../shared/components/Badges';
import { OpenModal } from './ModalProposta';

/*----- Other Imports -----*/
import { useDispatch, useSelector } from 'react-redux';
import { getProcesso } from '../../../redux/actions/processoActions';
import { searchPropostaPosVenda } from '../../../redux/actions/propostaPosVendaAction';
import moment from 'moment';

export const FunilDetail = ({ props }) => {
  const processo = useSelector((state) => state.processos.processo);
  const isFetchingProcesso = useSelector((state) => state.processos.isFetching);
  const isFetchingPropostas = useSelector(
    (state) => state.propostaPosVendas.isFetching
  );
  const propostasPosVenda = useSelector(
    (state) => state.propostaPosVendas.propostaPosVendas
  );
  console.log(useSelector((state) => state.propostaPosVendas));
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getProcesso(id));
    dispatch(
      searchPropostaPosVenda(1, 9999, { filters: { processoPosVenda: id } })
    );
  }, [dispatch, id]);

  const getPropostasEtapa = (etapa) => {
    return propostasPosVenda
      .filter((propostaPosVenda) => propostaPosVenda.etapaAtual === etapa)
      .map((item, id) => ({
        id: id,
        title: `${item.cliente.nome} ${id}`,
        description: (
          <div key={id}>
            <BadgePropostaPosVenda status={item.status} />
            <div className="my-2">
              <p>
                Hora atualização:{' '}
                {moment(item.updatedAt).format('DD/MM/YYYY HH:mm')}
              </p>
              <p>Benefícios: {item.beneficios.length}</p>
            </div>
            <div>
              <OpenModal propostaPosVenda={item} key={id} />
            </div>
          </div>
        ),
      }));
  };

  const board = {
    columns:
      processo.etapas?.map((etapa, id) => ({
        id: id,
        title: etapa,
        cards: getPropostasEtapa(etapa),
      })) || [],
  };

  return (
    <Col md={12} lg={12} xl={12}>
      {(isFetchingProcesso || isFetchingPropostas) && <Spinner />}
      {!isFetchingProcesso && !isFetchingPropostas && (
        <>
          <div className="card__title">
            <h3 className="page-title">Funil: {processo.nome}</h3>
          </div>
          <Board disableColumnDrag disableCardDrag initialBoard={board} />
        </>
      )}
    </Col>
  );
};
