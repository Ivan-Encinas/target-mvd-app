import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { contactSchema } from 'schemas';
import { api } from 'services/api';
import { useContactMutation } from 'services/contact/contact';
import useAuth from 'hooks/useAuth';
import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import Input from 'components/form/input';
import Button from 'components/common/button';

import 'styles/form.scss';
import './styles.scss';

const Contact = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [contact, { isSuccess: isContactSuccess }] = useContactMutation();
  const [isContactSent, setIsContactSent] = useState(false);

  const { authenticated, user } = useAuth();

  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { contactErrors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const resetErrors = useCallback(() => dispatch(api.util.resetApiState()), [dispatch]);

  useEffect(() => resetErrors, [resetErrors]);

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

  return (
    <>
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
    </>
  );
};
export default Contact;
