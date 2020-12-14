import React from 'react';

import s from './MarkerIcon.module.css';

export default function MarkerIcon({ viewportZoom }) {
  return (
    <div>
      <img 
        style={{
          height: `${6 * viewportZoom}px`,
          width: `${6 * viewportZoom}px`,
        }}
        className={s.marker}
        src="https://i.pinimg.com/originals/25/62/aa/2562aacd1a4c2af60cce9629b1e05cf2.png" 
        atl=""
      />
    </div>  
  )
}