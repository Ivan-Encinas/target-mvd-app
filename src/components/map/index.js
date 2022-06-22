import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import marker from './icon';
import Target from '../target';

import 'leaflet/dist/leaflet.css';
import './styles.scss';

const MapView = props => {
  return (
    <>
      {props.currentPosition.where?.length === 2 ? (
        <MapContainer
          className="map__container"
          center={props.currentPosition.where}
          zoom="20"
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Target sendLatLng={props.sendLatLng} targets={props.targets} />
          <Marker position={props.currentPosition.where} icon={marker}>
            <Popup>You are here.</Popup>
          </Marker>
        </MapContainer>
      ) : null}
    </>
  );
};

export default MapView;
