import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Modal } from 'reactstrap';
import classNames from 'classnames';
import { RTLProps } from '@/shared/prop-types/ReducerProps';

const ModalComponent = ({
  color,
  btn,
  title,
  accept,
  dismiss,
  colored,
  header,
  rtl,
  onDismiss,
  onAccept,
  ...props
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal((prevState) => !prevState);
  };

  let Icon;

  switch (color) {
    case 'primary':
      Icon = <span className="lnr lnr-pushpin modal__title-icon" />;
      break;
    case 'success':
      Icon = <span className="lnr lnr-thumbs-up modal__title-icon" />;
      break;
    case 'warning':
      Icon = <span className="lnr lnr-flag modal__title-icon" />;
      break;
    case 'danger':
      Icon = <span className="lnr lnr-cross-circle modal__title-icon" />;
      break;
    default:
      break;
  }
  const modalClass = classNames({
    'modal-dialog--colored': colored,
    'modal-dialog--header': header,
  });

  const actionHandler = (action) => {
    if (!action) {
      return toggle;
    }
    return (...att) => {
      action(...att);
      toggle(...att);
    };
  };
  const ButtonComponent = btn.type;
  return (
    <div>
      <ButtonComponent onClick={toggle} {...btn.props}>
        {btn.props.children}
      </ButtonComponent>
      <Modal
        isOpen={modal}
        toggle={toggle}
        modalClassName={`${rtl.direction}-support`}
        className={`modal-dialog--${color} ${modalClass}`}
      >
        <div className="modal__header">
          <button
            className="lnr lnr-cross modal__close-btn"
            aria-label="modal__close-btn"
            type="button"
            onClick={actionHandler(onDismiss)}
          />
          {header ? '' : Icon}
          <h4 className="text-modal  modal__title">{title}</h4>
        </div>
        <div className="modal__body">{props.children}</div>
        <ButtonToolbar className="modal__footer">
          <Button className="modal_cancel" onClick={actionHandler(onDismiss)}>
            {dismiss}
          </Button>
          <Button
            className="modal_ok"
            outline={colored}
            color={color}
            onClick={actionHandler(onAccept)}
          >
            {accept}
          </Button>
        </ButtonToolbar>
      </Modal>
    </div>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  messageHtml: PropTypes.element,
  color: PropTypes.string.isRequired,
  colored: PropTypes.bool,
  header: PropTypes.bool,
  btn: PropTypes.element,
  rtl: RTLProps.isRequired,
  accept: PropTypes.string,
  dismiss: PropTypes.string,
  onDismiss: PropTypes.func,
  onAccept: PropTypes.func,
};

ModalComponent.defaultProps = {
  title: '',
  message: '',
  messageHtml: undefined,
  colored: false,
  header: false,
  onDismiss: undefined,
  onAccept: undefined,
  btn: undefined,
};

export default connect((state) => ({
  rtl: state.rtl,
}))(ModalComponent);
