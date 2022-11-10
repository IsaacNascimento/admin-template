import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import Notificationbar from './notificationbar/Notificationbar';
import {
  changeThemeToDark,
  changeThemeToLight,
} from '@/redux/actions/themeActions';
import {
  changeMobileSidebarVisibility,
  changeSidebarVisibility,
} from '@/redux/actions/sidebarActions';
import { SidebarProps } from '@/shared/prop-types/ReducerProps';
import {
  clearError,
  clearSuccess,
} from '../../redux/actions/notificacoesActions';

const Layout = ({ dispatch, sidebar }) => {
  const error = useSelector((state) => state.notificacoes.error);
  const success = useSelector((state) => state.notificacoes.success);
  const layoutClass = classNames({
    layout: true,
    'layout--collapse': sidebar.collapse,
  });

  useEffect(() => {
    if (error) {
      Notificationbar(error, null);
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      Notificationbar(null, success);
      dispatch(clearSuccess());
    }
  }, [success]);

  const sidebarVisibility = () => {
    dispatch(changeSidebarVisibility());
  };

  const mobileSidebarVisibility = () => {
    dispatch(changeMobileSidebarVisibility());
  };

  const changeToDark = () => {
    dispatch(changeThemeToDark());
  };

  const changeToLight = () => {
    dispatch(changeThemeToLight());
  };

  return (
    <div className={layoutClass}>
      <Topbar
        changeMobileSidebarVisibility={mobileSidebarVisibility}
        changeSidebarVisibility={sidebarVisibility}
      />
      <Sidebar
        sidebar={sidebar}
        changeToDark={changeToDark}
        changeToLight={changeToLight}
        changeMobileSidebarVisibility={mobileSidebarVisibility}
      />
    </div>
  );
};

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebar: SidebarProps.isRequired,
};

export default connect((state) => ({
  sidebar: state.sidebar,
}))(Layout);
