import useTranslation from '../../hooks/useTranslation';
import { useLogoutMutation } from '../../services/auth/auth';
import Button from '../../components/common/button';

import logo from '../../logo.svg';
import './styles.scss';

const Home = () => {
  const t = useTranslation();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = () => logout().then(() => localStorage.removeItem('user'));

  return (
    <div className="home">
      <img src={logo} className="home__logo" alt={t('home.logoAltMsg')} />
      <h1>{t('home.welcomeMsg')}</h1>
      <div className="home__logout">
        <Button handleClick={handleLogout} disabled={isLoading}>
          {t('home.logoutBtn')}
        </Button>
      </div>
    </div>
  );
};

export default Home;
