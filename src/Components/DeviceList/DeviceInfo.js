import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import moment from 'moment';

const originDataExample = data => {
    console.log(data);
    // return "timestamp=2024-12-06 00:17:59|location=lat:35.230852,lon:129.083669|sensor=pnu002-solar|type=solar|production=0.13 kWh|status=active|powerStatus=normal|temperature=25.3°C|humidity=60%|maintenanceStatus=ok|lastCheck=2024-12-01|efficiency=95%|capacity=10 kW|operationalHours=1250h|alert=none"
  return `timestamp=${data.time}/location=${data.location.lat},${data.location.lng}/sensor=${data.name}/type=${data.type}/production=${data.value} kWh/status=active/powerStatus=normal/temperature=25.3°C/humidity=60%/maintenanceStatus=ok/lastCheck=2024-12-01/efficiency=95%/capacity=10 kW/operationalHours=1250h/alert=none`;
};

const deviceExample = {
  sensorType: '태양광',
  sensorName: '부산대학교 태양광 센서 0',
  time: '2024-01-01 00:00:00',
  value: 100,
  location: {
    lat: 35.231242,
    lng: 129.083068
  },
  manufacturer: '제조사 A',
  model: '모델 X',
  serialNumber: 'SN123456',
  installationDate: '2023-12-01'
};

const requestBodyExample = data => {
  const {
    sensorType,
    name,
    time,
    value,
    location,
    manufacturer,
    model,
    serialNumber,
    installationDate
  } = data;
  return {
    id: `urn:ngsi-ld:${sensorType}:${name}`,
    type: sensorType,
    category: {
      type: 'Property',
      value: name
    },
    production: {
      type: 'Property',
      value: value,
      unitCode: 'kWh',
      date: time
    },
    status: {
      type: 'Property',
      value: 'active'
    },
    location: {
      type: 'GeoProperty',
      value: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      }
    },
    manufacturer: {
      type: 'Property',
      value: manufacturer
    },
    model: {
      type: 'Property',
      value: model
    },
    serialNumber: {
      type: 'Property',
      value: serialNumber
    },
    installationDate: {
      type: 'Property',
      value: installationDate
    }
  };
};

const DeviceInfo = ({ marker, handleSelectMarker }) => {
  const { name, description, location, key, created_at } = marker;
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [detailInfo, setDetailInfo] = useState({});
  const [dataList, setDataList] = useState([]);

  const handleDetailInfo = info => {
    setDetailInfo(info);
    setIsModal(true);
  };

  useEffect(() => {
    setDataList(
      Array.from({ length: 10 }, (_, index) => {
        const now = new Date();
        const randomStart = new Date(now.getTime() - Math.random() * 15 * 60 * 1000);
        const time = new Date(randomStart.getTime() + index * 15 * 60 * 1000).toLocaleString();
        return {
          id: v4(),
          time: time,
          value: Math.random().toFixed(2)
        };
      })
    );
  }, []);

  return dataList.length > 0 ? (
    <div className="flex flex-col gap-2 justify-between border-b-2 border-gray-300 py-5">
      <h3 className="text-md font-bold">
        {name}
      </h3>
      <p className="text-sm">
        <span className="font-bold">Description:</span> {description}
      </p>
      <p className="text-sm">
        {location.lat}, {location.lng}
      </p>
      <p className="text-sm">
        <span className="font-bold">Status:</span> Normal
      </p>
      <p className="text-sm">
        <span className="font-bold">Last Update:</span>{' '}
        {new Date() - new Date(created_at) < 15 * 60 * 1000
          ? '방금'
          : dataList[0].time
        }
      </p>
      <div className="flex gap-2 justify-between">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-md flex-1"
          onClick={() => handleSelectMarker(marker)}
        >
          View
        </button>
        <button
          className="bg-green-500 text-white px-2 py-1 rounded-md flex-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          Data Transfer Info
        </button>
      </div>
      <div
        className={`w-full transition-all duration-500 overflow-hidden ${isOpen
          ? 'max-h-screen'
          : 'max-h-0'}`}
      >
        <h1 className="text-lg font-bold">Data Transfer Info</h1>
        {new Date() - new Date(created_at) < 15 * 60 * 1000
          ? <>데이터 없음</>
          : <ul>
          {dataList.map((data, index) => {
            const { time, value } = data;
            return (
              <li key={index} className="py-2">
                {time}: {value} kWh
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                  onClick={() => handleDetailInfo(data)}
                >
                  상세보기
                </button>
              </li>
            );
          })}
        </ul>}
      </div>
      {isModal &&
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">상세보기</h2>
            <div className="overflow-y-auto max-h-400px">
              <p className="text-sm mb-2 border-b-2 border-gray-300 pb-2">
                <span className="font-bold">URL:</span>{' '}
                https://smartcitylab-sensor.islab.dev/api/sensor/data/{key}
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">OriginData:</span>{' '}
              </p>
              <div className="overflow-y-auto max-h-40 bg-gray-200 p-2 rounded-md">
                <pre className="text-sm bg-gray-200 p-2 rounded-md">
                  {originDataExample({ ...detailInfo, ...marker })}
                </pre>
              </div>
              <p className="text-sm mb-2">
                <span className="font-bold">RequestBody:</span>{' '}
              </p>
              <pre className="text-sm bg-gray-200 p-2 rounded-md">
                {JSON.stringify(
                  requestBodyExample({ ...detailInfo, ...marker }),
                  null,
                  2
                )}
              </pre>
              <p className="text-sm mb-2">
                <span className="font-bold">Response:</span>{' '}
              </p>
              <pre className="text-sm bg-gray-200 p-2 rounded-md">
                {JSON.stringify(
                  { result: '0', data: null, message: 'SUCCESS' },
                  null,
                  2
                )}
              </pre>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => setIsModal(false)}
            >
              닫기
            </button>
          </div>
        </div>}
    </div>
  ) : null;
};

export default DeviceInfo;
