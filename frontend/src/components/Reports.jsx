import React, { useState, useEffect } from "react";

const Reports = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  });

  const incidentTypes = [
    { id: 1, title: "Harassment", description: "Verbal, Physical", icon: "ri-user-voice-line" },
    { id: 2, title: "Theft", description: "Robbery, Theft", icon: "ri-handbag-line" },
    { id: 3, title: "Assault", description: "Physical harm", icon: "ri-alarm-warning-line" },
    { id: 4, title: "Stalking", description: "Being followed", icon: "ri-eye-line" },
    { id: 5, title: "Poor Lighting", description: "Dark areas", icon: "ri-lightbulb-flash-line" },
    { id: 6, title: "Other", description: "Other issue", icon: "ri-more-2-line" },
  ];

  const riskLevels = [
    { id: 1, label: "Low Risk", description: "Minor concern", icon: "🟢" },
    { id: 2, label: "Medium Risk", description: "Moderate risk", icon: "🟡" },
    { id: 3, label: "High Risk", description: "Immediate danger", icon: "🔴" },
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("unsafeReport"));
    if (saved) {
      setFormData(saved.formData);
      setSelectedIncident(saved.selectedIncident);
      setSelectedRisk(saved.selectedRisk);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "unsafeReport",
      JSON.stringify({ formData, selectedIncident, selectedRisk })
    );
  }, [formData, selectedIncident, selectedRisk]);

  const handleChange = (key, value) =>
    setFormData({ ...formData, [key]: value });

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f4f8fc] to-[#eef3f9] px-6 py-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl lg:text-5xl text-center lg:text-left font-bold mb-4 mt-5 lg:mt-0">
            Report Un<span className="text-[#A7C7E7]">safe Zone</span>
          </h1>

          <p className="text-gray-600 max-w-lg mb-8 text-center lg:text-left">
            Help keep your community safe by reporting locations that feel unsafe
            or suspicious.
          </p>

          {/* Location Card */}
          <div className="mb-8 p-4 rounded-2xl bg-[#a7c7e7] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#a7c7e7] text-xl">
                <i className="ri-map-pin-line" />
              </div>
              <div className="text-white">
                <p className="text-xs opacity-80">REPORTING FROM</p>
                <p className="font-semibold">New Delhi, India</p>
              </div>
            </div>
            <button className="bg-white text-[#a7c7e7] px-5 py-2 rounded-xl font-semibold">
              Edit
            </button>
          </div>

          {/* Incident Types */}
          <p className="mb-4 text-sm text-gray-500">What happened?</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {incidentTypes.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedIncident(item.id)}
                className={`cursor-pointer p-4 rounded-2xl transition-all duration-200
                ${
                  selectedIncident === item.id
                    ? "bg-[#a7c7e7] text-white shadow-sm"
                    : "bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#f2f6fb] flex items-center justify-center text-xl text-[#a7c7e7]">
                    <i className={item.icon} />
                  </div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-center lg:text-left">Your Details</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <input
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="First name"
              className="input bg-[#f2f6fb] px-3 py-3 rounded-xl"
            />
            <input
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Last name"
              className="input bg-[#f2f6fb] px-3 py-3 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email address"
              className="input bg-[#f2f6fb] px-3 py-3 rounded-xl"
            />
            <input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Phone number"
              className="input bg-[#f2f6fb] px-3 py-3 rounded-xl"
            />
          </div>

          {/* Risk */}
          <p className="text-sm mb-3 text-gray-500">Severity</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {riskLevels.map((risk) => (
              <div
                key={risk.id}
                onClick={() => setSelectedRisk(risk.id)}
                className={`cursor-pointer p-3 rounded-xl text-center transition
                ${
                  selectedRisk === risk.id
                    ? "bg-[#a7c7e7] text-white"
                    : "bg-[#f2f6fb]"
                }`}
              >
                <p className="text-lg">{risk.icon}</p>
                <p className="text-xs font-semibold">{risk.description}</p>
              </div>
            ))}
          </div>

          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe what happened"
            className="w-full h-28 p-4 rounded-xl bg-[#f2f6fb] resize-none mb-3 outline-none"
          />

          <p className="text-xs text-gray-400 mb-4">
            Your information is private and will never be shared publicly.
          </p>

          <button className="w-full py-3 rounded-xl bg-[#a7c7e7] text-white font-semibold hover:opacity-90 transition">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
