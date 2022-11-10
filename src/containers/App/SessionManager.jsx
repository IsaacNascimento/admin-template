import { connect } from 'react-redux';

/*----- Hook Imports -----*/
import { useDispatch } from 'react-redux';
import { hasSession } from '@/utils/session';

/*----- Other Imports -----*/
import { getUserProfile, logout } from '@/redux/actions/authActions';
import { useEffect, useMemo } from 'react';
// import { getCliente } from '@/redux/actions/clienteActions';

const SessionManager = ({ auth }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useMemo(() => auth.isLoggedIn, [auth]);
  // const _id = useMemo(() => auth._id, [auth]);

  useEffect(() => {
    if (hasSession()) {
      if (isLoggedIn === null) {
        dispatch(getUserProfile());
      }
      return;
    }
    if (isLoggedIn === null) {
      dispatch(logout());
    }
    return;
  }, [isLoggedIn, dispatch]);

  // useEffect(() => {
  //   _id && dispatch(getCliente(_id));
  // }, [_id, dispatch]);
  return <></>;
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(SessionManager);
