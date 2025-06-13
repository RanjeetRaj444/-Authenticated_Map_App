import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FlyToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15); // Adjust zoom if needed
    }
  }, [position, map]);

  return null;
};

export default FlyToLocation;
