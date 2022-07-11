import useTranslation from 'hooks/useTranslation';
import MapView from 'components/map';
import { useGetTargetsQuery } from 'services/target/target';
import NewTarget from 'components/createTarget';
import EditProfile from 'components/editProfile';
import { useEffect, useState } from 'react';
import SideBar from 'components/sideBar';

import 'components/sideBar/styles.scss';
import './styles.scss';

const Home = () => {
  const create = 'CREATE_TARGET';
  const edit = 'EDIT_PROFILE';
  const { data: targets } = useGetTargetsQuery();
  const [targetsList, setTargetsList] = useState([]);
  const [latLng, setLatLng] = useState({});
  const [tabSelected, setTabSelected] = useState(create);
  const [currentPosition, setCurrentPosition] = useState({
    ready: false,
    where: [],
    error: null,
  });
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const geolocationEnabled = () => {
    setCurrentPosition({ ready: false, error: null });
    return navigator.geolocation.getCurrentPosition(
      position => {
        geoSuccess(position);
      },
      () => {},
      geoOptions
    );
  };

  const geoSuccess = position => {
    setCurrentPosition({
      ready: true,
      where: [position.coords.latitude, position.coords.longitude],
    });
  };

  useEffect(() => {
    geolocationEnabled();
  }, []);

  const parseTargets = () => {
    let targetsParsedList = [];
    targets?.targets.map(target => {
      targetsParsedList.push([target.target.lat, target.target.lng, target.target.title]);
    });
    setTargetsList(targetsParsedList);
  };

  useEffect(() => {
    parseTargets();
  }, [targets]);

  const sendLatLng = dataFromChild => {
    setLatLng(dataFromChild);
  };

  const switchTag = dataFromChild => {
    setTabSelected(dataFromChild);
  };

  return (
    <div className="home">
      <MapView currentPosition={currentPosition} sendLatLng={sendLatLng} targets={targetsList} />
      <SideBar
        title={tabSelected === create ? 'sideBar.create.title' : 'profile.edit.subtitle'}
        switchTab={switchTag}
      >
        {(() => {
          switch (tabSelected) {
            case create:
              return <NewTarget />;
            case edit:
              return <EditProfile />;
            default:
              return null;
          }
        })()}
      </SideBar>
    </div>
  );
};

export default Home;
