// import { useMap } from "react-leaflet";

// function ChangeView({ center, zoom }) {
//   const map = useMap();
//   map.setView(center, zoom);
//   return null;
// }

// export default ChangeView;


import { useMap } from "react-leaflet";

function ChangeView(props) {
  const map = useMap();
  map.setView(props.center, props.zoom);
  return null;
}

export default ChangeView;
