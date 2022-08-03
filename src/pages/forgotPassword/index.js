import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from 'components/form/input';
import Button from 'components/common/button';
import useTranslation from 'hooks/useTranslation';
import { forgotPasswordSchema } from 'schemas';
import routesPaths from 'routes/routesPaths';
import { useResetPasswordMutation } from 'services/profile/profile';
import Mobile from 'components/phoneSection';

import './styles.scss';

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
      <Mobile />
    </section>
  );
};

export default ForgotPassword;
