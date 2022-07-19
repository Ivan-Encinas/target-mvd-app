import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { loginSchema, contactSchema } from 'schemas';
import applestoreButton from 'assets/appstore-button.png';
import twitterButton from 'assets/Twitter.png';
import facebookButton from 'assets/Facebook.png';
import phoneIcon from 'assets/i6Phone.svg';
import ContactModal from 'components/contactModal';
import Menu from 'components/menu';
import { api } from 'services/api';
import { useLoginMutation } from 'services/auth/auth';
import { useContactMutation } from 'services/contact/contact';
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
  const [contact, { isSuccess: isContactSuccess }] = useContactMutation();
  const [isContactSent, setIsContactSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { authenticated, user } = useAuth();
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { contactErrors },
  } = useForm({ resolver: zodResolver(contactSchema) });

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
    if (dataFromChild === 'CONTACT') {
      setShowModal(true);
    }
  };
  const onSubmitContact = data => {
    contact(data);
  };
  useEffect(() => {
    if (isContactSuccess) {
      setIsContactSent(true);
    }
  }, [isContactSuccess]);

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
        <div className="circles"> </div>
        {!isContactSent ? (
          <form onSubmit={handleSubmitContact(onSubmitContact)}>
            <h3 className="contact__title">{t('contact.form.title')}</h3>
            <div className="contact__form">
              <label htmlFor="contactEmail" className="contact__label">
                {t('contact.form.label.email')}
              </label>
              <Input type="email" name="email" register={registerContact} />
              <label htmlFor="contactEmail" className="contact__label">
                {t('contact.form.label.message')}
              </label>
              <textarea
                className="contact__text__area"
                name="body"
                {...registerContact('body')}
              ></textarea>
              <div className="contact__button">
                <Button type="submit">{t('contact.form.button')}</Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="contact__message__container">
            <h3>{t('contact.response.title')}</h3>
            <p>{t('contact.response.text')}</p>
          </div>
        )}
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
    </>
  );
};
export default Login;
