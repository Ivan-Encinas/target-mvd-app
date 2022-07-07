import useTranslation from 'hooks/useTranslation';
import Button from 'components/common/button';
import MapView from 'components/map';
import { useCreateTargetMutation, useGetTargetsQuery } from 'services/target/target';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { homeSchema, profileSchema } from 'schemas';
import { useProfilePasswordMutation } from 'services/profile/profile';

import Input from 'components/form/input';
import Select from 'components/form/select/select';
import 'components/sideBar/styles.scss';
import { useEffect, useState } from 'react';
import { useTopicsQuery } from 'services/topics/topics';
import SideBar from 'components/sideBar';
import sideBarIcon from 'assets/aim-mark.png';
import profileIcon from 'assets/profile.svg';

import './styles.scss';

const Home = () => {
  const t = useTranslation();

  const [createTarget] = useCreateTargetMutation();
  const [editProfile] = useProfilePasswordMutation();
  const { data: topics } = useTopicsQuery();
  const { data: targets } = useGetTargetsQuery();
  const [topicsList, setTopicsList] = useState([]);
  const [targetsList, setTargetsList] = useState([]);
  const [latLng, setLatLng] = useState({});
  const [tabSelected, setTabSelected] = useState('CREATE_TARGET');
  const [currentPosition, setCurrentPosition] = useState({
    ready: false,
    where: [],
    error: null,
  });
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const geolocationEnabled = () => {
    setCurrentPosition({ ready: false, error: null });
    return navigator.geolocation.getCurrentPosition(
      position => {
        geoSuccess(position);
      },
      () => {},
      geoOptions
    );
  };

  const geoSuccess = position => {
    setCurrentPosition({
      ready: true,
      where: [position.coords.latitude, position.coords.longitude],
    });
  };

  useEffect(() => {
    geolocationEnabled();
  }, []);

  const parseTopics = () => {
    let topicsParsedList = [];
    topics?.topics.map(topic => {
      topicsParsedList.push({
        id: topic.topic.id,
        label: topic.topic.label,
      });
    });
    setTopicsList(topicsParsedList);
  };

  const parseTargets = () => {
    let targetsParsedList = [];
    targets?.targets.map(target => {
      targetsParsedList.push([target.target.lat, target.target.lng, target.target.title]);
    });
    setTargetsList(targetsParsedList);
  };

  useEffect(() => {
    parseTopics();
  }, [topics]);

  useEffect(() => {
    parseTargets();
  }, [targets]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(homeSchema) });

  const {
    register: editProfileForm,
    handleSubmit: handleEditProfileForm,
    formState: { editProfileErrors },
  } = useForm({ resolver: zodResolver(profileSchema) });

  const onSubmit = data => {
    if (targetsList.length <= 9) {
      createTarget({ ...data, ...latLng });
    } else {
      window.alert(t('target.limit.alert'));
    }
  };

  const sendLatLng = dataFromChild => {
    setLatLng(dataFromChild);
  };

  const switchTag = dataFromChild => {
    setTabSelected(dataFromChild);
  };

  const onSubmitEditProfile = data => {
    editProfile(data);
  };

  return (
    <div className="home">
      <MapView currentPosition={currentPosition} sendLatLng={sendLatLng} targets={targetsList} />
      <SideBar
        title={tabSelected === 'CREATE_TARGET' ? 'sideBar.create.title' : 'profile.edit.subtitle'}
        switchTab={switchTag}
      >
        {(() => {
          switch (tabSelected) {
            case 'CREATE_TARGET':
              return (
                <>
                  <img className="sidebar__icon" src={sideBarIcon} alt="Aim icon"></img>
                  <h3 className="sidebar__subtitle">{t('sideBar.subtitle')}</h3>
                  {topics && (
                    <div>
                      <form className="sidebar__form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <label htmlFor="radius">{t('home.create.radius')}</label>
                        <Input register={register} type="text" name="radius" />
                        <label htmlFor="title">{t('home.create.title')}</label>
                        <Input register={register} type="text" name="title" />
                        <label htmlFor="topic_id">{t('home.create.topic')}</label>
                        <Select register={register} name="topic_id" options={topicsList} />
                        <div className="saveButton">
                          <Button type="submit">{t('home.create.saveTarget')}</Button>
                        </div>{' '}
                      </form>
                    </div>
                  )}
                </>
              );
            case 'EDIT_PROFILE':
              return (
                <>
                  <img className="sidebar__icon" src={profileIcon} alt="Profile Icon"></img>
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
                      <label htmlFor="password_confirmation">
                        {t('profile.edit.repeatPassword')}
                      </label>
                      <Input
                        type="password"
                        name="password_confirmation"
                        register={editProfileForm}
                      />
                      <div className="saveChanges">
                        <Button type="submit">{t('home.create.savePassword')}</Button>
                      </div>
                    </form>
                  </div>
                </>
              );
            default:
              return null;
          }
        })()}
      </SideBar>
    </div>
  );
};

export default Home;
