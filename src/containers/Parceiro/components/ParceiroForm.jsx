import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import renderCheckBoxField from '@/shared/components/form/CheckBox';
import {
  Button,
  ButtonToolbar,
  Spinner,
  Card,
  CardBody,
  Col,
  Row,
  Container,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import FormField from '@/shared/components/form/FormField';
import validate from './validate';
import {
  getParceiro,
  createParceiro,
  updateParceiro,
  newParceiro,
} from '@/redux/actions/parceiroActions';

const ParceiroForm = ({ isHorizontal, isAboveError, props }) => {
  const dispatch = useDispatch();
  const [isRedirect, setIsRedirect] = useState(false);
  const parceiro = useSelector((state) => state.parceiros.parceiro);
  const isFetching = useSelector((state) => state.parceiros.isFetching);
  const isUpdating = useSelector((state) => state.parceiros.isUpdating);
  const error = useSelector((state) => state.parceiros.error);
  const { id } = props.match.params;
  const isAddMode = !id;

  const formRef = useRef({});

  useEffect(() => {
    if (!isAddMode) {
      dispatch(getParceiro(id));
    } else {
      dispatch(newParceiro());
    }
  }, [dispatch, id, isAddMode]);

  const onSubmit = (data) => {
    data.ativo = !!data.ativo;
    const formData = {};
    const fields = Object.keys(data).map((key, i) => key);
    fields.map((item) => (formData[item] = data[item]));
    isAddMode
      ? dispatch(createParceiro(formData))
      : dispatch(updateParceiro(id, formData));
    setIsRedirect(true);
  };

  if (isRedirect && !isFetching && !isUpdating && !error) {
    return <Redirect to="/parceiros" />;
  }

  return (
    <Card>
      <CardBody>
        <div className="card__title">
          <h4 className="bold-text">
            {isAddMode ? 'Novo' : 'Editar'} Parceiro
          </h4>
        </div>
        {(isFetching || isUpdating) && (
          <Spinner className="table-fetch-spinner" />
        )}
        {(parceiro || isAddMode) && !isFetching && !isUpdating && (
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={isAddMode ? {} : parceiro}
          >
            {({ handleSubmit, form }) => {
              formRef.current = form;
              return (
                <form
                  className={`form ${isHorizontal && 'form--horizontal'}`}
                  onSubmit={handleSubmit}
                >
                  <Container>
                    <Row>
                      <Col xl={9}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Nome</span>
                          <div className="form__form-group-field">
                            <Field
                              name="nome"
                              type="string"
                              component={FormField}
                              rules={{ required: 'Campo Obrigatório' }}
                              isAboveError={isAboveError}
                              placeholder="Nome"
                              maxLength="100"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xl={4}>
                        <div className="form__form-group">
                          <span className="form__form-group-label">Código</span>
                          <div className="form__form-group-field">
                            <Field
                              name="codigo"
                              type="string"
                              component={FormField}
                              rules={{ required: 'Campo Obrigatório' }}
                              isAboveError={isAboveError}
                              placeholder="Código"
                              maxLength="30"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xl={3} className="d-flex align-items-end">
                        <div className="form__form-group">
                          <div className="form__form-group-field">
                            <Field
                              name="ativo"
                              component={renderCheckBoxField}
                              label="Ativo"
                              type="checkbox"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ButtonToolbar className="form__button-toolbar">
                          <Button color="primary" type="submit">
                            Salvar
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setIsRedirect(true)}
                          >
                            Cancelar
                          </Button>
                        </ButtonToolbar>
                      </Col>
                    </Row>
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

ParceiroForm.propTypes = {
  isHorizontal: PropTypes.bool,
  isAboveError: PropTypes.bool,
};

ParceiroForm.defaultProps = {
  isHorizontal: false,
  isAboveError: false,
};

export default ParceiroForm;
