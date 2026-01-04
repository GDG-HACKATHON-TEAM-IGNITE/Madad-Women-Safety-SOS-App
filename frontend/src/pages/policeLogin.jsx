import React, { useState } from "react";
import { generateToken } from "./firebaseConfig";

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgType, setMsgType] = useState("error"); 
  const API_URL = "http://localhost:5000/api/auth";

  const getDeviceId = () => {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = "device-" + Math.random().toString(36).substr(2, 9) + Date.now();
      localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
  };
  const handleRequestOtp = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      setMsgType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setStep(2); 
        setMessage("");
      } else {
        setMessage(data.error || "Failed to send OTP");
        setMsgType("error");
      }
    } catch (error) {
      setMessage("Server error. Is backend running?");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      setMsgType("error");
      return;
    }

    setLoading(true);
    const fcmToken = await generateToken();
    const deviceId = getDeviceId();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          deviceId,
          deviceName: "React Web Browser",
          fcmToken: fcmToken || " "
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Login Successful! Redirecting...");
        setMsgType("success");
        localStorage.setItem("token", data.token);
        setTimeout(() => alert("Welcome to the Dashboard!"), 500);
        if (props.onLoginSuccess) {
       props.onLoginSuccess(data.token);
   }
      } else {
        setMessage(data.message || "Invalid OTP");
        setMsgType("error");
      }
    } catch (error) {
      setMessage("Connection failed.");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Police Portal</h2>
          <p style={styles.subtitle}>Log in</p>
        </div>

        {step === 1 && (
          <div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={styles.input}
              />
            </div>
            <button
              onClick={handleRequestOtp}
              disabled={loading}
              style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Enter 6-digit OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength="6"
                style={styles.input}
              />
            </div>
            <p style={styles.infoText}>
              OTP sent to <span>{email}</span>
            </p>
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
            <button onClick={() => setStep(1)} style={styles.linkBtn}>
              Change Email
            </button>
          </div>
        )}
        {message && (
          <p
            style={{
              ...styles.message,
              color: msgType === "success" ? "#4ade80" : "#ef4444",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    fontFamily: "'Segoe UI', sans-serif",
    color: "white",
  },
  container: {
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  header: { marginBottom: "1rem" },
  title: { marginBottom: "0.5rem", color: "#38bdf8", margin: 0 },
  subtitle: { color: "#94a3b8", fontSize: "0.9rem", marginTop: "5px" },
  inputGroup: { textAlign: "left", marginBottom: "1.5rem" },
  label: { display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#cbd5e1" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s",
  },
  infoText: { color: "#94a3b8", marginBottom: "1rem", fontSize: "0.85rem" },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    marginTop: "15px",
    fontSize: "0.8rem",
    textDecoration: "underline",
    cursor: "pointer",
    display: "block",
    width: "100%",
  },
  message: { marginTop: "1rem", fontSize: "0.9rem", minHeight: "20px" },
};

export default Login;