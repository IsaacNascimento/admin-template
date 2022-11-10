import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';
import LogIn from '../Account/LogIn/index';
import ChangePassword from '../Account/ChangePassword/index';
import Dashboard from '../Dashboard/index';
import ResetPassword from '../Account/ResetPassword/index';
import Simulacoes from '../Simulacoes';
import Simulacao from '../Simulacao';
import Produtos from '../Produtos';
import Produto from '../Produto';
import Clientes from '../Clientes';
import ClientesBase from '../ClientesBase';
import Cliente from '../Cliente';
import Parceiros from '../Parceiros';
import Parceiro from '../Parceiro';
import Propostas from '../Propostas';
import Proposta from '../Proposta';
import Usuarios from '../Usuarios';
import Usuario from '../Usuario';
import FunisVenda from '../FunisVenda';
import FunilVenda from '../FunilVenda';

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/simulacoes" component={Simulacoes} />
      <PrivateRoute path="/simulacao/:id" component={Simulacao} />
      <PrivateRoute path="/produtos" component={Produtos} />
      <PrivateRoute path="/produto/novo" component={Produto} />
      <PrivateRoute path="/produto/editar/:id" component={Produto} />
      <PrivateRoute path="/clientes" component={Clientes} />
      <PrivateRoute path="/cliente/novo" component={Cliente} />
      <PrivateRoute path="/cliente/editar/:id" component={Cliente} />
      <PrivateRoute path="/importar-base/clientes" component={ClientesBase} />
      <PrivateRoute path="/parceiros" component={Parceiros} />
      <PrivateRoute path="/parceiro/novo" component={Parceiro} />
      <PrivateRoute path="/parceiro/editar/:id" component={Parceiro} />
      <PrivateRoute path="/propostas" component={Propostas} />
      <PrivateRoute path="/proposta/:id" component={Proposta} />
      <PrivateRoute path="/usuarios" component={Usuarios} />
      <PrivateRoute path="/usuario/novo" component={Usuario} />
      <PrivateRoute path="/usuario/editar/:id" component={Usuario} />
      <PrivateRoute path="/funis/venda" component={FunisVenda} />
      <PrivateRoute path="/funil/venda/:id" component={FunilVenda} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/recuperar-senha" component={ResetPassword} />
        <Route
          exact
          path="/trocar-senha/:reset_password_link"
          component={ChangePassword}
        />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
