import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';

import useTranslation from 'hooks/useTranslation';
import { homeSchema } from 'schemas';
import Input from 'components/form/input';
import Select from 'components/form/select/select';
import Button from 'components/common/button';
import { useTopicsQuery } from 'services/topics/topics';
import { useCreateTargetMutation, useGetTargetsQuery } from 'services/target/target';

import sideBarIcon from 'assets/aim-mark.png';

const NewTarget = () => {
  const t = useTranslation();
  const [createTarget] = useCreateTargetMutation();
  const { data: topics } = useTopicsQuery();
  const { data: targets } = useGetTargetsQuery();
  const [topicsList, setTopicsList] = useState([]);
  const [targetsList, setTargetsList] = useState([]);
  const [latLng, setLatLng] = useState({});

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
    if (targetsList.length <= 9) {
      createTarget({ ...data, ...latLng });
    } else {
      Swal.fire({ title: t('target.limit.alert'), icon: 'info', confirmButtonColor: '#3085d6' });
    }
  };
  return (
    <>
      <img className="sidebar__icon" src={sideBarIcon} alt={t('home.altCreate')}></img>
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
};

export default NewTarget;
