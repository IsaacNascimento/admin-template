import React from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';

const SidebarContent = ({ onClick }) => (
  <div className="sidebar__content">
    <ul className="sidebar__block">
      <SidebarLink
        icon="home"
        title="Início"
        route="/dashboard"
        onClick={onClick}
      />
      <SidebarLink
        icon="select"
        title="Simulações"
        route="/simulacoes"
        onClick={onClick}
      />
      <SidebarLink
        icon="enter"
        title="Propostas"
        route="/propostas"
        onClick={onClick}
      />
      <SidebarLink
        icon="users"
        title="Clientes"
        route="/clientes"
        onClick={onClick}
      />
      <SidebarLink
        icon="cart"
        title="Produtos"
        route="/produtos"
        onClick={onClick}
      />
      <SidebarLink
        icon="apartment"
        title="Parceiros"
        route="/parceiros"
        onClick={onClick}
      />
      <SidebarLink
        icon="user"
        title="Usuários"
        route="/usuarios"
        onClick={onClick}
      />
      <SidebarLink
        icon="funnel"
        title="Funis de Venda"
        route="/funis/venda"
        onClick={onClick}
      />
    </ul>
  </div>
);

SidebarContent.propTypes = {
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  sidebarCollapse: PropTypes.bool,
};

SidebarContent.defaultProps = {
  sidebarCollapse: false,
};

export default SidebarContent;
