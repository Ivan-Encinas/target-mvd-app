/* eslint-disable no-unused-vars */
import routesPaths from './routesPaths';
import Signup from '../pages/signup';
import Login from '../pages/login';

const routes = [
  {
    path: routesPaths.signup,
    component: <Signup />,
  },
  {
    path: routesPaths.login,
    component: <Login />,
  },
];

export default routes;
