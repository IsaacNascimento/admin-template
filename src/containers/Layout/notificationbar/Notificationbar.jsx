import React from 'react';
import PropTypes from 'prop-types';
import Notification from 'rc-notification';
import { ThemeProps, RTLProps } from '@/shared/prop-types/ReducerProps';
import { FullWideNotification } from '@/shared/components/Notification';

let welcomeNotification = null;
// eslint-disable-next-line no-return-assign
Notification.newInstance(
  { style: { top: 60 } },
  (n) => (welcomeNotification = n)
);

const Notificationbar = (error, success) => {
  const title = 'Não foi possível concluir a ação!';
  const message = error ? `Ocorreu um erro! ${error}` : success;
  const initialProps = {
    content: (
      <FullWideNotification
        title={title}
        message={message}
        theme={{ className: 'theme-light' }}
        color={error ? 'danger' : 'success'}
      />
    ),
    key: 'welcome-notification',
    closable: true,
    duration: 5,
    style: {
      top: 0,
      left: 'calc(100vw - 100%)',
    },
    className: `right-up ltr-support`,
  };
  welcomeNotification.notice(initialProps);
};

Notificationbar.propTypes = {
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  setIsNotificationShown: PropTypes.func.isRequired,
  isNotificationShown: PropTypes.bool,
};

Notificationbar.defaultProps = {
  isNotificationShown: false,
};

export default Notificationbar;
