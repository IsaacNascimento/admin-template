import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import renderCheckBoxField from '@/shared/components/form/CheckBox';
import { Button, ButtonToolbar, Spinner, Card, CardBody } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import FormField from '@/shared/components/form/FormField';
import validate from './validate';
import {
  getProduto,
  createProduto,
  updateProduto,
  newProduto,
} from '@/redux/actions/produtoActions';

const ProdutoForm = ({ isHorizontal, isAboveError, props }) => {
  const dispatch = useDispatch();
  const [isRedirect, setIsRedirect] = useState(false);
  const produto = useSelector((state) => state.produtos.produto);
  const isFetching = useSelector((state) => state.produtos.isFetching);
  const isUpdating = useSelector((state) => state.produtos.isUpdating);
  const error = useSelector((state) => state.produtos.error);
  const { id } = props.match.params;
  const isAddMode = !id;

  const formRef = useRef({});

  useEffect(() => {
    if (!isAddMode) {
      dispatch(getProduto(id));
    } else {
      dispatch(newProduto());
    }
  }, [dispatch, id, isAddMode]);

  const onSubmit = (data) => {
    data.ativo = !!data.ativo;
    const formData = {};
    const fields = Object.keys(data).map((key, i) => key);
    fields.map((item) => (formData[item] = data[item]));
    isAddMode
      ? dispatch(createProduto(formData))
      : dispatch(updateProduto(id, formData));
    setIsRedirect(true);
  };

  if (isRedirect && !isFetching && !isUpdating && !error) {
    return <Redirect to="/produtos" />;
  }

  return (
    <Card>
      <CardBody>
        <div className="card__title">
          <h4 className="bold-text">{isAddMode ? 'Novo' : 'Editar'} Produto</h4>
        </div>
        {(isFetching || isUpdating) && (
          <Spinner className="table-fetch-spinner" />
        )}
        {(produto || isAddMode) && !isFetching && !isUpdating && (
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={isAddMode ? {} : produto}
          >
            {({ handleSubmit, form }) => {
              formRef.current = form;
              return (
                <form
                  className={`form ${isHorizontal && 'form--horizontal'}`}
                  onSubmit={handleSubmit}
                >
                  <div className="form__form-group">
                    <span className="form__form-group-label">Nome</span>
                    <div className="form__form-group-field">
                      <Field
                        name="nome"
                        type="string"
                        component={FormField}
                        rules={{ required: 'Campo Obrigatório' }}
                        isAboveError={isAboveError}
                        placeholder="Digite o Nome"
                        maxlength="100"
                      />
                    </div>
                  </div>
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
                  <ButtonToolbar className="form__button-toolbar">
                    <Button color="primary" type="submit">
                      Salvar
                    </Button>
                    <Button type="button" onClick={() => setIsRedirect(true)}>
                      Cancelar
                    </Button>
                  </ButtonToolbar>
                </form>
              );
            }}
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

ProdutoForm.propTypes = {
  isHorizontal: PropTypes.bool,
  isAboveError: PropTypes.bool,
};

ProdutoForm.defaultProps = {
  isHorizontal: false,
  isAboveError: false,
};

export default ProdutoForm;
