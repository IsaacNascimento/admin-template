import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  ButtonToolbar,
  Card,
  CardBody,
  Col,
  Row,
  Spinner,
} from 'reactstrap';
import { Field, Form, FormSpy } from 'react-final-form';
import PropTypes from 'prop-types';
import renderDropZoneField from '@/shared/components/form/DropZone';

import { useDispatch, useSelector } from 'react-redux';
import SelectField from '@/shared/components/form/Select';
import { importClienteCsvFile } from '../../../redux/actions/clienteActions';
import { FetchSearchProcessos } from '../../../redux/actions/processoActions';

const CsvDropDown = ({ isHorizontal }) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});
  const [isRedirect, setIsRedirect] = useState(false);
  const [isFaltaCsv, setIsFaltaCsv] = useState('');

  const isFetching = useSelector((state) => state.clientes.isFetching);
  const isUpdating = useSelector((state) => state.clientes.isUpdating);
  const errorMessage = useSelector((state) => state.clientes.error);
  const processos = useSelector((state) => state.processos.processos);

  useEffect(() => {
    dispatch(FetchSearchProcessos(parseInt(page), pageSize, search));
  }, [dispatch, page, pageSize, search]);

  if (isRedirect && !isFetching && !isUpdating && !errorMessage) {
    return isRedirect && <Redirect to="/clientes" />;
  }

  const handleSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    if (data.files && data.files.length > 0) {
      formData.append('file', data.files[0]);
    }
    if (!data.files?.length > 0) {
      setIsFaltaCsv('Insira um arquivo');
      return;
    }
    formData.append('processoPosVenda', data.processoPosVenda);

    // dispatch(importClienteCsvFile(formData));
    // setIsRedirect(true);
  };

  return (
    <Card className="p-3">
      <CardBody>
        <div className="card__title">
          <h4 className="bold-text">Selecione o arquivo para importar</h4>
        </div>
        {(isFetching || isUpdating) && (
          <Spinner className="table-fetch-spinner" />
        )}
        <Form
          onSubmit={handleSubmit}
          initialValues={{
            processoPosVenda: processos[0] ? processos[0]._id : '',
          }}
          render={({ handleSubmit, form }) => {
            formRef.current = form;
            return (
              <form
                className={`form ${isHorizontal && 'form--horizontal'}`}
                onSubmit={handleSubmit}
              >
                <FormSpy
                  subscription={{ values: true }}
                  onChange={(props) => {
                    setIsFaltaCsv('');
                  }}
                />

                <Col lg={8}>
                  <div className="form__form-group">
                    {errorMessage ? (
                      <span className="form__form-group-label text-danger">
                        {errorMessage.message}
                      </span>
                    ) : isFaltaCsv ? (
                      <span className="form__form-group-label text-danger">
                        {isFaltaCsv}
                      </span>
                    ) : (
                      <span className="form__form-group-label ">
                        Base Clientes
                      </span>
                    )}

                    <Field
                      required
                      name="files"
                      component={renderDropZoneField}
                    />
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Adicionar clientes ao funil:
                    </span>
                    <div className="form__form-group-field">
                      <Field
                        name="processoPosVenda"
                        type="text"
                        placeholder={processos[0] ? processos[0].nome : ''}
                        className="form-control mb-2 registration-input-box"
                        component={SelectField}
                        options={processos.map((processo) => ({
                          value: processo._id,
                          label: processo.nome,
                        }))}
                      />
                    </div>
                  </div>
                </Col>
                {/* <Col lg={4} style={{ display: 'grid', placeItems: 'center' }}>
                  {processos.length > 0 &&
                    processos.map((processo) => {
                      return (
                        <Row key={processo._id}>
                          <label>
                            {processo.nome}
                            <Field
                              name="processoPosVenda"
                              component="input"
                              type="radio"
                              value={processo._id}
                            />
                          </label>
                        </Row>
                      );
                    })}
                </Col> */}

                <ButtonToolbar className="form__button-toolbar">
                  <Button color="primary" type="submit" disabled={isFetching}>
                    Importar
                  </Button>
                </ButtonToolbar>
              </form>
            );
          }}
        />
      </CardBody>
    </Card>
  );
};

CsvDropDown.propTypes = {
  isHorizontal: PropTypes.bool,
  isAboveError: PropTypes.bool,
};

CsvDropDown.defaultProps = {
  isHorizontal: false,
  isAboveError: false,
};

export default CsvDropDown;
