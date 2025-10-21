import React from "react";
import stasik from "./assets/mascots/IMG_9084.PNG";
import koshara from "./assets/mascots/IMG_9083.PNG";

export default function App() {
  const box = {
    border: "2px solid #333",       // ← рамка, чтобы было видно
    padding: 8,
    borderRadius: 12,
    width: 220,
    textAlign: "center",
    background: "rgba(255,255,255,0.7)"
  };

  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <h1>Lazy Busters</h1>
      <p>Beat laziness and grow your own pet habit buddy!</p>

      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 24 }}>
        <div style={box}>
          <img src={stasik} alt="Stasik" width={180} />
          <h3>Stasik 🐹</h3>
        </div>
        <div style={box}>
          <img src={koshara} alt="Koshara" width={180} />
          <h3>Koshara 🐱</h3>
        </div>
      </div>
    </div>
  );
}