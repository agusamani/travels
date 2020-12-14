import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

import MarkerIcon from '../components/MarkerIcon';
import { listLogs } from '../utils/api';
import LogForm from '../components/LogForm';

import s from './Map.module.css';

const Map = () => {
  const [logs, setLogs] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });
  const [inputValue, setInputValue] = useState('')

  const mapRef = useRef();

  const getEntries = async () => {
    const logs = await listLogs();
    setLogs(logs);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  const onResult = (e) => {
    const [ longitude, latitude ] = e.result.center;
    setAddEntryLocation({
      latitude,
      longitude,
    });
    setViewport({
      ...viewport,
      latitude,
      longitude,
    })
    setInputValue('');
  }

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapStyle="mapbox://styles/austin23/ckerivdt53kkn19r8owlzuxs5"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
      doubleClickZoom={false}
    >
      <Link to="/">Back</Link>
      {
        logs.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() => setShowPopup({
                  // ...showPopup,
                  [entry._id]: true,
                })}
              >
                <MarkerIcon viewportZoom={viewport.zoom} />
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className={s.popup}>
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    {entry.image && <img src={entry.image} alt={entry.title} />}
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <React.Fragment>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
          <MarkerIcon viewportZoom={viewport.zoom} />
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className={s.popup}>
              <LogForm onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }} location={addEntryLocation} />
            </div>
          </Popup>
          </React.Fragment>
        ) : null
      }
      <Geocoder 
        mapRef={mapRef} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        inputValue={inputValue}
        onResult={onResult}
      />
    </ReactMapGL>
  );
}

export default Map;
