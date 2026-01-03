import { createContext, useContext, useRef } from "react";
import { socket } from "../sockets/sockets";

const SOSContext = createContext(null);

export const SOSProvider = ({ children }) => {
  const watchIdRef = useRef(null);

  const startSOS = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const permission = await navigator.permissions.query({
      name: "geolocation",
    });

    console.log("Geo permission:", permission.state);

    if (permission.state === "denied") {
      alert("Please enable location access");
      return;
    }

    if (watchIdRef.current !== null) {
      console.log("SOS already running");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("LOCATION:", latitude, longitude);

        socket.emit("send-location", { latitude, longitude });
      },
      (error) => {
        console.error("GEO ERROR:", error);
      },
      { enableHighAccuracy: true }
    );

    console.log("SOS started");
  };

  const stopSOS = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      console.log("SOS stopped");
    }
  };

  return (
    <SOSContext.Provider value={{ startSOS, stopSOS }}>
      {children}
    </SOSContext.Provider>
  );
};

export const useSOS = () => {
  const context = useContext(SOSContext);
  if (!context) {
    throw new Error("useSOS must be used inside SOSProvider");
  }
  return context;
};
