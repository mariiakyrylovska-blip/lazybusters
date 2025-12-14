import React from "react";
import "./Dashboard.css";

export default function Dashboard({ session, onLogout }) {
  const mascots = [
    { id: 1, name: "Stasik", image: "/stasik.png" },
    { id: 2, name: "Koshara", image: "/koshara.png" },
  ];

  return (
    <div className="dashboard-page">
      {/* Header with user info and logout */}
      <div className="dashboard-header">
        <div className="user-greeting">
          <h1 className="greeting-title">Welcome back!</h1>
          <p className="user-email">{session.user.email}</p>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Log out
        </button>
      </div>

      {/* Main content */}
      <div className="dashboard-content">
        <div className="mascots-container">
          {mascots.map((mascot) => (
            <div key={mascot.id} className="mascot-card">
              <div className="mascot-image-container">
                <img
                  src={mascot.image}
                  alt={mascot.name}
                  className="mascot-image"
                />
              </div>
              <p className="mascot-name">{mascot.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

