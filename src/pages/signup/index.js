/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { string, z } from 'zod';
import Input from 'components/form/input';
import Select from 'components/form/select/select';
import Button from 'components/common/button';
import emailjs from 'emailjs-com';
import routesPaths from 'routes/routesPaths';
import useTranslation from 'hooks/useTranslation';
import useAuth from 'hooks/useAuth';
import { api } from 'services/api';
import { useSignupMutation } from 'services/auth/auth';
import { GENDER_OPTIONS, PASSWORD_REGEX } from 'constants/constants';

import 'styles/form.scss';
import './styles.scss';

const Signup = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { user, authenticated } = useAuth();
  const [signup, { isLoading, isSuccess, error }] = useSignupMutation();
  const genderList = [
    { value: 'female', name: 'FEMALE' },
    { value: 'male', name: 'MALE' },
  ];
  const schema = z
    .object({
      username: z.string().min(1),
      email: z.string().email({ message: t('signup.errors.emailMsg') }),
      gender: z.string().min(1),
      password: z.string().regex(PASSWORD_REGEX, { message: t('signup.errors.passwordMsg') }),
      passwordConfirmation: z
        .string()
        .regex(PASSWORD_REGEX, { message: t('signup.errors.passwordMsg') }),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t('signup.errors.passwordConfirmationMsg'),
      path: ['passwordConfirmation'],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [isSend, setIsSend] = useState(false);
  const [toSend, setToSend] = useState({
    to_name: '',
    message: `Hello, thank you for signing up to Target MVD!`,
    to: '',
  });

  const sendEmailValidation = data => {
    setToSend(prevState => {
      return {
        ...prevState,
        to_name: data.username,
        to: data.email,
      };
    });
  };

  const onSubmit = data => {
    sendEmailValidation(data);
    signup(data);
  };

  const resetErrors = useCallback(() => dispatch(api.util.resetApiState()), [dispatch]);
  const handleFocus = () => error && resetErrors();

  const emailSendVerification = () => {
    if (!isSend) {
      emailjs
        .send('service_5h9ht9l', 'template_se2l61q', toSend, 'XO-v6R9Eaw7t52iAM')
        .then(response => {
          setIsSend(true);
        })
        .catch(err => {});
    }
  };
  useEffect(() => {
    resetErrors();
  }, [resetErrors]);
  useEffect(() => {
    emailSendVerification();
  }, [toSend, isSend]);

  return (
    <div className="row">
      {!isSend ? (
        <div className="form column left-column">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h1>{t('signup.title')}</h1>
            <label htmlFor="username">{t('signup.labels.name')}</label>
            <Input
              register={register}
              type="text"
              name="username"
              error={errors.username}
              handleFocus={handleFocus}
            />
            <label htmlFor="email">{t('signup.labels.email')}</label>
            <Input
              register={register}
              type="email"
              name="email"
              error={errors.email}
              handleFocus={handleFocus}
            />

            <label htmlFor="password">{t('signup.labels.password')}</label>
            <Input
              register={register}
              placeholder={t('signup.labels.passwordPlaceholder')}
              type="password"
              name="password"
              error={errors.password}
              handleFocus={handleFocus}
            />

            <label htmlFor="password">{t('signup.labels.passwordConfirmation')}</label>
            <Input
              register={register}
              type="password"
              name="passwordConfirmation"
              error={errors.passwordConfirmation}
              handleFocus={handleFocus}
            />
            <label htmlFor="gender">{t('signup.labels.gender')}</label>
            <Select
              name="gender"
              options={[...GENDER_OPTIONS]}
              register={register}
              placeholder={t('signup.labels.selectGender')}
              error={errors.gender}
            />

            {error && error.data && (
              <p className="error-message">{error.data.errors?.full_messages[0]}</p>
            )}
            <div className="button-container">
              <Button type="submit" disabled={isLoading}>
                {t('signup.title')}
              </Button>
              <hr />
              <Link to={routesPaths.login} className="signup">
                {t('signup.alreadyHaveAccount')}
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="form column left-column">
          <form>
            <div className="circles"> </div>
            <h1 className="center">Yey!</h1>
            <h3 className="center">Only one more step to start enjoying </h3>
            <h1 className="center">TARGET</h1>
            <p className="center">
              We’ve sent an email to confirm your account. Please check your inbox.
            </p>
          </form>
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
export default Signup;
