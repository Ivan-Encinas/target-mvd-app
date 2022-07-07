import { useState } from 'react';
import { useLogoutMutation } from 'services/auth/auth';
import useTranslation from 'hooks/useTranslation';
import './styles.scss';
import icon from 'assets/menu.png';

const Menu = ({ switchTab }) => {
  const t = useTranslation();
  const handleLogout = () => logout().then(() => localStorage.removeItem('user'));
  const [logout] = useLogoutMutation();
  const changeTab = name => {
    setIsOpen(!isOpen);
    switchTab(name);
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <input className="menuToggle" type="checkbox" />
      <button className="menu__btn" htmlFor="menuToggle" onClick={handleClick}>
        <img src={icon} alt="Menu button" />
      </button>
      <ul className={`menu__box ${isOpen ? 'open' : 'close'}`}>
        <li>
          <button className="menu__item" onClick={() => changeTab('EDIT_PROFILE')}>
            {t('menu.profile')}
          </button>
        </li>
        <li>
          <button className="menu__item" onClick={() => changeTab('CREATE_TARGET')}>
            {t('menu.target')}
          </button>
        </li>
        <li>
          <button className="menu__item" onClick={() => handleLogout()}>
            {t('menu.logout')}
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Menu;
