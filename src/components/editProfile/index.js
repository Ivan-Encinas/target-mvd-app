import useTranslation from 'hooks/useTranslation';
import profileIcon from 'assets/profile.svg';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from 'schemas';
import { useProfilePasswordMutation } from 'services/profile/profile';
import Input from 'components/form/input';
import Button from 'components/common/button';

const EditProfile = () => {
  const t = useTranslation();
  const [editProfile] = useProfilePasswordMutation();

  const {
    register: editProfileForm,
    handleSubmit: handleEditProfileForm,
    formState: { editProfileErrors },
  } = useForm({ resolver: zodResolver(profileSchema) });

  const onSubmitEditProfile = data => {
    editProfile(data);
  };

  return (
    <>
      <img className="sidebar__icon" src={profileIcon} alt={t('home.altEdit')}></img>
      <h3 className="sidebar__subtitle">{t('profile.edit.subtitle')}</h3>
      <div>
        <form
          className="sidebar__form"
          onSubmit={handleEditProfileForm(onSubmitEditProfile)}
          noValidate
        >
          <label htmlFor="email">{t('profile.edit.email')}</label>
          <Input type="email" register={editProfileForm} name="email" />
          <label htmlFor="current_password">{t('profile.edit.currentPassword')}</label>
          <Input type="password" register={editProfileForm} name="current_password" />
          <label htmlFor="password">{t('profile.edit.newPassword')}</label>
          <Input type="password" register={editProfileForm} name="password" />
          <label htmlFor="password_confirmation">{t('profile.edit.repeatPassword')}</label>
          <Input type="password" name="password_confirmation" register={editProfileForm} />
          <div className="saveChanges">
            <Button type="submit">{t('home.create.savePassword')}</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
