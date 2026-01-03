import React, { useEffect, useState } from "react";

const Settings = () => {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  const [phones, setPhones] = useState([]);
  const [newPhone, setNewPhone] = useState("");

  /* 🔹 Simulated backend fetch */
  const fetchProfile = async () => {
    // replace with real API later
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          fullName: "Aegis",
          email: "user@aegisher.com",
          phones: [
            // { id: 1, number: "+91 98765 43210" },
            // { id: 2, number: "+91 90123 45678" },
          ],
        });
      }, 800)
    );
  };

  /* Load backend data */
  useEffect(() => {
    fetchProfile().then((data) => {
      setProfile({
        fullName: data.fullName,
        email: data.email,
      });
      setPhones(data.phones);
      setLoading(false);
    });
  }, []);

  /* Persist phones locally */
  useEffect(() => {
    localStorage.setItem("settingsPhones", JSON.stringify(phones));
  }, [phones]);

  const addPhone = () => {
    if (!newPhone.trim()) return;
    setPhones([...phones, { id: Date.now(), number: newPhone }]);
    setNewPhone("");
  };

  const deletePhone = (id) => {
    setPhones(phones.filter((p) => p.id !== id));
  };

  const updatePhone = (id, value) => {
    setPhones(
      phones.map((p) => (p.id === id ? { ...p, number: value } : p))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-sm rounded-3xl p-6 sm:p-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center lg:text-left">
            Settings <span className="text-[#a7c7e7]">Profile</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center lg:text-left">
            Manage your personal information and emergency contacts.
          </p>
        </div>

        {/* PROFILE */}
        <div className="mb-10">
          <h2 className="text-[#a7c7e7] font-semibold mb-4">
            Personal Information
          </h2>

          <input
            value={profile.fullName}
            disabled
            className="input w-full cursor-not-allowed bg-[#f2f6fb] px-3 py-3 rounded-xl mb-5"
          />

          <input
            value={profile.email}
            disabled
            className="input w-full cursor-not-allowed bg-[#f2f6fb] px-3 py-3 rounded-xl"
          />

          <p className="text-xs text-gray-400 mt-2">
            Name and email are managed securely by our system.
          </p>
        </div>

        {/* PHONES */}
        <div>
          <h2 className="text-[#a7c7e7] font-semibold mb-4">
            Phone Numbers
          </h2>

          <div className="space-y-3 mb-5">
            {phones.map((phone) => (
              <div
                key={phone.id}
                className="flex items-center gap-3 bg-[#f2f6fb] rounded-xl px-4 py-3"
              >
                <i className="ri-smartphone-line text-[#a7c7e7] text-xl" />

                <input
                  value={phone.number}
                  onChange={(e) =>
                    updatePhone(phone.id, e.target.value)
                  }
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />

                <button
                  onClick={() => deletePhone(phone.id)}
                  className="text-gray-400 hover:text-[#a7c7e7] transition"
                >
                  <i className="ri-delete-bin-line text-lg" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Add new phone number"
              className="input flex-1 bg-[#f2f6fb] px-3 py-3 rounded-xl focus:border-[#a7c7e7]"
            />
            <button
              onClick={addPhone}
              className="px-6 py-3 rounded-xl bg-[#a7c7e7] text-white font-semibold hover:opacity-90 transition"
            >
              Add Number
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Your contact details are private and used only for emergency
            purposes.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Settings;
