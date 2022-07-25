import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import Input from 'components/form/input';
import Select from 'components/form/select/select';
import Button from 'components/common/button';
import emailjs from 'emailjs-com';
import routesPaths from 'routes/routesPaths';
import useTranslation from 'hooks/useTranslation';
import { api } from 'services/api';
import { useSignupMutation } from 'services/auth/auth';
import { GENDER_OPTIONS } from 'constants/constants';
import { signupSchema } from 'schemas';
import { CONTACT } from 'constants/constants';

import 'styles/form.scss';
import './styles.scss';
import Mobile from 'components/phoneSection';
import Menu from 'components/menu';
import ContactModal from 'components/contactModal';
import Contact from 'components/contact';

const Signup = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [signup, { isLoading, error }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });
  const [isSent, setIsSent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toSend, setToSend] = useState({
    to_name: '',
    message: t('signup.confirmation.emailMessage'),
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

  const switchTab = dataFromChild => {
    if (dataFromChild === CONTACT) {
      setShowModal(true);
    }
  };

  const resetErrors = useCallback(() => dispatch(api.util.resetApiState()), [dispatch]);
  const handleFocus = () => error && resetErrors();

  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const emailSendVerification = () => {
    if (!isSent) {
      emailjs
        .send(serviceId, templateId, toSend, publicKey)
        .then(() => {
          setIsSent(true);
        })
        .catch(() => {});
    }
  };
  useEffect(() => {
    resetErrors();
  }, [resetErrors]);
  useEffect(() => {
    emailSendVerification();
  }, [toSend, isSent]);

  return (
    <>
      <ContactModal show={showModal} setShow={setShowModal}>
        <button className="close" onClick={() => setShowModal(false)}>
          X
        </button>
        <Contact />
      </ContactModal>
      <section className="row">
        {!isSent ? (
          <article className="form column left-column">
            <Menu switchTab={switchTab} />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h1 className="title">{t('signup.title')}</h1>
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

              {error?.data.data && (
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
          </article>
        ) : (
          <div className="form column left-column">
            <form>
              <div className="circles"> </div>
              <h1 className="center">{t('signup.confirmation.title')}</h1>
              <h3 className="center">{t('signup.confirmation.subtitle')}</h3>
              <h1 className="center">{t('signup.confirmation.name')}</h1>
              <p className="center">{t('signup.confirmation.message')}</p>
            </form>
          </div>
        )}
        <Mobile />
      </section>
    </>
  );
};
export default Signup;
