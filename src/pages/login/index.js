import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { loginSchema } from 'schemas';
import Contact from 'components/contact';
import Menu from 'components/menu';
import { api } from 'services/api';
import { useLoginMutation } from 'services/auth/auth';
import useAuth from 'hooks/useAuth';
import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import Input from 'components/form/input';
import Button from 'components/common/button';
import { CONTACT } from 'constants/constants';

import 'styles/form.scss';
import './styles.scss';
import ContactModal from 'components/contactModal';
import Mobile from 'components/phoneSection';

const Login = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const [showModal, setShowModal] = useState(false);

  const { authenticated, user } = useAuth();
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = data => login(data);
  const resetErrors = useCallback(() => dispatch(api.util.resetApiState()), [dispatch]);
  const handleFocus = () => error && resetErrors();

  useEffect(() => {
    if (isSuccess) {
      push(routesPaths.index);
    }
  }, [isSuccess, user, push]);

  useEffect(() => resetErrors, [resetErrors]);

  const switchTab = dataFromChild => {
    if (dataFromChild === CONTACT) {
      setShowModal(true);
    }
  };

  if (authenticated) {
    return <Redirect to={routesPaths.index} />;
  }

  const responseFacebook = response => {
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      return <Redirect to={routesPaths.index} />;
    }
  };
  const appId = process.env.REACT_APP_ID_FACEBOOK;

  return (
    <>
      <ContactModal show={showModal} setShow={setShowModal}>
        <button className="close" onClick={() => setShowModal(false)}>
          X
        </button>
        <Contact />
      </ContactModal>
      <section className="row">
        <article className="form column left-column">
          <Menu switchTab={switchTab} />
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="circles"> </div>
            <h1 className="title">{t('login.title')}</h1>
            <h5 className="subTitle">{t('login.subTitle')}</h5>
            <p className="explanation">{t('login.explanation')}</p>
            <label htmlFor="email">{t('login.labels.email')}</label>
            <Input
              register={register}
              type="email"
              name="email"
              error={errors.email}
              handleFocus={handleFocus}
            />

            <label htmlFor="password">{t('login.labels.password')}</label>
            <Input
              register={register}
              type="password"
              name="password"
              error={errors.password}
              handleFocus={handleFocus}
            />

            {error && error.data && <p className="error-message">{error.data.errors}</p>}

            <div className="button-container">
              <Button type="submit" disabled={isLoading}>
                {t('login.button.signin')}
              </Button>
              <Link to={routesPaths.forgotPassword} className="forgot">
                {t('login.forgot')}
              </Link>
              <FacebookLogin
                appId={appId}
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                textButton={t('login.faceBook')}
                callback={responseFacebook}
              />
              <hr />
              <Link to={routesPaths.signup} className="signup">
                {t('login.dontHaveAccountMsg')}
              </Link>
            </div>
          </form>
        </article>
        <Mobile />
      </section>
    </>
  );
};
export default Login;
