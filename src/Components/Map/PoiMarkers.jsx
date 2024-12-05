
import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import {MarkerClusterer} from '@googlemaps/markerclusterer';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PoiMarker from './PoiMarker';

const PoiMarkers = ({ markerList, handleSelectMarker, selectMarker }) => {
  const map = useMap();
  const clusterer = useRef(null);
  const [markers, setMarkers] = useState({});

  const handleClick = useCallback((ev, item) => {
    if(!map) return;
    if(!ev.latLng) return;
    console.log('marker clicked:', ev.latLng.toString());
    map.panTo(ev.latLng);
    handleSelectMarker(item);
  });


  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers(prev => {
      if (marker) {
        return {...prev, [key]: marker};
      } else {
        const newMarkers = {...prev};
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  useEffect(
    () => {
      if (!map) return;
      if (!clusterer.current) {
        clusterer.current = new MarkerClusterer({ map });
      }
    },
    [map]
  );

  useEffect(() => {
    if (!clusterer.current) return;
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  return markerList.length > 0 ? (
    <>
      {markerList.map(item => {
        const { key, location, name, description, address } = item;
        console.log(item);
        return (
          <PoiMarker
            key={key}
            markerId={key}
            location={location}
            title={name}
            description={description}
            address={address}
            setMarkerRef={setMarkerRef}
            handleClick={(e) => handleClick(e, item)}
            selectMarker={selectMarker}
          />
          //   <AdvancedMarker
          //     key={key}
          //     position={location}
          //     ref={marker => setMarkerRef(marker, key)}
          //     clickable
          //     onClick={handleClick}
        //   >
        //     <Pin
        //       background={'#FBBC04'}
        //       glyphColor={'#000'}
        //       borderColor={'#000'}
        //     />
        //   </AdvancedMarker>
        );
      })}
    </>
  ) : null;
};

PoiMarkers.defaultProps = {
  markerList: [],
  setMarkerList: () => {}
};

export default PoiMarkers;
