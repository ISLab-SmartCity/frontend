import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { API_KEY } from 'Utils';
import React, { useCallback, useEffect, useState } from 'react';

const DefaultMap = ({ sensorLocations, handleAddMarker, markerList }) => {
  /* Router */
  /* State */
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    language: 'ko',
  });

  const defaultCenter = {
    lat: 35.179737,
    lng: 129.075952,
  };

  const [position, setPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null);

  const mapStyle = {
    width: '100%',
    height: '100%',
  };

  /* Functions */
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      alert('위치 정보를 불러올 수 없습니다.');
    }
  };

  const sensorIcons = {
    sensor1:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" stroke="none"%3E%3Ccircle cx="12" cy="12" r="8" fill="%23000" /%3E%3C/svg%3E',
    sensor2:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" stroke="none"%3E%3Crect width="16" height="16" fill="%23000" /%3E%3C/svg%3E',
    sensor3:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" stroke="none"%3E%3Cpolygon points="12,2 2,22 22,22" fill="%23000" /%3E%3C/svg%3E',
    sensor4:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" stroke="none"%3E%3Cpath d="M12 2 L2 22 L22 22 Z" fill="%23000" /%3E%3C/svg%3E',
    sensor5:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" stroke="none"%3E%3Ccircle cx="12" cy="12" r="10" fill="%23000" /%3E%3C/svg%3E',
  };

  const onLoad = useCallback(async (map) => {
    map.setZoom(15);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  /* Hooks */
  useEffect(() => {
    getCurrentLocation();
    return () => {};
  }, []);

  useEffect(() => {
    console.log(map);
  }, [map]);

  /* Render */
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapStyle}
      zoom={15}
      center={position}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markerList.map((markerItem, index) => {
        const { location, name } = markerItem;
        return (
          <Marker
            key={index}
            title={name}
            position={location}
            icon={sensorIcons.sensor1}
            clickable
            onMouseOver={() => {
              console.log(name);
            }}
            label={name}
            onClick={(e) => {console.log(e);}}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

DefaultMap.defaultProps = {
  sensorLocations: [
    { lat: 35.231242, lng: 129.083068 }, // 부산대학교 좌표
    { lat: 35.230852, lng: 129.083669 }, // Sensor 1
    { lat: 35.230542, lng: 129.082947 }, // Sensor 2
    { lat: 35.230954, lng: 129.081968 }, // Sensor 3
    { lat: 35.231651, lng: 129.083358 }, // Sensor 4
    { lat: 35.231268, lng: 129.084379 }, // Sensor 5
  ],
};

export default React.memo(DefaultMap);
