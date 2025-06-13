import { useEffect, useRef } from "react";
import { useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

// 💡 Component: RoutingMachine
export const RoutingMachine = ({ start, end, onRouteFound }) => {
  const map = useMapEvents({});
  const controlRef = useRef(null);

  useEffect(() => {
    if (!start || !end || !map) return;

    // Clean up existing control
    if (controlRef.current) {
      try {
        const router = controlRef.current.getRouter?.();
        if (router && typeof router.abort === "function") {
          router.abort();
        }
        map.removeControl(controlRef.current);
      } catch (err) {
        console.warn("Error cleaning up routing control:", err);
      }
      controlRef.current = null;
    }

    // Add routing control
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
      createMarker: () => null,
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: "#3b82f6", weight: 7, opacity: 0.8 }],
      },
      router: L.Routing.osrmv1({ profile: "car", timeout: 10 * 1000 }),
    })
      .on("routesfound", (e) => {
        const route = e.routes?.[0];
        if (route && onRouteFound) {
          const summary = route.summary;
          onRouteFound({
            distance: (summary.totalDistance / 1000).toFixed(2) + " km",
            time: Math.round(summary.totalTime / 60) + " min",
          });
        }
      })
      .on("routingerror", (err) => {
        console.warn("Routing error:", err?.error || err);
      })
      .addTo(map);

    controlRef.current = routingControl;

    return () => {
      if (controlRef.current) {
        try {
          const router = controlRef.current.getRouter?.();
          if (router && typeof router.abort === "function") {
            router.abort();
          }
          map.removeControl(controlRef.current);
        } catch (err) {
          console.warn("Cleanup error in RoutingMachine:", err);
        }
        controlRef.current = null;
      }
    };
  }, [start, end, map, onRouteFound]);

  return null;
};

// 🌍 Function: Location Search (OpenCage)
export const searchLocation = async (
  searchQuery,
  setSuggestions,
  setLoading
) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  if (!searchQuery.trim()) {
    setSuggestions([]);
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        searchQuery
      )}&key=${API_KEY}&limit=5`
    );
    const data = await response.json();

    const suggestions = data.results.map((item) => ({
      name: item.formatted,
      lat: item.geometry.lat,
      lon: item.geometry.lng,
      components: item.components,
    }));
    setSuggestions(suggestions);
  } catch (error) {
    console.error("Search error:", error);
    setSuggestions([]);
  }
  setLoading(false);
};
