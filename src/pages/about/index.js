import { useHistory } from 'react-router-dom';

import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import Mobile from 'components/phoneSection';

import './styles.scss';

import './styles.scss';

const About = () => {
  const t = useTranslation();
  const history = useHistory();

  return (
    <>
      <section className="row">
        <article className="form column left__column">
          <div className="smile"></div>
          <h1 className="subTitle">{t('about.title')}</h1>
          <p className="about__text">{t('about.text')}</p>
          <div className="button-container">
            <button className="button" onClick={() => history.push(routesPaths.login)}>
              {t('about.button')}
            </button>
          </div>
        </article>
        <Mobile />
      </section>
    </>
  );
};

export default About;
