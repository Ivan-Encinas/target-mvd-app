import { useEffect, useState } from 'react';
import { Marker, useMapEvents, Popup } from 'react-leaflet';
import myIcon from '../map/icon';
import { v4 as uuid } from 'uuid';

const Target = ({ sendLatLng, targets }) => {
  const [latLng, setLatLng] = useState(null);
  const clickOnMap = useMapEvents({
    click(e) {
      sendLatLng(e.latlng);
      setLatLng([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <>
      {targets.map((target, index) => (
        <Marker position={target} icon={myIcon} key={uuid()}>
          <Popup>{target[2]}</Popup>
        </Marker>
      ))}
      {latLng ? <Marker position={latLng} icon={myIcon} /> : null}
    </>
  );
};

export default Target;
