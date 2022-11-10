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
import { fetchSearchSimulacoes } from '../../../redux/actions/simulacaoActions';
import validate from './validate';
import { listaTipoProduto } from '../../../utils/helpers';
import { priceFormatter } from '../../../utils/helpers';
import { formatarCpf, telefoneMask } from '../../../utils/helpers';

const colunas = [
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
    Header: 'Produto',
    accessor: 'parceiroProduto',
    disableGlobalFilter: true,
    width: 80,
  },
  {
    Header: 'Valor',
    accessor: 'valorSolicitado',
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

const SimulacoesList = () => {
  const dispatch = useDispatch();
  const simulacoes = useSelector((state) => state.simulacoes.simulacoes);
  const totalPages = useSelector((state) => state.simulacoes.totalPages);
  const totalItems = useSelector((state) => state.simulacoes.totalItems);
  const isFetching = useSelector((state) => state.simulacoes.isFetching);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});
  moment.locale('pt-br');
  const dadosTabela = (simulacoes) => {
    return simulacoes.map((simulacao) => ({
      cpf: formatarCpf(simulacao.cpf),
      telCelular: telefoneMask(simulacao.telCelular),
      createdAt: moment(simulacao.createdAt).format('DD/MM/yyyy - HH:mm'),
      parceiroProduto: simulacao?.parceiroProduto?.produto?.nome,
      valorSolicitado: `${priceFormatter(simulacao.valorSolicitado)}`,
      acao: (
        <Link
          color="primary"
          className="icon-btn success"
          type="button"
          to={`/simulacao/${simulacao._id}`}
        >
          <EyeIcon />
        </Link>
      ),
    }));
  };

  useEffect(() => {
    dispatch(fetchSearchSimulacoes(parseInt(page), pageSize, search));
  }, [dispatch, page, pageSize, search]);

  if (totalPages > 0 && totalPages < page) {
    setPage(totalPages);
  }

  const onSubmit = (data) => {
    const searchForm = {};
    searchForm.search = data.search;
    searchForm.filters = {
      parceiroProduto: data.produtoSelect?.value,
    };
    setSearch(searchForm);
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Simulações realizadas</h5>
          </div>
          <div className="search__form">
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
                  <Col xl={3}>
                    <div className="form__form-group">
                      <div className="form__form-group-field">
                        <Field
                          name="produtoSelect"
                          component={SelectField}
                          type="text"
                          placeholder="Produto"
                          options={(() =>
                            [].concat(
                              [{ value: undefined, label: 'Todos' }],
                              listaTipoProduto
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
          {simulacoes && !isFetching && (
            <ReactTableBase
              key={'common'}
              columns={colunas}
              data={dadosTabela(simulacoes)}
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

export default SimulacoesList;
