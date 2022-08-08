import { useState } from 'react';
import { Marker, useMapEvents, Popup } from 'react-leaflet';

import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';

import { useDeleteTargetMutation } from 'services/target/target';
import myIcon from '../map/icon';
import endpoints from 'constants/endpoints';
import useTranslation from 'hooks/useTranslation';
import { COLORS } from 'styles/constants';

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
      confirmButtonColor: COLORS.confirmButtonColor,
      cancelButtonColor: COLORS.cancelButtonColor,
      confirmButtonText: t('target.delete.confirm'),
    }).then(result => {
      if (result.isConfirmed) {
        let urlDelete = `${deleteEndpoint}${targetId}`;
        deleteTargetQuery(urlDelete);
      }
    });
  };

  return (
    <>
      {targets.map(target => (
        <Marker position={target} icon={myIcon} key={uuid()}>
          <Popup className="popup__container">
            <button
              type="button"
              className="delete__button"
              onClick={() => deleteTarget(target.id)}
            >
              {t('target.delete.button')}
            </button>
          </Popup>
        </Marker>
      ))}
      {latLng && <Marker position={latLng} icon={myIcon} />}
    </>
  );
};

export default Target;
