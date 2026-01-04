import React, { useEffect, useRef } from "react";
import { socket } from "../sockets/sockets";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const mapIncident = (id) => {
  switch (id) {
    case 1: return "Harassment";
    case 2: return "Theft";
    case 3: return "Assault";
    case 4: return "Stalking";
    case 5: return "Poor Lighting";
    case 6: return "Other";
    default: return "Unknown";
  }
};

const mapRisk = (id) => {
  switch (id) {
    case 1: return "Minor Concern 🟢";
    case 2: return "Moderate Risk 🟡";
    case 3: return "Immediate Danger 🔴";
    default: return "Unknown";
  }
};


const Safety = () => {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const lastEmitRef = useRef(0);

  // 🔁 MAP + LIVE LOCATION
  useEffect(() => {
    const map = L.map("map").setView([0, 0], 2);
    mapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);


    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        if (!mapRef.current) return;

        // 🔴 OWN LIVE MARKER
        if (!markersRef.current.me) {
          markersRef.current.me = L.marker([latitude, longitude]).addTo(map);
          map.setView([latitude, longitude], 16);
        } else {
          markersRef.current.me.setLatLng([latitude, longitude]);
          map.panTo([latitude, longitude], { animate: true });
        }

        // 🔁 THROTTLED SOCKET EMIT (every 1.5s)
        const now = Date.now();
        if (now - lastEmitRef.current > 1500) {
          socket.emit("send-location", { latitude, longitude });
          console.log("location: ",{latitude,longitude})
          lastEmitRef.current = now;
        }
      },
      (err) => console.error("Geolocation error:", err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      map.remove();
    };
  }, []);

  // 👥 OTHER USERS (LIVE)
  useEffect(() => {
    const handleLocation = ({ id, latitude, longitude }) => {
      if (!mapRef.current || !id) return;

      if (markersRef.current[id]) {
        markersRef.current[id].setLatLng([latitude, longitude]);
      } else {
        markersRef.current[id] = L.marker([latitude, longitude]).addTo(
          mapRef.current
        );
      }

    };


    const handleDisconnect = (id) => {
      if (markersRef.current[id]) {
        mapRef.current.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
    };

    socket.on("receive-location", handleLocation);
    socket.on("user-disconnected", handleDisconnect);

    return () => {
      socket.off("receive-location", handleLocation);
      socket.off("user-disconnected", handleDisconnect);
    };
  }, []);


  useEffect(() => {
  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reports");
      const reports = await res.json();

      reports.forEach((report) => {
        const [lng, lat] = report.location.coordinates;

        // Avoid duplicate markers
        if (markersRef.current[`report-${report._id}`]) return;

        const marker = L.marker([lat, lng]).addTo(mapRef.current);

        marker.bindPopup(`
          <div style="font-size:13px">
            <p><strong>Incident:</strong> ${mapIncident(report.incidentType)}</p>
            <p><strong>Severity:</strong> ${mapRisk(report.riskLevel)}</p>
          </div>
        `);

        markersRef.current[`report-${report._id}`] = marker;
      });
    } catch (err) {
      console.error("Failed to load reports", err);
    }
  };

  if (mapRef.current) {
    fetchReports();
  }
}, []);


  return (
   <>
   <style>
    {`
      .leaflet-container {
        z-index: 0;
      }
    `}
  </style>
    <div className="w-full z-0 h-screen flex justify-center bg-linear-to-br from-[#f4f8fc] to-[#eef3f9]">
      <div id="map" className="w-[80%] h-[70vh] lg:h-[60vh] mt-10" />
    </div>
   </>
  );
};

export default Safety;
