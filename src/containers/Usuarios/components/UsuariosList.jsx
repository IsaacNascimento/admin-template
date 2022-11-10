/*----- Hook Imports -----*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/*----- Component Imports -----*/
import FormField from '@/shared/components/form/FormField';
import ReactTableBase from '../../../shared/components/table/ReactTableBase';
import Modal from '../../../shared/components/Modal';

/*----- Other Imports -----*/
import {
  Col,
  Card,
  CardBody,
  Button,
  Spinner,
  ButtonToolbar,
} from 'reactstrap';
import { Field, Form } from 'react-final-form';
import { formatarCpf } from '../../../utils/helpers';
import { Link, useHistory } from 'react-router-dom';
import PlusIcon from 'mdi-react/PlusIcon';
import EditIcon from 'mdi-react/EditIcon';
import TrashIcon from 'mdi-react/TrashIcon';
import {
  fetchSearchUsuarios,
  deleteUsuario,
} from '../../../redux/actions/usuarioActions';
import validate from './validate';
import { useMemo } from 'react';
import SearchIcon from 'mdi-react/SearchIcon';

export const UsuariosList = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios.usuarios);
  const totalItems = useSelector((state) => state.usuarios?.totalItems);
  const isFetching = useSelector((state) => state.usuarios?.isFetching);
  const totalPages = useSelector((state) => state.usuarios?.totalPages);
  const isUpdating = useSelector((state) => state.usuarios?.isUpdating);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});
  const history = useHistory();

  const colunas = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'nome',
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
        Header: 'Telefone',
        accessor: 'telCelular',
        disableGlobalFilter: true,
        width: 80,
      },
      {
        Header: 'Perfil',
        accessor: 'perfil',
        disableGlobalFilter: true,
        width: 80,
      },
      {
        Header: 'Ação',
        accessor: 'acao',
        disableGlobalFilter: true,
        width: 80,
      },
    ],
    []
  );

  const dadosTabela = (usuarios) => {
    return usuarios.map((usuario) => ({
      nome: usuario.nome,
      email: usuario.email,
      telCelular: usuario.telCelular,
      perfil: usuario.perfil,
      acao: (
        <div className="list__icon-btn-group">
          <button
            className="icon-btn success"
            type="button"
            onClick={() => history.push(`/usuario/editar/${usuario._id}`)}
          >
            <EditIcon />
          </button>
          <Modal
            color="danger"
            title="Excluir Usuario"
            accept="Excluir"
            dismiss="Cancelar"
            btn={
              <button className="icon-btn danger" type="button">
                <TrashIcon />
              </button>
            }
            onAccept={async () => {
              await dispatch(deleteUsuario(usuario._id)).then(setPage(0));
            }}
          >
            <span>
              Você realmente deseja excluir <br /> o usuario&nbsp;
              <b>{usuario.nome}</b> permanentemente?
            </span>
          </Modal>
        </div>
      ),
    }));
  };

  useEffect(() => {
    dispatch(fetchSearchUsuarios(parseInt(page), pageSize, search));
  }, [dispatch, page, pageSize, search, isUpdating]);

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
            <h5 className="bold-text">Usuários cadastrados</h5>
            <ButtonToolbar className="list__btn-toolbar-top">
              <Link
                className="btn btn-primary list-btn-add"
                to={'/usuario/novo'}
              >
                <PlusIcon /> Novo Usuário
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
          {usuarios && !isFetching && !isUpdating && (
            <ReactTableBase
              key={'common'}
              columns={colunas}
              data={dadosTabela(usuarios)}
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
