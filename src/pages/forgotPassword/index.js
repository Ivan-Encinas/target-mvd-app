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

import './styles.scss';
import { useResetPasswordMutation } from 'services/profile/profile';

const ForgotPassword = () => {
  const t = useTranslation();
  const {
    register: forgotPassowrd,
    handleSubmit: handleOnSubmitForgotPassowrd,
    formState: { errors: forgotPassowrdErrors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });
  const [isSend, setIsSend] = useState(false);
  const [resetPassword, { isSuccess }] = useResetPasswordMutation();
  const redirectUrl = process.env.REACT_APP_FORGOT_PASSWORD_URL;
  const onSubmitForgotPassowrd = data => {
    resetPassword({ ...data, redirect_url: redirectUrl });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSend(true);
    }
  }, [isSuccess]);

  return (
    <div className="row">
      {!isSend ? (
        <div className="form column left-column">
          <form onSubmit={handleOnSubmitForgotPassowrd(onSubmitForgotPassowrd)}>
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
        </div>
      ) : (
        <div className="form column left-column">
          <h3>{t('forgotPassword.message')}</h3>
        </div>
      )}
      <div className="column right-column">
        <div className="i6"></div>
        <button id="apple-store"></button>
        <div className="social-media">
          <button id="facebook"></button>
          <button id="twitter"></button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
