/*----- Hook Imports -----*/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/*----- Component Imports -----*/
import FormField from '@/shared/components/form/FormField';
import SelectField from '@/shared/components/form/Select';
import SearchIcon from 'mdi-react/SearchIcon';

/*----- Other Imports -----*/
import { Button, ButtonToolbar, Card, CardBody, Spinner } from 'reactstrap';
import { Field, Form, FormSpy } from 'react-final-form';
import {
  createUsuario,
  getUsuario,
  newUsuarioRequest,
  updateUsuario,
} from '../../../redux/actions/usuarioActions';

import { formatFields, telefoneMask } from '../../../utils/helpers';
import { validate } from './validate';

export const UsuarioForm = ({ isHorizontal, isAboveError, props }) => {
  const dispatch = useDispatch();
  const [isRedirect, setIsRedirect] = useState(false);
  const usuario = useSelector((state) => state.usuarios.usuario);
  const isFetching = useSelector((state) => state.clientes.isFetching);
  const isUpdating = useSelector((state) => state.clientes.isUpdating);
  let error = useSelector((state) => state.clientes.error);
  const { id } = props.match.params;
  const isAddMode = !id;
  const formRef = useRef({});

  useEffect(() => {
    if (!isAddMode) {
      dispatch(getUsuario(id));
    } else {
      dispatch(newUsuarioRequest());
    }
  }, [dispatch, id, isAddMode]);

  const onSubmit = (data) => {
    const formData = { ...data, perfil: data.perfil.value };
    isAddMode
      ? dispatch(createUsuario(formData))
      : dispatch(updateUsuario(id, formData));
    setIsRedirect(true);
  };

  if (isRedirect && !isFetching && !isUpdating && !error) {
    return <Redirect to="/usuarios" />;
  }

  const list = [
    { label: 'Administrador', value: 'administrador' },
    { label: 'Operador', value: 'operador' },
    { label: 'Supervisor', value: 'supervisor' },
  ];

  if (usuario) {
    usuario.perfil = list.find((item) => item.value === usuario.perfil);
  }

  return (
    <Card>
      <CardBody>
        <div className="card__title">
          <h4 className="bold-text">{isAddMode ? 'Novo' : 'Editar'} Usuário</h4>
        </div>
        {(isFetching || isUpdating) && (
          <Spinner className="table-fetch-spinner" />
        )}
        {(usuario || isAddMode) && !isFetching && !isUpdating && (
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={isAddMode ? {} : usuario}
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
                    onChange={({ values }) => {
                      const fields = [
                        { name: 'telCelular', mask: telefoneMask },
                      ];
                      formatFields(fields, formRef);
                    }}
                  />
                  <h4 className="page-subhead">Dados Pessoais</h4>
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
                  <div className="form__form-group">
                    <span className="form__form-group-label">Celular</span>
                    <div className="form__form-group-field">
                      <Field
                        name="telCelular"
                        type="string"
                        component={FormField}
                        rules={{ required: 'Campo Obrigatório' }}
                        isAboveError={isAboveError}
                        placeholder="Digite o Telefone (DDD) *****-****"
                        maxLength="15"
                      />
                    </div>
                  </div>
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
                  <div className="form__form-group">
                    <span className="form__form-group-label">Senha</span>
                    <div className="form__form-group-field">
                      <Field
                        name="password"
                        type="password"
                        component={FormField}
                        rules={{ required: true }}
                        isAboveError={isAboveError}
                        placeholder="Digite a Senha"
                        maxLength="6"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Perfil</span>
                    <div className="form__form-group-field">
                      <Field
                        name="perfil"
                        type="text"
                        component={SelectField}
                        className="form-control mb-2 registration-input-box"
                        rules={{ required: true }}
                        isAboveError={isAboveError}
                        placeholder="Selecione um campo"
                        options={list}
                      />
                    </div>
                  </div>
                  <ButtonToolbar className="form__button-toolbar">
                    <Button color="primary" type="submit">
                      Salvar
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsRedirect(true);
                        error = !error;
                      }}
                    >
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
