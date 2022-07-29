import routesPaths from './routesPaths';
import Home from '../pages/home';
import Signup from '../pages/signup';
import Login from '../pages/login';
import ForgotPassword from '../pages/forgotPassword';
import About from 'pages/about';

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
  {
    path: routesPaths.forgotPassword,
    component: <ForgotPassword />,
  },
  {
    path: routesPaths.about,
    component: <About />,
  },
];

export default routes;
