import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import marker from './icon';
import { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css';
import './styles.scss';

const MapView = () => {
  const [position, setPosition] = useState({
    where: [],
  });
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const geolocationEnabled = () => {
    return navigator.geolocation.getCurrentPosition(
      position => {
        geoSuccess(position);
      },
      () => {},
      geoOptions
    );
  };

  const geoSuccess = position => {
    setPosition({
      where: [position.coords.latitude, position.coords.longitude],
    });
  };

  useEffect(() => {
    return geolocationEnabled();
  }, []);

  return (
    position.where?.length === 2 && (
      <MapContainer
        className="map__container"
        center={position.where}
        zoom="20"
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position.where} icon={marker}>
          <Popup>You are here.</Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default MapView;
