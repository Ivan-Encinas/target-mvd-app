import Button from 'components/common/button';
import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import './styles.scss';
import Mobile from 'components/phoneSection';
import { useHistory } from 'react-router-dom';

import './styles.scss';

const About = () => {
  const t = useTranslation();
  const history = useHistory();

  return (
    <>
      <section className="row">
        <article className="form column left__column">
          <div className="smiles"></div>
          <h5 className="subTitle">{t('about.title')}</h5>
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
