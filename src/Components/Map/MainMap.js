import { Map } from '@vis.gl/react-google-maps';
import PoiMarkers from './PoiMarkers';

const defaultCenter = {
  lat: 35.179737,
  lng: 129.075952
};

const MainMap = ({
  markerList,
  setMarkerList,
  handleSelectMarker,
  selectMarker,
  handleClickMap
}) => {
  return (
    <Map
      mapId="SmartCityLab"
      defaultZoom={15}
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
      <PoiMarkers
        markerList={markerList}
        setMarkerList={setMarkerList}
        handleSelectMarker={handleSelectMarker}
        selectMarker={selectMarker}
      />
    </Map>
  );
};

export default MainMap;
