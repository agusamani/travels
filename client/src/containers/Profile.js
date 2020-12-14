import React from 'react';
import { Link } from 'react-router-dom';

import Introduction from '../components/Introduction';

import s from './Profile.module.css';

export default () => {
  return (
    <div className={s.container}>
      <div className={s.subContainer}>
        <Introduction />
        <Link to="/map" className={s.link}>Enter</Link>
      </div>
    </div>
  )
}