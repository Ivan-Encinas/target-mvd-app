import useTranslation from 'hooks/useTranslation';
import React from 'react';
import logo from '../../assets/smilies.png';

import './styles.scss';

const SideBar = ({ title, children }) => {
  const t = useTranslation();
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">{t(title)}</h1>
      </div>

      {children}
      <img className="smiles" src={logo} alt="App smiley logo"></img>
    </div>
  );
};

export default SideBar;
