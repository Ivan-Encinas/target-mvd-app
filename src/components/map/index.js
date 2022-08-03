import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import marker from './icon';
import Target from '../target';
import useTranslation from 'hooks/useTranslation';

import 'leaflet/dist/leaflet.css';
import './styles.scss';

const MapView = ({ currentPosition, sendLatLng, targets }) => {
  const t = useTranslation();
  return (
    <>
      {currentPosition.where?.length === 2 && (
        <MapContainer
          className="map__container"
          center={currentPosition.where}
          zoom="20"
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Target sendLatLng={sendLatLng} targets={targets} />
          <Marker position={currentPosition.where} icon={marker}>
            <Popup>{t('home.location')}</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default MapView;
