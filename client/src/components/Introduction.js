import React from 'react';

import s from './Introduction.module.css';

export default () => {
  return (
    <div className={s.container}>
      <div className={s.hi}>
        Hello, Hallo, Hola!
      </div>
      <div>
        My name is Agustin! I love coding and travel!
      </div>
    </div>
  )
}