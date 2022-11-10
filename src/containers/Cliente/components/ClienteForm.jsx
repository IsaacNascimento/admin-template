/*----- Hook Imports -----*/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import renderCheckBoxField from '@/shared/components/form/CheckBox';

/*----- Component Imports -----*/
import { validate } from './validate';
import FormField from '@/shared/components/form/FormField';
import SelectField from '@/shared/components/form/Select';
import SearchIcon from 'mdi-react/SearchIcon';

/*----- Other Imports -----*/
import {
  Button,
  ButtonToolbar,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from 'reactstrap';
import { Field, Form, FormSpy } from 'react-final-form';
import {
  agenciaMask,
  bancoMask,
  cepMask,
  formatarConta,
  formatarCpf,
  formatFields,
  listaUF,
  telefoneMask,
} from '../../../utils/helpers';
import {
  createCliente,
  getCliente,
  newClienteRequest,
  updateCliente,
} from '@/redux/actions/clienteActions';
import { getListaFgtsBancoPan } from '../../../redux/actions/utilActions';
import PropTypes from 'prop-types';
import { getCEP, newCep } from '../../../redux/actions/cepActions';
import useInit from './useInit';

const formFields = [
  'cep',
  'uf',
  'cidade',
  'bairro',
  'logradouro',
  'complemento',
  'numero',
];

export const ClienteForm = ({ isHorizontal, isAboveError, props }) => {
  const dispatch = useDispatch();
  const [isRedirect, setIsRedirect] = useState(false);
  const cep = useSelector((state) => state.cep.cep);
  const cepIsFetching = useSelector((state) => state.cep.isFetching);
  const cliente = useSelector((state) => state.clientes.cliente);
  const isFetching = useSelector((state) => state.clientes.isFetching);
  const isUpdating = useSelector((state) => state.clientes.isUpdating);
  const bancoList = useSelector((state) => state.util.listaFgtsBancoPan);
  const error = useSelector((state) => state.clientes.error);
  const { id } = props.match.params;
  const isAddMode = !id;
  const formRef = useRef({});

  useEffect(() => {
    if (!isAddMode) {
      dispatch(getCliente(id));
    } else {
      dispatch(newClienteRequest());
    }
  }, [dispatch, id, isAddMode]);

  useInit(() => () => dispatch(newCep));

  useEffect(() => {
    dispatch(getListaFgtsBancoPan());
  }, [dispatch]);

  useEffect(() => {
    if (!formRef?.current || !cep || cep.erro) return;
    formRef.current.change('cep', cep.cep);
    formRef.current.change('logradouro', cep.logradouro);
    formRef.current.change('cidade', cep.localidade);
    formRef.current.change('ufSelect', { value: cep.uf, label: cep.uf });
    formRef.current.change('bairro', cep.bairro);
    formRef.current.change('complemento', cep.complemento);
  }, [cep]);

  const submitCep = () => {
    let { value, valid } = formRef.current.getFieldState('cep');
    if (!valid) return;
    dispatch(getCEP(value));
  };

  if (!cliente.ufSelect) {
    const UF = listaUF.find((item) => item === cliente.uf);
    cliente.ufSelect = { value: UF, label: UF };
  }

  const onSubmit = (data) => {
    const formData = {};
    const fields = Object.keys(data).map((key, i) => key);
    fields.map((item) => (formData[item] = data[item]));
    isAddMode
      ? dispatch(createCliente(formData))
      : dispatch(updateCliente(id, formData));
    setIsRedirect(true);
  };

  const navegar = isRedirect && !isFetching && !isUpdating && !error;
  if (navegar) {
    return <Redirect to="/clientes" />;
  }

  return (
    <Card>
      <CardBody>
        <div className="card__title">
          <h4 className="bold-text">{isAddMode ? 'Novo' : 'Editar'} Cliente</h4>
        </div>
        {(isFetching || isUpdating) && (
          <Spinner className="table-fetch-spinner" />
        )}
        {(cliente || isAddMode) && !isFetching && !isUpdating && (
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={isAddMode ? {} : cliente}
          >
            {({
              handleSubmit,
              form,
              form: { reset, pristine, submitting },
            }) => {
              formRef.current = form;
              return (
                <form
                  className={`form ${isHorizontal && 'form--horizontal'}`}
                  onSubmit={handleSubmit}
                >
                  <FormSpy
                    subscription={{ values: true }}
                    onChange={(props) => {
                      props.values.cep &&
                        formRef.current.change(
                          'cep',
                          cepMask(props.values.cep)
                        );
                      const fieldsToFormat = [
                        { name: 'cpf', mask: formatarCpf },
                        { name: 'telCelular', mask: telefoneMask },
                        { name: 'banco', mask: bancoMask },
                        { name: 'agencia', mask: agenciaMask },
                        { name: 'conta', mask: formatarConta },
                      ];
                      formatFields(fieldsToFormat, formRef);
                    }}
                  />
                  <Container fluid className="m-0 p-0">
                    <Row>
                      <Col xs={12}>
                        <h4 className="page-subhead">Dados Pessoais</h4>
                      </Col>
                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Nome</span>
                          <div className="form__form-group-field">
                            <Field
                              name="nome"
                              component={FormField}
                              type="string"
                              rules={{ required: 'Campo Obrigatório' }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Nome"
                              maxLength="100"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">CPF</span>
                          <div className="form__form-group-field">
                            <Field
                              name="cpf"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o CPF"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Telefone
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="telCelular"
                              type="string"
                              component={FormField}
                              rules={{ required: true }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Telefone (DDD) *****-****"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Data de Nascimento
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="data"
                              type="date"
                              placeholder="dd/mm/aaaa – hh:mm"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={7}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Email</span>
                          <div className="form__form-group-field">
                            <Field
                              name="email"
                              type="email"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Email"
                              maxLength="70"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xl={5}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Senha</span>
                          <div className="form__form-group-field">
                            <Field
                              name="password"
                              type="password"
                              component={FormField}
                              rules={{ required: true }}
                              isAboveError={isAboveError}
                              placeholder="Digite sua Senha"
                              maxLength="6"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <h4 className="page-subhead">Endereço</h4>
                      </Col>

                      <Col xl={12}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">CEP</span>
                          <div className="form__form-group-field">
                            <Field
                              name="cep"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o CEP"
                            />
                            <Button
                              className="btn btn-outline py-1 "
                              type="submit"
                              onClick={submitCep}
                              disabled={cepIsFetching}
                            >
                              <SearchIcon />
                            </Button>
                          </div>
                        </div>
                      </Col>

                      <Col xl={7}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Logradouro
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="logradouro"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Logradouro"
                              maxLength="11"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={5}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Número</span>
                          <div className="form__form-group-field">
                            <Field
                              name="numero"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Número"
                              maxLength="15"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Complemento
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="complemento"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Complemento"
                              maxLength="100"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Bairro</span>
                          <div className="form__form-group-field">
                            <Field
                              name="bairro"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Bairro"
                              maxLength="50"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xl={8}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Cidade</span>
                          <div className="form__form-group-field">
                            <Field
                              name="cidade"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite a Cidade"
                              maxLength="50"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">UF</span>
                          <div className="form__form-group-field">
                            <Field
                              name="ufSelect"
                              type="text"
                              placeholder="DF"
                              className="form-control mb-2 registration-input-box"
                              component={SelectField}
                              options={listaUF.map((uf) => ({
                                value: uf,
                                label: uf,
                              }))}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <h4 className="page-subhead">Dados Bancários</h4>
                      </Col>

                      <Col xl={12}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Banco</span>
                          <div className="form__form-group-field">
                            <Field
                              name="bancoSelect"
                              type="text"
                              component={SelectField}
                              rules={{ required: false }}
                              placeholder="Digite o código, nome ou selecione o seu banco na lista.."
                              options={bancoList?.BANCO?.map((item) => ({
                                label: item.label,
                              }))}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Agência
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="agencia"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite a Agência"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Conta</span>
                          <div className="form__form-group-field">
                            <Field
                              name="conta"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Número da Conta"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={12}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Tipo de Conta
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="tipoContaSelect"
                              type="text"
                              component={SelectField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Selecione o seu tipo de conta na lista"
                              options={bancoList?.TIPO_CONTA?.map((item) => ({
                                label: item.label,
                              }))}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <h4 className="page-subhead">Dados Complementares</h4>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Doc. de Identidade
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="identidade"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Doc. de Identidade"
                              maxLength="20"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Data emissão identidade
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="dataEmissao"
                              type="date"
                              placeholder="dd/mm/aaaa – hh:mm"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={8}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Nacionalidade
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="nacionalidade"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite a Nacionalidade"
                              maxLength="50"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col>
                        <div className="form__form-group">
                          <span className="form__form-group-label">PEP?</span>
                          <div className="form__form-group-field">
                            <Field
                              name="ativo"
                              component={renderCheckBoxField}
                              label="Ativo"
                              type="checkbox"
                              className="mb-0 mt-2"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Valor Renda Mensal
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="rendaMensal"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite a Renda Mensal"
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Número Benefício INSS
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="numeroBeneficioINSS"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite o Número Benefício INSS"
                              maxLength="15"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="form__form-group">
                          <span className="form__form-group-label">
                            Situação INSS
                          </span>
                          <div className="form__form-group-field">
                            <Field
                              name="situcaoINSS"
                              type="string"
                              component={FormField}
                              rules={{ required: false }}
                              isAboveError={isAboveError}
                              placeholder="Digite a Renda Mensal"
                              maxLength="15"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <ButtonToolbar className="form__button-toolbar">
                      <Button color="primary" type="submit">
                        Salvar
                      </Button>
                      <Button type="button" onClick={() => setIsRedirect(true)}>
                        Cancelar
                      </Button>
                    </ButtonToolbar>
                  </Container>
                </form>
              );
            }}
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

ClienteForm.propTypes = {
  isHorizontal: PropTypes.bool,
  isAboveError: PropTypes.bool,
};
ClienteForm.defaultProps = {
  isHorizontal: false,
  isAboveError: false,
};
