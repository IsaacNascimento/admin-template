import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Spinner, Button } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/pt-br';
import EyeIcon from 'mdi-react/EyeIcon';
import { Link } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import FormField from '@/shared/components/form/FormField';
import SelectField from '@/shared/components/form/Select';
import ReactTableBase from '../../../shared/components/table/ReactTableBase';
import { fetchSearchPropostas } from '../../../redux/actions/propostaActions';
import { fetchParceiroProdutos } from '../../../redux/actions/parceiroProdutoActions';
import { priceFormatter } from '../../../utils/helpers';
import { formatarCpf, telefoneMask } from '../../../utils/helpers';
import { BadgeProposta } from '@/shared/components/Badges';

const colunas = [
  {
    Header: 'Nome',
    accessor: 'cliente',
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
    Header: 'Data',
    accessor: 'createdAt',
    disableGlobalFilter: true,
    width: 80,
  },
  {
    Header: 'Status',
    accessor: 'status',
    disableGlobalFilter: true,
    width: 80,
  },
  {
    Header: 'Produto',
    accessor: 'parceiroProduto',
    disableGlobalFilter: true,
    width: 80,
  },
  {
    Header: 'Valor',
    accessor: 'valor',
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

const PropostasList = () => {
  const dispatch = useDispatch();
  const propostas = useSelector((state) => state.propostas.propostas);
  const totalPages = useSelector((state) => state.propostas.totalPages);
  const totalItems = useSelector((state) => state.propostas.totalItems);
  const isFetching = useSelector((state) => state.propostas.isFetching);
  const parceiroProdutos = useSelector(
    (state) => state.parceiroProdutos.parceiroProdutos
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});
  moment.locale('pt-br');

  const dadosTabela = (propostas) => {
    return propostas.map((proposta) => ({
      cliente: proposta.cliente?.nome,
      cpf: formatarCpf(proposta.cliente?.cpf),
      telCelular: telefoneMask(proposta.cliente?.telCelular),
      createdAt: moment(proposta.createdAt).format('DD/MM/yyyy - HH:mm'),
      status: <BadgeProposta status={proposta.status} />,
      parceiroProduto: proposta.parceiroProduto.produto.nome,
      valor: `${priceFormatter(proposta.valor)}`,
      acao: (
        <Link
          color="primary"
          className="icon-btn success"
          type="button"
          to={`/proposta/${proposta._id}`}
        >
          <EyeIcon />
        </Link>
      ),
    }));
  };

  useEffect(() => {
    dispatch(fetchSearchPropostas(parseInt(page), pageSize, search));
  }, [dispatch, page, pageSize, search]);

  useEffect(() => {
    dispatch(fetchParceiroProdutos());
  }, [dispatch]);

  if (totalPages > 0 && totalPages < page) {
    setPage(totalPages);
  }

  const onSubmit = (data) => {
    const searchForm = {};
    searchForm.search = data.search;
    searchForm.filters = {
      parceiroProduto: data.parceiroProdutoSelect?.value,
    };
    setSearch(searchForm);
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Propostas realizadas</h5>
          </div>
          <div className="search__form">
            <Form onSubmit={onSubmit}>
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
                  <Col xl={3}>
                    <div className="form__form-group">
                      <div className="form__form-group-field">
                        <Field
                          name="parceiroProdutoSelect"
                          component={SelectField}
                          type="text"
                          placeholder="Produto"
                          options={(() =>
                            [].concat(
                              [{ value: '', label: 'Todos' }],
                              parceiroProdutos.map((item) => ({
                                value: `${item.id}`,
                                label: `${item.parceiro.nome} - ${item.produto.nome}`,
                              }))
                            ))()}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={3} md={4} className="align-self-end text-end">
                    <Button color="primary" type="submit" className="btn-sm">
                      Pesquisar
                    </Button>
                  </Col>
                </form>
              )}
            </Form>
          </div>
          {isFetching && <Spinner className="table-fetch-spinner" />}
          {propostas && !isFetching && (
            <ReactTableBase
              key={'common'}
              columns={colunas}
              data={dadosTabela(propostas)}
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

export default PropostasList;
