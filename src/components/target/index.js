import { useState } from 'react';
import { Marker, useMapEvents, Popup } from 'react-leaflet';

import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';

import { useDeleteTargetMutation } from 'services/target/target';
import myIcon from '../map/icon';
import endpoints from 'constants/endpoints';
import useTranslation from 'hooks/useTranslation';

import './styles.scss';

const Target = ({ sendLatLng, targets }) => {
  const [latLng, setLatLng] = useState(null);
  const t = useTranslation();
  const deleteEndpoint = endpoints.DELETE_TARGET;
  const [deleteTargetQuery] = useDeleteTargetMutation();
  const clickOnMap = useMapEvents({
    click(e) {
      sendLatLng(e.latlng);
      setLatLng([e.latlng.lat, e.latlng.lng]);
    },
  });

  const deleteTarget = targetId => {
    Swal.fire({
      title: t('target.delete.question'),
      text: t('target.delete.alert'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('target.delete.confirm'),
    }).then(result => {
      if (result.isConfirmed) {
        let urlDelete = deleteEndpoint + targetId;
        deleteTargetQuery(urlDelete);
      }
    });
  };

  return (
    <>
      {targets.map(target => (
        <Marker position={target} icon={myIcon} key={uuid()}>
          <Popup className="popup__containter">
            <button
              type="button"
              className="delete__button"
              onClick={() => deleteTarget(target[2])}
            >
              Delete
            </button>
          </Popup>
        </Marker>
      ))}
      {latLng && <Marker position={latLng} icon={myIcon} />}
    </>
  );
};

export default Target;
