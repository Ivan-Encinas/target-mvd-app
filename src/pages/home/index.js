import useTranslation from 'hooks/useTranslation';
import { useLogoutMutation } from 'services/auth/auth';
import Button from 'components/common/button';
import MapView from 'components/map';
import { useCreateTargetMutation, useGetTargetsQuery } from 'services/target/target';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { homeSchema } from 'schemas';

import Input from 'components/form/input';
import Select from 'components/form/select/select';
import 'components/sideBar/styles.scss';
import { useEffect, useState } from 'react';
import { useTopicsQuery } from 'services/topics/topics';
import SideBar from 'components/sideBar';
import sideBarIcon from 'assets/aim-mark.png';

import './styles.scss';

const Home = () => {
  const t = useTranslation();

  const handleLogout = () => logout().then(() => localStorage.removeItem('user'));

  const [logout, { isLoading }] = useLogoutMutation();
  const [createTarget, { isLoadingCreateTarget, isSuccess, error }] = useCreateTargetMutation();
  const { data: topics } = useTopicsQuery();
  const { data: targets } = useGetTargetsQuery();
  const [topicsList, setTopicsList] = useState([]);
  const [targetsList, setTargetsList] = useState([]);
  const [latLng, setLatLng] = useState({});
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

  const onSubmit = data => {
    createTarget({ ...data, ...latLng });
  };

  const sendLatLng = dataFromChild => {
    setLatLng(dataFromChild);
  };

  return (
    <div className="home">
      <MapView currentPosition={currentPosition} sendLatLng={sendLatLng} targets={targetsList} />
      <SideBar title={'sideBar.create.title'}>
        <img className="sidebar__icon" src={sideBarIcon} alt=""></img>
        <h3 className="sidebar__subtitle">{t('sideBar.subtitle')}</h3>
        {topics ? (
          <div>
            <form className="sidebar__form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <label htmlFor="radius">{t('home.create.radius')}</label>
              <Input register={register} type="number" name="radius" />

              <label htmlFor="title">{t('home.create.title')}</label>
              <Input register={register} type="text" name="title" />

              <label htmlFor="topic_id">{t('home.create.topic')}</label>
              <Select
                register={register}
                name="topic_id"
                options={topicsList}
                placeholder={t('home.create.placeholder')}
              />
              <div className="save-button">
                <Button type="submit">{t('home.create.saveTarget')}</Button>
              </div>
            </form>
          </div>
        ) : null}
      </SideBar>
      <div className="home__logout">
        <Button handleClick={handleLogout} disabled={isLoading}>
          {t('home.logoutBtn')}
        </Button>
      </div>
    </div>
  );
};

export default Home;
