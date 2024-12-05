import React from 'react';
import HomePresenter from './HomePresenter';
import { useState } from 'react';
import Loading from './Loading';

const HomeContainer = () => {
  /* Router */
  /* State */
  const [loading, setLoading] = useState(false);
  const [markerList, setMarkerList] = useState([
    {
      key: 'pnu001',
      id: 1,
      name: 'pnu001-solar',
      address: '부산 금정구 부산대학로63번길 2',
      sensorType: '태양광',
      description: '부산대학교 태양광 센서 1',
      location: {
        lat: 35.231242,
        lng: 129.083068
      },
      created_at: '2024-01-01 00:00:00',
      device: {
        manufacturer: '제조사 A',
        model: '모델 X',
        serialNumber: 'SN123456',
        installationDate: '2023-12-01'
      }
    }, // 부산대학교 좌표
    {
      key: 'pnu002',
      id: 2,
      name: 'pnu002-solar',
      address: '부산 금정구 부산대학로63번길 2',
      sensorType: '태양광',
      description: '부산대학교 태양광 센서 2',
      location: {
        lat: 35.230852,
        lng: 129.083669
      },
      created_at: '2024-01-01 00:00:00',
      device: {
        manufacturer: '제조사 B',
        model: '모델 Y',
        serialNumber: 'SN654321',
        installationDate: '2023-12-02'
      }
    }, // Sensor 1
    {
      key: 'pnu003',
      id: 3,
      name: 'pnu003-solar',
      address: '부산 금정구 부산대학로63번길 2',
      sensorType: '태양광',
      description: '부산대학교 태양광 센서 3',
      location: {
        lat: 35.230542,
        lng: 129.082947
      },
      created_at: '2024-01-01 00:00:00',
      device: {
        manufacturer: '제조사 C',
        model: '모델 Z',
        serialNumber: 'SN789012',
        installationDate: '2023-12-03'
      }
    }, // Sensor 2
    {
      key: 'pnu004',
      id: 4,
      name: 'pnu004-solar',
      address: '부산 금정구 부산대학로63번길 2',
      sensorType: '태양광',
      description: '부산대학교 태양광 센서 4',
      location: {
        lat: 35.230954,
        lng: 129.081968
      },
      created_at: '2024-01-01 00:00:00',
      device: {
        manufacturer: '제조사 D',
        model: '모델 A',
        serialNumber: 'SN345678',
        installationDate: '2023-12-04'
      }
    }, // Sensor 3
    {
      key: 'pnu005',
      id: 5,
      name: 'pnu005-solar',
      address: '부산 금정구 부산대학로63번길 2',
      sensorType: '태양광',
      description: '부산대학교 태양광 센서 5',
      location: {
        lat: 35.231651,
        lng: 129.083358
      },
      created_at: '2024-01-01 00:00:00',
      device: {
        manufacturer: '제조사 E',
        model: '모델 B',
        serialNumber: 'SN901234',
        installationDate: '2023-12-05'
      }
    }, // Sensor 4
    {
      key: 'pnu006',
      id: 6,
      name: 'pnu006-solar',
      address: '부산광역시 금정구 부산대학로63번길 9-1',
      sensorType: '태양광',
      description: '부산대학교 태양광 센서 6',
      location: {
        lat: 35.231268,
        lng: 129.084379
      },
      created_at: '2024-01-01 00:00:00',
      device: {
        manufacturer: '제조사 F',
        model: '모델 C',
        serialNumber: 'SN567890',
        installationDate: '2023-12-06'
      }
    }, // Sensor 5
    {
      key: 'pnu007',
      id: 7,
      name: 'pnu007-solar',
      address: '부산광역시 금정구 부산대학로63번길 9-1',
      sensorType: '태양광',
      description: '부산대학교 태양광 센서 7',
      location: {
        lat: 35.231268,
        lng: 129.084379
      },
      created_at: '2024-01-01 00:00:00',
      device: {
        manufacturer: '제조사 G',
        model: '모델 D',
        serialNumber: 'SN678901',
        installationDate: '2023-12-07'
      }
    } // Sensor 6
  ]);
  /* Functions */
  const handleAddMarker = markerInfo => {
    setLoading(true);
    setTimeout(() => {
      setMarkerList([...markerList, markerInfo]);
      setLoading(false);
    }, 5000);
  };
  /* Hooks */
  /* Render */
  return (
    <>
      <Loading loading={loading} setLoading={setLoading} />
      <HomePresenter
        markerList={markerList}
      setMarkerList={setMarkerList}
        handleAddMarker={handleAddMarker}
      />
    </>
  );
};

export default HomeContainer;
