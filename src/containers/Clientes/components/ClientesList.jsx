import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Card,
  CardBody,
  Button,
  Spinner,
  ButtonToolbar,
  Modal,
} from 'reactstrap';
import { Field, Form } from 'react-final-form';
import { Link, useHistory } from 'react-router-dom';
import PlusIcon from 'mdi-react/PlusIcon';
import EditIcon from 'mdi-react/EditIcon';
import TrashIcon from 'mdi-react/TrashIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import UploadIcon from 'mdi-react/UploadIcon';
import validate from './validate';
import FormField from '@/shared/components/form/FormField';
import ReactTableBase from '../../../shared/components/table/ReactTableBase';
import { formatarCpf } from '../../../utils/helpers';
import { fetchSearchClientes } from '../../../redux/actions/clienteActions';

const colunas = [
  {
    Header: 'Nome',
    accessor: 'nome',
    disableGlobalFilter: true,
    width: 80,
  },
  {
    Header: 'CPF',
    accessor: 'cpf',
    disableGlobalFilter: true,
    width: 80,
  },
  {
    Header: 'Telefone',
    accessor: 'telCelular',
    disableGlobalFilter: true,
    width: 80,
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableGlobalFilter: true,
    width: 80,
  },
  {
    Header: 'Ação',
    accessor: 'acao',
    disableGlobalFilter: true,
    width: 80,
  },
];

export const ClientesList = () => {
  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.clientes.clientes);
  const totalItems = useSelector((state) => state.clientes.totalItems);
  const isFetching = useSelector((state) => state.clientes.isFetching);
  const totalPages = useSelector((state) => state.clientes.totalPages);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});

  const history = useHistory();

  const dadosTabela = (clientes) => {
    return clientes.map((cliente) => ({
      nome: cliente.nome,
      cpf: formatarCpf(cliente.cpf),
      telCelular: cliente.telCelular,
      email: cliente.email,
      acao: (
        <div className="list__icon-btn-group">
          <button
            className="icon-btn success"
            type="button"
            onClick={() => history.push(`/cliente/editar/${cliente._id}`)}
          >
            <EditIcon />
          </button>
          <Modal
            color="danger"
            title="Excluir Cliente"
            accept="Excluir"
            dismiss="Cancelar"
            btn={
              <button className="icon-btn danger" type="button">
                <TrashIcon />
              </button>
            }
          >
            <span>
              Você realmente deseja excluir <br /> o cliente&nbsp;
              <b>{cliente.nome}</b> permanentemente?
            </span>
          </Modal>
        </div>
      ),
    }));
  };

  useEffect(() => {
    dispatch(fetchSearchClientes(parseInt(page), pageSize, search));
  }, [dispatch, page, pageSize, search]);

  if (totalPages > 0 && totalPages < page) {
    setPage(totalPages);
  }
  const onSubmit = (data) => {
    const searchForm = {};
    searchForm.search = data.search;
    setSearch(searchForm);
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Clientes cadastrados</h5>
            <ButtonToolbar className="list__btn-toolbar-top">
              <Link
                className="btn btn-primary list-btn-add"
                to={'/importar-base/clientes'}
              >
                <UploadIcon /> Importar base
              </Link>
              <Link
                className="btn btn-primary list-btn-add"
                to={'/cliente/novo'}
              >
                <PlusIcon /> Novo Cliente
              </Link>
            </ButtonToolbar>
          </div>
          <div className="search_form">
            <Form onSubmit={onSubmit} validate={validate}>
              {({ handleSubmit, form: { submitting } }) => (
                <form
                  className={`form form--horizontal'}`}
                  onSubmit={handleSubmit}
                >
                  <Col md={4}>
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
                  <Col xl={3} md={4} className="align-self-end text-end">
                    <Button color="primary" type="submit" className="btn-sm">
                      <SearchIcon /> Pesquisar
                    </Button>
                  </Col>
                </form>
              )}
            </Form>
          </div>
          {isFetching && <Spinner className="table-fetch-spinner" />}
          {clientes && !isFetching && (
            <ReactTableBase
              key={'common'}
              columns={colunas}
              data={dadosTabela(clientes)}
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
