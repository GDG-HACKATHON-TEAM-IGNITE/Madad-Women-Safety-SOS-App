import React, { useState } from "react";

const Dashboard = ({ onLogout }) => {
//mock data
  const [alerts, setAlerts] = useState([
    { id: 1, user: "Anjali S.", type: "SOS Alert", time: "10:42 AM", location: "City Place", status: "Active" },
    { id: 2, user: "Priya M.", type: "Harassment", time: "10:30 AM", location: "MetroStation Gate 4", status: "Resolved" },
    { id: 3, user: "Unknown", type: "Suspicious Activity", time: "09:15 AM", location: "Sector 4 Park", status: "Pending" },
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.logo}>Civic Eye <span style={styles.badge}>POLICE</span></h2>
          <p style={styles.subtext}>Control Room: Delhi-NCR</p>
        </div>

        <div style={styles.alertList}>
          <h3 style={styles.sectionTitle}>Incoming Alerts ({alerts.length})</h3>
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              style={{
                ...styles.alertCard, 
                borderLeft: alert.status === "Active" ? "4px solid #ef4444" : "4px solid #10b981",
                backgroundColor: selectedAlert === alert.id ? "#334155" : "#1e293b"
              }}
              onClick={() => setSelectedAlert(alert.id)}
            >
              <div style={styles.alertHeader}>
                <span style={styles.alertType}>{alert.type}</span>
                <span style={styles.alertTime}>{alert.time}</span>
              </div>
              <p style={styles.alertUser}>{alert.user}</p>
              <p style={styles.alertLoc}>📍 {alert.location}</p>
              {alert.status === "Active" && <span style={styles.liveTag}>LIVE TRACKING</span>}
            </div>
          ))}
        </div>

        <div style={styles.userProfile}>
          <div style={styles.avatar}>👮‍♂️</div>
          <div style={styles.userInfo}>
            <p style={styles.userName}>Officer Debasish</p>
            <p style={styles.userRole}>ID: #8821-Dispatch</p>
          </div>
          <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.topBar}>
          <h1 style={styles.pageTitle}>Live Situation Map</h1>
          <div style={styles.stats}>
            <span style={styles.statItem}>🔴 1 Critical</span>
            <span style={styles.statItem}>🟡 2 Patrols Nearby</span>
          </div>
        </div>

        <div style={styles.mapContainer}>
  
  <iframe
    width="100%"
    height="100%"
    frameBorder="0"
    scrolling="no"
    marginHeight="0"
    marginWidth="0"
    src="https://www.openstreetmap.org/export/embed.html?bbox=77.20,28.61,77.23,28.65&layer=mapnik"
    style={{ filter: "invert(90%) hue-rotate(180deg) contrast(90%)" }} 
  ></iframe>

  {selectedAlert && (
    <div style={styles.mapOverlay}>
      <h4 style={{ margin: "0 0 5px 0", color: "#0f172a" }}>Incident #{selectedAlert}</h4>
      <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569" }}>
http://googleusercontent.com/map_location_reference/1
        Dispatching unit to [Connaught Place](http://googleusercontent.com/map_location_reference/0)...
      </p>
      <button style={styles.actionBtn}>Mark Resolved</button>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", height: "100vh", width: "100vw", backgroundColor: "#0f172a", color: "white", fontFamily: "sans-serif" },
  

  sidebar: { width: "350px", backgroundColor: "#1e293b", borderRight: "1px solid #334155", display: "flex", flexDirection: "column", padding: "1rem" },
  sidebarHeader: { marginBottom: "2rem", borderBottom: "1px solid #334155", paddingBottom: "1rem" },
  logo: { margin: 0, color: "#e2e8f0" },
  badge: { backgroundColor: "#3b82f6", fontSize: "0.7rem", padding: "2px 6px", borderRadius: "4px", verticalAlign: "middle", marginLeft: "8px" },
  subtext: { color: "#94a3b8", fontSize: "0.8rem", marginTop: "5px" },
  
  sectionTitle: { fontSize: "0.9rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" },
  alertList: { flex: 1, overflowY: "auto" },
  alertCard: { backgroundColor: "#1e293b", padding: "1rem", borderRadius: "8px", marginBottom: "10px", cursor: "pointer", transition: "background 0.2s" },
  alertHeader: { display: "flex", justifyContent: "space-between", marginBottom: "5px" },
  alertType: { fontWeight: "bold", color: "#f87171" },
  alertTime: { fontSize: "0.8rem", color: "#94a3b8" },
  alertUser: { margin: 0, fontWeight: "500" },
  alertLoc: { margin: "5px 0 0 0", fontSize: "0.9rem", color: "#cbd5e1" },
  liveTag: { display: "inline-block", marginTop: "8px", backgroundColor: "#ef4444", color: "white", fontSize: "0.7rem", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", animation: "pulse 1.5s infinite" },

  userProfile: { marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #334155", display: "flex", alignItems: "center", gap: "10px" },
  avatar: { width: "40px", height: "40px", backgroundColor: "#475569", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" },
  userInfo: { flex: 1 },
  userName: { margin: 0, fontSize: "0.9rem", fontWeight: "bold" },
  userRole: { margin: 0, fontSize: "0.8rem", color: "#94a3b8" },
  logoutBtn: { backgroundColor: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" },


  mainContent: { flex: 1, display: "flex", flexDirection: "column" },
  topBar: { height: "60px", backgroundColor: "#1e293b", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", borderBottom: "1px solid #334155" },
  pageTitle: { fontSize: "1.2rem", margin: 0 },
  stats: { display: "flex", gap: "15px", fontSize: "0.9rem" },
  statItem: { backgroundColor: "#0f172a", padding: "5px 10px", borderRadius: "20px" },

  mapContainer: { flex: 1, position: "relative", backgroundColor: "#0f172a" },
  mapOverlay: { position: "absolute", bottom: "20px", left: "20px", backgroundColor: "white", color: "black", padding: "1rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", minWidth: "200px" },
  actionBtn: { width: "100%", marginTop: "10px", padding: "8px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }
};

export default Dashboard;