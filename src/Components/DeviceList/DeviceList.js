import React from 'react';
import DeviceInfo from './DeviceInfo';

const DeviceList = ({ markerList, keyword, handleSelectMarker }) => {
  const filteredList = markerList.filter(marker =>
    marker.name.includes(keyword)
  );
  return (
    <div className="w-full h-full p-4">
      <h2 className="text-lg font-bold border-b-2">Device List</h2>
      <div className="w-full h-full p-4 overflow-y-auto">
        {filteredList.map((marker, idx) =>
          <DeviceInfo
            key={idx}
            marker={marker}
            handleSelectMarker={handleSelectMarker}
          />
        )}
      </div>
    </div>
  );
};

DeviceList.defaultProps = {
  markerList: [],
  keyword: ''
};

export default DeviceList;
