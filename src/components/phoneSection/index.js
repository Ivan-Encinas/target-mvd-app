import applestoreButton from 'assets/appstore-button.png';
import twitterButton from 'assets/Twitter.png';
import facebookButton from 'assets/Facebook.png';
import phoneIcon from 'assets/i6Phone.svg';
import useTranslation from 'hooks/useTranslation';

import 'styles/form.scss';
import './styles.scss';

const Mobile = () => {
  const t = useTranslation();

  return (
    <section className="row">
      <article className="column right-column">
        <div className="phone__section">
          <img className="icon" src={phoneIcon} alt={t('mobile.alt.phone')} />
        </div>
        <a target="_blank" href="https://www.apple.com/la/app-store/" rel="noreferrer">
          <img className="apple-store" src={applestoreButton} alt={t('mobile.alt.appleStore')} />
        </a>
        <div className="social-media">
          <a target="_blank" href="https://es-la.facebook.com/" rel="noreferrer">
            <img className="facebook" src={facebookButton} alt={t('mobile.alt.facebook')} />
          </a>
          <a target="_blank" href="https://twitter.com/?lang=es" rel="noreferrer">
            <img className="twitter" src={twitterButton} alt={t('mobile.alt.twitter')} />
          </a>
        </div>
      </article>
    </section>
  );
};
export default Mobile;
