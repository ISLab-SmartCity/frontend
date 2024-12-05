import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useState } from 'react';

const PoiMarker = ({
  markerId,
  location,
  title,
  description,
  address,
  setMarkerRef,
  handleClick,
  selectMarker
}) => {
  // `markerRef` and `marker` are needed to establish the connection between
  // the marker and infowindow (if you're using the Marker component, you
  // can use the `useMarkerRef` hook instead).
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerRef = marker => {
    // setMarkerRef(marker, markerId);
    markerRef(marker);
  };

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(e => {
    handleClick(e);
    // markerRef(marker);
    setInfoWindowShown(isShown => !isShown);
  }, []);

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  useEffect(
    () => {
      if (!selectMarker) return;
      if (selectMarker.key !== markerId) return;
      setInfoWindowShown(true);
    },
    [selectMarker]
  );

  return (
    <AdvancedMarker
      key={markerId}
      position={location}
      ref={handleMarkerRef}
      clickable
      onClick={handleMarkerClick}
    >
      <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
      {infoWindowShown &&
        <InfoWindow headerContent={title} anchor={marker} onClose={handleClose}>
          <h2 className="text-lg font-bold">
            {address}
          </h2>
          <p className="text-sm">
            {description}
          </p>
        </InfoWindow>}
    </AdvancedMarker>
  );
};

export default PoiMarker;
