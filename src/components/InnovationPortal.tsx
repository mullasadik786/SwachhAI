import React, { useState } from "react";

export interface BorderVillageTrail {
  id: string;
  villageName: string;
  state: "Ladakh" | "Himachal" | "Arunachal";
  pollutionLevel: "High" | "Medium" | "Low";
  coordinates: { lat: number; lng: number };
  plasticWeightCollectedKg: number;
}

export const InnovationPortal: React.FC = () => {
  const [vvpMode, setVvpMode] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>("All");

  const [trails] = useState<BorderVillageTrail[]>([
    { id: "1", villageName: "Diskit (Nubra)", state: "Ladakh", pollutionLevel: "High", coordinates: { lat: 34.54, lng: 77.56 }, plasticWeightCollectedKg: 140 },
    { id: "2", villageName: "Kalpa (Kinnaur)", state: "Himachal", pollutionLevel: "Medium", coordinates: { lat: 31.53, lng: 78.25 }, plasticWeightCollectedKg: 85 },
    { id: "3", villageName: "Zemithang (Tawang)", state: "Arunachal", pollutionLevel: "High", coordinates: { lat: 27.71, lng: 91.72 }, plasticWeightCollectedKg: 210 },
  ]);

  const filteredTrails = selectedState === "All" ? trails : trails.filter(t => t.state === selectedState);

  return (
    <div style={{ padding: "24px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.2)", color: "white", marginTop: "24px" }}>
      <div style={{ display: "flex", justifyContent: "between", alignItems: "center" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>🌄 Vibrant Villages Programme (VVP) Eco-Tracker</h2>
        <button onClick={() => setVvpMode(!vvpMode)} style={{ padding: "8px 16px", borderRadius: "20px", background: vvpMode ? "#10b981" : "rgba(255,255,255,0.2)", color: "white", border: "none", cursor: "pointer" }}>
          {vvpMode ? "VVP Active" : "Enable VVP Mode"}
        </button>
      </div>
      {vvpMode && (
        <div style={{ marginTop: "16px" }}>
          <p style={{ fontSize: "14px", color: "#cbd5e1" }}>Border villages are ecologically sensitive. Clean plastic wastes to protect Himalayan rivers!</p>
          <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
            {["All", "Ladakh", "Himachal", "Arunachal"].map((state) => (
              <button key={state} onClick={() => setSelectedState(state)} style={{ padding: "4px 12px", fontSize: "12px", borderRadius: "8px", background: selectedState === state ? "#f97316" : "rgba(255,255,255,0.1)", color: "white", border: "none", cursor: "pointer" }}>
                {state}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredTrails.map((trail) => (
              <div key={trail.id} style={{ padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "14px" }}>{trail.villageName} ({trail.state})</h4>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>GPS: {trail.coordinates.lat}, {trail.coordinates.lng}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "12px", padding: "2px 8px", borderRadius: "12px", background: trail.pollutionLevel === "High" ? "rgba(239,68,68,0.2)" : "rgba(234,179,8,0.2)", color: trail.pollutionLevel === "High" ? "#f87171" : "#facc15" }}>{trail.pollutionLevel} Threat</span>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#34d399" }}>🎒 {trail.plasticWeightCollectedKg} kg cleaned</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
