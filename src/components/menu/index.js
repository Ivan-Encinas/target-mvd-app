import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useLogoutMutation } from 'services/auth/auth';
import useTranslation from 'hooks/useTranslation';
import useAuth from 'hooks/useAuth';
import { CREATE, EDIT, CONTACT, ABOUT, HOME } from 'constants/constants';

import icon from 'assets/menu.png';
import './styles.scss';

const Menu = ({ switchTab }) => {
  const t = useTranslation();
  const history = useHistory();
  const handleLogout = () => logout().then(() => localStorage.removeItem('user'));
  const [logout] = useLogoutMutation();
  const { authenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setIsLoggedIn(true);
    }
  }, []);

  const changeTab = name => {
    setIsOpen(!isOpen);
    switchTab(name);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <input className="menuToggle" type="checkbox" />
      {isLoggedIn ? (
        <>
          <button className="menu__btn" htmlFor="menuToggle" onClick={handleClick}>
            <img src={icon} alt={t('menu.alt')} />
          </button>
          <ul className={`menu__box ${isOpen ? 'open' : 'close'}`}>
            <li>
              <button className="menu__item" onClick={() => changeTab(HOME)}>
                {t('menu.home')}
              </button>
            </li>
            <li>
              <button className="menu__item" onClick={() => changeTab(EDIT)}>
                {t('menu.profile')}
              </button>
            </li>
            <li>
              <button className="menu__item" onClick={() => changeTab(CREATE)}>
                {t('menu.target')}
              </button>
            </li>
            <li>
              <button className="menu__item" onClick={handleLogout}>
                {t('menu.logout')}
              </button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <button className="menu__btn__logout" htmlFor="menuToggle" onClick={handleClick}>
            <img src={icon} alt={t('menu.alt')} />
          </button>
          <ul className={`menu__box ${isOpen ? 'open' : 'close'}`}>
            <li>
              <button className="menu__item" onClick={() => history.push(ABOUT)}>
                {t('menu.about')}
              </button>
            </li>
            <li>
              <button className="menu__item" onClick={() => changeTab(CONTACT)}>
                {t('menu.contact')}
              </button>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
export default Menu;
