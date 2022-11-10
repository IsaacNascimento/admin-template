import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonToolbar,
  Button,
  Card,
  CardBody,
  Col,
  Spinner,
} from 'reactstrap';
import PlusIcon from 'mdi-react/PlusIcon';
import EditIcon from 'mdi-react/EditIcon';
import TrashIcon from 'mdi-react/TrashIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import { Link, useHistory } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import FormField from '@/shared/components/form/FormField';
import Modal from '@/shared/components/Modal';
import renderSelectField from '@/shared/components/form/Select';
import ReactTableBase from '@/shared/components/table/ReactTableBase';
import {
  fetchSearchParceiros,
  deleteParceiro,
} from '@/redux/actions/parceiroActions';
import { BadgeParceiro } from '../../../shared/components/Badges';
import { listaSituacaoParceiro } from '../../../utils/helpers';

const ParceirosList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const parceiros = useSelector((state) => state.parceiros.parceiros);
  const totalPages = useSelector((state) => state.parceiros.totalPages);
  const totalItems = useSelector((state) => state.parceiros.totalItems);
  const isFetching = useSelector((state) => state.parceiros.isFetching);
  const isUpdating = useSelector((state) => state.parceiros.isUpdating);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});

  const colunas = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'nome',
        disableGlobalFilter: true,
        width: 50,
      },
      {
        Header: 'Situação',
        accessor: 'ativo',
        disableGlobalFilter: true,
        width: 80,
      },
      {
        Header: 'Código',
        accessor: 'codigo',
        disableGlobalFilter: true,
        width: 80,
      },
      {
        Header: 'Ação',
        accessor: 'acao',
        disableGlobalFilter: true,
        width: 65,
      },
    ],
    []
  );

  const dadosTabela = (parceiros) => {
    return parceiros.map((parceiro) => ({
      nome: parceiro.nome,
      ativo: <BadgeParceiro ativo={parceiro.ativo ? 'ativo' : 'inativo'} />,
      codigo: parceiro.codigo,
      acao: (
        <div className="list__icon-btn-group">
          <button
            className="icon-btn success"
            type="button"
            onClick={() => history.push(`/parceiro/editar/${parceiro._id}`)}
          >
            <EditIcon />
          </button>
          <Modal
            color="danger"
            title="Excluir Evento"
            accept="Excluir"
            dismiss="Cancelar"
            btn={
              <button className="icon-btn danger" type="button">
                <TrashIcon />
              </button>
            }
            onAccept={async () => {
              await dispatch(deleteParceiro(parceiro.id)).then(setPage(0));
            }}
          >
            <span>
              Você realmente deseja excluir <br /> o parceiro&nbsp;
              <b>{parceiro.nome}</b> permanentemente?
            </span>
          </Modal>
        </div>
      ),
    }));
  };
  useEffect(() => {
    dispatch(fetchSearchParceiros(parseInt(page), pageSize, search));
  }, [dispatch, page, pageSize, search, isUpdating]);

  if (totalPages > 0 && totalPages < page) {
    setPage(totalPages);
  }

  const onSubmit = (data) => {
    const searchForm = {};
    searchForm.search = data.search;
    searchForm.filters = {
      ativo: data.ativoSelect?.value,
    };
    setSearch(searchForm);
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Parceiros cadastrados</h5>
            <ButtonToolbar className="list__btn-toolbar-top">
              <Link
                className="btn btn-primary list__btn-add"
                to="/parceiro/novo"
              >
                <PlusIcon /> Novo parceiro
              </Link>
            </ButtonToolbar>
          </div>
          <div className="search__form">
            <Form onSubmit={onSubmit}>
              {({ handleSubmit, form: { submitting } }) => (
                <form
                  className={`form form--horizontal'}`}
                  onSubmit={handleSubmit}
                >
                  <Col xl={4}>
                    <div className="form__form-group">
                      <div className="form__form-group-field">
                        <Field
                          name="search"
                          type="text"
                          component={FormField}
                          placeholder="Pesquisa..."
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={3}>
                    <div className="form__form-group">
                      <div className="form__form-group-field">
                        <Field
                          name="ativoSelect"
                          component={renderSelectField}
                          type="text"
                          placeholder="Situação"
                          options={(() =>
                            [].concat(
                              [{ value: undefined, label: 'Todos' }],
                              listaSituacaoParceiro
                            ))()}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4} className="align-self-end text-end">
                    <Button color="primary" type="submit" className="btn-sm">
                      <SearchIcon /> Pesquisar
                    </Button>
                  </Col>
                </form>
              )}
            </Form>
          </div>
          {(isFetching || isUpdating) && (
            <Spinner className="table-fetch-spinner" />
          )}
          {parceiros && !isFetching && !isUpdating && (
            <ReactTableBase
              key={'common'}
              columns={colunas}
              data={dadosTabela(parceiros)}
              tableConfig={{
                isEditable: false,
                isResizable: false,
                isSortable: false,
                withDragAndDrop: false,
                withPagination: true,
                withSearchEngine: false,
                manualPageSize: [10, 20, 30, 40],
                placeholder: 'Search by First name...',
              }}
              setPage={setPage}
              setPageSize={setPageSize}
              currentpage={page}
              pageSize={pageSize}
              totalPages={totalPages}
              totalItems={totalItems}
            />
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default ParceirosList;
