import React from 'react';
import HomePresenter from './HomePresenter';
import { useState } from 'react';

const HomeContainer = () => {
  /* Router */
  /* State */
  const [markerList, setMarkerList] = useState([]);
  /* Functions */
  const handleAddMarker = markerInfo => {
    setMarkerList([...markerList, markerInfo]);
  };
  /* Hooks */
  /* Render */
  return (
    <HomePresenter markerList={markerList} handleAddMarker={handleAddMarker} />
  );
};

export default HomeContainer;
