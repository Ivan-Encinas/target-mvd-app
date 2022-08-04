import { useEffect, useState } from 'react';

import MapView from 'components/map';
import { useGetTargetsQuery } from 'services/target/target';
import NewTarget from 'components/createTarget';
import EditProfile from 'components/editProfile';
import Chats from 'components/chats';
import SideBar from 'components/sideBar';
import { CREATE, EDIT, HOME } from 'constants/constants';

import 'components/sideBar/styles.scss';
import './styles.scss';

const Home = () => {
  const { data: targets } = useGetTargetsQuery();
  const [targetsList, setTargetsList] = useState([]);
  const [latLng, setLatLng] = useState({});
  const [tabSelected, setTabSelected] = useState(HOME);
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
      targetsParsedList.push([target.target.lat, target.target.lng, target.target.id]);
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

  const title = tabSelected => {
    if (tabSelected === CREATE) {
      return 'sideBar.create.title';
    }
    if (tabSelected === EDIT) {
      return 'profile.edit.subtitle';
    }
    return 'menu.chats';
  };

  return (
    <div className="home">
      <MapView currentPosition={currentPosition} sendLatLng={sendLatLng} targets={targetsList} />
      <SideBar title={title(tabSelected)} switchTab={switchTag}>
        {(() => {
          switch (tabSelected) {
            case HOME:
              return <Chats />;
            case CREATE:
              return <NewTarget sendLatLng={latLng} />;
            case EDIT:
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
