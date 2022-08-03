import React from 'react';

import useTranslation from 'hooks/useTranslation';
import Menu from 'components/menu';

import logo from '../../assets/smilies.png';

import './styles.scss';

const SideBar = ({ title, switchTab, children }) => {
  const t = useTranslation();
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__menu">
          <Menu switchTab={switchTab} />
        </div>
        <div className="sidebar__name">
          <h1 className="sidebar__title">{t(title)}</h1>
        </div>
      </div>

      {children}
      <img className="smile" src={logo} alt="App smiley logo"></img>
    </div>
  );
};

export default SideBar;
