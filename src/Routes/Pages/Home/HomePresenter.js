import { DefaultMap } from 'Components';
import React from 'react';
import './home.css';

const HomePresenter = props => {
  /* Router */
  /* State */
  const { markerList, handleAddMarker } = props;
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <div className="map-container">
      <div className="sidebar">SideBar</div>
      <div className="map-content">
        <DefaultMap markerList={markerList} handleAddMarker={handleAddMarker} />
      </div>
    </div>
  );
};

export default HomePresenter;
