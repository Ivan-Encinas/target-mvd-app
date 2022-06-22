import { useEffect, useState } from 'react';
import { Marker, useMapEvents, Popup } from 'react-leaflet';
import myIcon from '../map/icon';

const Target = ({ sendLatLng, targets }) => {
  console.log(targets, 'TARGETSSSS');
  const [latLng, setLatLng] = useState(null);
  const clickOnMap = useMapEvents({
    click(e) {
      console.log(e, 'EEEE');
      sendLatLng(e.latlng);
      setLatLng([e.latlng.lat, e.latlng.lng]);
    },
  });
  useEffect(() => {}, [latLng]);
  return (
    <>
      {targets.map(
        (target, index) => (
          console.log(target, 'TARG'),
          (
            <Marker position={target} icon={myIcon} key={index}>
              <Popup>{target[2]}</Popup>
            </Marker>
          )
        )
      )}
      {latLng ? <Marker position={latLng} icon={myIcon} /> : null}
    </>
  );
};

export default Target;
