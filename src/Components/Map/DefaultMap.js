import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { API_KEY } from 'Utils';
import React from 'react';

const DefaultMap = () => {
  /* Router */
  /* State */
  const mapStyle = {
    width: '100%',
    height: '100%',
  };

  const defaultCenter = {
    lat: 35.179737,
    lng: 129.075952,
  };
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={mapStyle} zoom={15} center={defaultCenter}>
        <Marker position={defaultCenter} label={'ㅅㄷㄴㅅ'} />
      </GoogleMap>
    </LoadScript>
  );
};

export default DefaultMap;
