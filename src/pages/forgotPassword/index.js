import React from 'react';
import Input from 'components/form/input';
import Button from 'components/common/button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useTranslation from 'hooks/useTranslation';
import { forgotPasswordSchema } from 'schemas';
import routesPaths from 'routes/routesPaths';
import { Link } from 'react-router-dom';
import applestoreButton from 'assets/appstore-button.png';
import twitterButton from 'assets/Twitter.png';
import facebookButton from 'assets/Facebook.png';
import phoneIcon from 'assets/i6Phone.svg';

import './styles.scss';
import { useResetPasswordMutation } from 'services/profile/profile';

const ForgotPassword = () => {
  const t = useTranslation();
  const {
    register: forgotPassowrd,
    handleSubmit: handleOnSubmitForgotPassword,
    formState: { errors: forgotPassowrdErrors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });
  const [isSent, setIsSent] = useState(false);
  const [resetPassword, { isSuccess }] = useResetPasswordMutation();
  const redirectUrl = process.env.REACT_APP_FORGOT_PASSWORD_URL;
  const onSubmitForgotPassword = data => {
    resetPassword({ ...data, redirect_url: redirectUrl });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSent(true);
    }
  }, [isSuccess]);

  return (
    <section className="row">
      {!isSent ? (
        <article className="form column left-column">
          <form onSubmit={handleOnSubmitForgotPassword(onSubmitForgotPassword)}>
            <div className="circles"> </div>
            <h1 className="title">{t('forgotPassword.title')}</h1>
            <label htmlFor="email">{t('forgotPassword.email')}</label>
            <Input
              register={forgotPassowrd}
              type="email"
              name="email"
              error={forgotPassowrdErrors.email}
            />
            <div className="button-container">
              <Button type="submit"> {t('forgotPassword.button')} </Button>
              <hr />
              <Link to={routesPaths.login} className="signup">
                {t('signup.alreadyHaveAccount')}
              </Link>
            </div>
          </form>
        </article>
      ) : (
        <div className="form column left-column">
          <h3>{t('forgotPassword.message')}</h3>
        </div>
      )}
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

export default ForgotPassword;
