import { DefaultMap } from 'Components';
import React, { useEffect } from 'react';
import './home.css';
import MainMap from 'Components/Map/MainMap';
import DeviceList from 'Components/DeviceList/DeviceList';
import { AdvancedMarker, Map, Pin, useMap } from '@vis.gl/react-google-maps';
import { useState } from 'react';

const defaultCenter = {
  lat: 35.235845343589546,
  lng: 129.07688612195088
}

const requestBodyExample = data => {
  const {
    sensorType,
    name,
    location,
    device: { manufacturer, model, serialNumber, installationDate }
  } = data;
  return {
    id: `urn:ngsi-ld:${sensorType}:${name}`,
    type: sensorType,
    properties: {
      category: name,
      status: 'active',
      manufacturer: manufacturer,
      model: model,
      serialNumber: serialNumber,
      installationDate: installationDate
    },
    location: {
      type: 'Point',
      coordinates: [location.lng, location.lat]
    }
  };
};

const HomePresenter = props => {
  /* Router */
  /* State */
  const { markerList, setMarkerList, handleAddMarker } = props;
  const map = useMap();
  const [selectMarker, setSelectMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnotherModal, setIsAnotherModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    key: 'pnu008',
    id: 8,
    name: 'pnu008-solar',
    address: '부산광역시 금정구 부산대학로63번길 9-1',
    sensorType: '태양광',
    description: '부산대학교 태양광 센서 8',
    location: {
      lat: 35.235845343589546,
      lng: 129.07688612195088
    },
    created_at: new Date().toISOString(),
    device: {
      manufacturer: '제조사 G',
      model: '모델 D',
      serialNumber: 'SN678901',
      installationDate: '2023-12-07'
    }
  });

  /* Functions */
  const handleSelectMarker = marker => {
    console.log(marker);
    map.panTo(marker.location);
    map.setZoom(20);
    setSelectMarker(marker);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleNewDevice = e => {
    setNewDevice({ ...newDevice, [e.target.name]: e.target.value });
  };

  const handleClickMap = ev => {
    console.log(ev);
    setNewDevice({ ...newDevice, location: {
      lat: ev.detail.latLng.lat,
      lng: ev.detail.latLng.lng
    } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newDevice);
    handleAddMarker(newDevice);
    handleModal();
  };
  /* Hooks */
  /* Render */
  return (
    <div className="map-container">
      <button
        className="absolute bottom-0 right-0 mb-4 mr-4 bg-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center transform transition-transform duration-300 hover:rotate-45 z-10 text-2xl"
        onClick={handleModal}
      >
        +
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Add Device</h2>
            <div className="flex">
              <form className="overflow-y-auto max-h-400px w-1/3 border-r-2 border-gray-300 pr-4" onSubmit={handleSubmit}>
                <div className="text-lg mb-2">
                  <label className="font-bold">Name:</label>
                  <input
                    type="text"
                    value={newDevice?.name}
                    onChange={handleNewDevice}
                    className="ml-2 border-b-2 w-full"
                  />
                </div>
                <div className="text-lg mb-2">
                  <label className="font-bold">Address:</label>
                  <input
                    type="text"
                    value={newDevice?.address}
                    onChange={handleNewDevice}
                    className="ml-2 border-b-2 w-full"
                  />
                </div>
                <div className="text-lg mb-2">
                  <label className="font-bold">Sensor Type:</label>
                  <input
                    type="text"
                    value={newDevice?.sensorType}
                    onChange={handleNewDevice}
                    className="ml-2 border-b-2 w-full"
                  />
                </div>
                <div className="text-lg mb-2">
                  <label className="font-bold">Description:</label>
                  <input
                    type="text"
                    value={newDevice?.description}
                    onChange={handleNewDevice}
                    className="ml-2 border-b-2 w-full"
                  />
                </div>
                <div className="text-lg mb-2">
                  <label className="font-bold">Location:</label>
                  <input
                    type="text"
                    value={`${newDevice?.location.lat}, ${newDevice?.location.lng}`}
                    // onChange={handleNewDevice}
                    onClick={() => setIsAnotherModal(true)}
                    className="ml-2 border-b-2 w-full"
                  />
                </div>
                {/* <div className="text-lg mb-2">
                  <label className="font-bold">Created At:</label>
                  <input
                    type="text"
                    value={newDevice?.created_at}
                    onChange={handleNewDevice}
                    className="ml-2 border-b-2"
                  />
                </div> */}
                <div className="text-lg mb-2">
                  <label className="font-bold">Manufacturer:</label>
                  <input
                    type="text"
                    value={newDevice?.device.manufacturer}
                    onChange={handleNewDevice}
                    className="ml-2 border-b-2 w-full"
                  />
                </div>
                <div className="text-lg mb-2">
                <label className="font-bold">Model:</label>
                <input
                  type="text"
                    value={newDevice?.device.model}
                    onChange={handleNewDevice}
                    className="ml-2 border-b-2 w-full"
                  />
                </div>
                <div className="text-lg mb-2">
                  <label className="font-bold">Serial Number:</label>
                  <input
                    type="text"
                    value={newDevice?.device.serialNumber}
                    onChange={handleNewDevice}
                    className="ml-2 border-b-2 w-full"
                  />
                </div>
              <div className="text-lg mb-2">
                <label className="font-bold">Installation Date:</label>
                <input
                  type="text"
                  value={newDevice?.device.installationDate}
                  onChange={handleNewDevice}
                  className="ml-2 border-b-2 w-full"
                />
              </div>
            </form>
            <div className="w-2/3 p-4">
              <p className="text-sm mb-2 border-b-2 border-gray-300 pb-2">
                <span className="font-bold">URL:</span>{' '}
                https://smartcitylab-sensor.islab.dev/api/sensor/data/
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">RequestBody:</span>{' '}
              </p>
              <pre className="text-sm bg-gray-200 p-2 rounded-md">
                {JSON.stringify(requestBodyExample(newDevice), null, 2)}
              </pre>
            </div>
            </div>
            <div className="flex justify-start gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleModal}
            >
              Close
            </button>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={handleSubmit}
              >
                Create
            </button>
            </div>
          </div>
        </div>
      )}
      <div className="sidebar">
        <DeviceList
          markerList={markerList}
          keyword=""
          handleSelectMarker={handleSelectMarker}
        />
      </div>
      <div className="map-content">
        <MainMap
          markerList={markerList}
          setMarkerList={setMarkerList}
          handleSelectMarker={handleSelectMarker}
          selectMarker={selectMarker}
        />
      </div>
      {isAnotherModal &&
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Set Location</h2>
            <div className="overflow-y-auto max-h-400px">
              <div className="w-full h-[400px] border">
                <Map
                  mapId="SmartCityLab-Select"
                  defaultZoom={20}
                  defaultCenter={defaultCenter}
                  onCameraChanged={ev =>
                    console.log(
                      'camera changed:',
                      ev.detail.center,
                      'zoom:',
                  ev.detail.zoom
                )}
                onClick={handleClickMap}
              >
                <AdvancedMarker
                  position={newDevice.location}
                >
                  <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
              </Map>
              </div>
              <div className="text-sm">
                Latitude: {newDevice.location.lat}
                Longitude: {newDevice.location.lng}
              </div>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => setIsAnotherModal(false)}
            >
              닫기
            </button>
          </div>
        </div>}
    </div>
  );
};

export default HomePresenter;
