import useTranslation from 'hooks/useTranslation';
import React, { Component } from 'react';
import logo from '../../assets/smilies.png';

import './styles.scss';

const SideBar = props => {
  const t = useTranslation();
  return (
    <div className="side-bar">
      <div className="side-bar-header">
        <h1 className="side-bar-header-title">{t(props.title)}</h1>
      </div>

      {props.children}
      <img className="smiles" src={logo} alt="App smiley logo"></img>
    </div>
  );
};

export default SideBar;
