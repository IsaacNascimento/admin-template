import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import { getUserProfile } from '../../../redux/actions/authActions';
import { logout } from '../../../redux/actions/authActions';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile = () => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const hadleLogout = () => {
    console.log('logout');
    dispatch(logout());
    setIsRedirect(true);
  };

  if (isRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="topbar__profile">
      <button
        type="button"
        className="topbar__avatar"
        onClick={handleToggleCollapse}
      >
        <img className="topbar__avatar-img" src={Ava} alt="avatar" />
        <p className="topbar__avatar-name">{user?.name}</p>
        <DownIcon className="topbar__icon" />
      </button>
      {isCollapsed && (
        <button
          type="button"
          aria-label="button collapse"
          className="topbar__back"
          onClick={handleToggleCollapse}
        />
      )}
      <Collapse isOpen={isCollapsed} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink
            title="Sair"
            icon="exit"
            onClick={() => hadleLogout()}
            path="#"
          />
        </div>
      </Collapse>
    </div>
  );
};

export default TopbarProfile;
