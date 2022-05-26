/* eslint-disable no-unused-vars */
import routesPaths from './routesPaths';
import Home from '../pages/home';
import Signup from '../pages/signup';
import Login from '../pages/login';

const routes = [
  {
    path: routesPaths.index,
    component: <Home />,
    exact: true,
    private: true,
  },
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
