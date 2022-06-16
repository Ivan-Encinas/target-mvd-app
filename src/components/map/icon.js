import L from 'leaflet';
import markerIcon from 'assets/marker.svg';

const marker = new L.icon({
  iconUrl: markerIcon,
  iconSize: [43, 50],
});

export default marker;
