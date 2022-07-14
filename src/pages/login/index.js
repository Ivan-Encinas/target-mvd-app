import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { loginSchema } from 'schemas';
import applestoreButton from 'assets/appstore-button.png';
import twitterButton from 'assets/Twitter.png';
import facebookButton from 'assets/Facebook.png';
import phoneIcon from 'assets/i6Phone.svg';

import { api } from 'services/api';
import { useLoginMutation } from 'services/auth/auth';
import useAuth from 'hooks/useAuth';
import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import Input from 'components/form/input';
import Button from 'components/common/button';

import 'styles/form.scss';
import './styles.scss';

const Login = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
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
    <section className="row">
      <article className="form column left-column">
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
      <article className="column right-column">
        <div className="phone__section">
          <img className="icon" src={phoneIcon} alt="Applestore Logo" />
        </div>
        <a target="_blank" href="https://www.apple.com/la/app-store/" rel="noreferrer">
          <img className="apple-store" src={applestoreButton} alt="Applestore Logo" />
        </a>
        <div className="social-media">
          <a target="_blank" href="https://es-la.facebook.com/" rel="noreferrer">
            <img className="facebook" src={facebookButton} alt="Facebook Logo" />
          </a>
          <a target="_blank" href="https://twitter.com/?lang=es" rel="noreferrer">
            <img className="twitter" src={twitterButton} alt="Twitter Logo" />
          </a>
        </div>
      </article>
    </section>
  );
};
export default Login;
