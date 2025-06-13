// File: src/pages/MapView.jsx
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import SearchBox from "../components/SearchBox";
import "../styles/MapView.css";
import { RoutingMachine } from "../context/map.js";
import FlyToLocation from "../components/FlyToLocation.jsx";
import { throttle } from "lodash";

// Fix Leaflet's default marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const startIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const endIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapClickHandler = ({ onClick }) => {
  useMapEvents({ click: throttle((e) => onClick(e.latlng), 1000) });
  return null;
};

const MapView = () => {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        const location = [coords.latitude, coords.longitude];
        setMapCenter(location);
        setUserLocation({ lat: coords.latitude, lng: coords.longitude });
      },
      (err) => console.error("Location error:", err)
    );
  }, []);

  const fetchLocationName = async (latlng) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latlng.lat}+${latlng.lng}&key=${API_KEY}&limit=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      // ✅ Correct field for OpenCage
      return (
        data.results[0]?.formatted ||
        `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`
      );
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
    }
  };

  const handleMapClick = async (latlng) => {
    const name = await fetchLocationName(latlng);
    const location = { lat: latlng.lat, lng: latlng.lng, name };

    if (!fromLocation) {
      setFromLocation(location);
    } else if (!toLocation) {
      setToLocation(location);
    } else {
      setFromLocation(location);
      setToLocation(null);
      setRouteInfo(null);
    }
  };

  const clearRoute = () => {
    setFromLocation(null);
    setToLocation(null);
    setRouteInfo(null);
  };

  const useCurrentLocation = () => {
    if (userLocation) {
      setFromLocation({ ...userLocation, name: "Current Location" });
    }
  };

  return (
    <div className="map-view">
      <div className="map-controls">
        <div className="search-container">
          <div className="input-container-box">
            <label>From:</label>
            <SearchBox
              placeholder="Enter starting location"
              onLocationSelect={(loc) => {
                setFromLocation(loc);
                setRouteInfo(null);
              }}
              value={fromLocation?.name || ""}
            />
          </div>
          <div className="input-container-box">
            <label>To:</label>
            <SearchBox
              placeholder="Enter destination"
              onLocationSelect={(loc) => {
                setToLocation(loc);
                setRouteInfo(null);
              }}
              value={toLocation?.name || ""}
              disabled={!fromLocation}
            />
          </div>
        </div>

        <div className="clear-curr-location-container">
          <div className="search-row">
            <button
              onClick={useCurrentLocation}
              className="current-location-btn"
            >
              Use Current Location
            </button>
          </div>
          <div className="search-row">
            <button onClick={clearRoute} className="clear-route-btn">
              Clear Location
            </button>
          </div>

          {routeInfo && (
            <div className="route-info">
              <span>📏 {routeInfo.distance}</span>
              <span>⏱️ {routeInfo.time}</span>
            </div>
          )}
        </div>

        <p className="map-instructions">
          {!fromLocation
            ? "Click or search to set starting point."
            : !toLocation
            ? "Click or search to set destination."
            : "Click again to reset."}
        </p>
      </div>

      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onClick={handleMapClick} />

          {fromLocation && (
            <Marker
              position={[fromLocation.lat, fromLocation.lng]}
              icon={startIcon}
            >
              <Popup>
                <strong>Start:</strong>
                <br />
                {fromLocation.name}
              </Popup>
            </Marker>
          )}

          {toLocation && (
            <Marker position={[toLocation.lat, toLocation.lng]} icon={endIcon}>
              <Popup>
                <strong>Destination:</strong>
                <br />
                {toLocation.name}
              </Popup>
            </Marker>
          )}

          {fromLocation && toLocation && (
            <RoutingMachine
              start={fromLocation}
              end={toLocation}
              onRouteFound={setRouteInfo}
            />
          )}

          {(fromLocation || toLocation) && (
            <FlyToLocation
              position={[
                (toLocation || fromLocation).lat,
                (toLocation || fromLocation).lng,
              ]}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
