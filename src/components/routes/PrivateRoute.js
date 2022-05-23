import { bool, string, node } from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Route, Redirect, useLocation } from 'react-router-dom';

import routesPaths from '../../routes/routesPaths';

const PrivateRoute = ({ children, exact = false, path, authenticated }) => {
  const location = useLocation();

  return authenticated ? (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  ) : (
    <Redirect
      to={{
        pathname: routesPaths.login,
        state: { from: location },
      }}
    />
  );
};

PrivateRoute.propTypes = {
  children: node.isRequired,
  path: string.isRequired,
  authenticated: bool,
  exact: bool,
};

export default PrivateRoute;
