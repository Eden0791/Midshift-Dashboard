import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// You can use any UI kit you like, I removed custom UI components for simplicity

const pastelColors = [
  "#FDA4AF", // Pink
  "#A5B4FC", // Blue
  "#6EE7B7", // Mint
  "#FBCFE8", // Lavender
  "#FDE68A", // Yellow
];

const months = [
  "2024-10", "2024-11", "2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05"
];

// Example data
const MPL_DATA = {
  "Sheila Mae Genodia":    [2, 3, 1, 0, 2, 1, 2, 1],
  "Julius Fernandez":      [1, 2, 1, 0, 1, 2, 1, 0],
  "Kahlynne Garganera":   [1, 2, 0, 1, 2, 2, 1, 1],
  "Rhay Mark":            [3, 2, 2, 1, 0, 2, 1, 1],
};

const TPL_MICHAELO = [2, 3, 1]; // March, April, May
const TPL_MONTHS = ["2025-03", "2025-04", "2025-05"];

const MA_LIST = ["Sheila Mae Genodia", "Julius Fernandez", "Kahlynne Garganera", "Rhay Mark"];

function getMplStats(data) {
  const total = data.reduce((a, b) => a + b, 0);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const bestMonth = months[data.indexOf(min)];
  const worstMonth = months[data.indexOf(max)];
  return { total, bestMonth, worstMonth, min, max };
}

export default function App() {
  const [selectedMA, setSelectedMA] = useState("Dashboard");

  // Prepare line data for dashboard
  const dashboardData = months.map((month, idx) => {
    const obj = { month };
    MA_LIST.forEach((ma) => {
      obj[ma] = MPL_DATA[ma][idx];
    });
    return obj;
  });

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #fde4cf, #a5b4fc)', padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 16 }}>
        🌈 Midshift MPL Dashboard <span style={{ fontSize: 18, color: '#7a7a7a' }}>(Oct 2024 – May 2025)</span>
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        <button onClick={() => setSelectedMA("Dashboard")} style={{ borderRadius: 99, padding: '8px 24px', fontWeight: 600, border: selectedMA === "Dashboard" ? 'none' : '1px solid #a5b4fc', background: selectedMA === "Dashboard" ? '#a5b4fc' : 'white', color: selectedMA === "Dashboard" ? '#fff' : '#333', cursor: 'pointer' }}>Dashboard</button>
        {MA_LIST.map((ma, i) => (
          <button
            key={ma}
            onClick={() => setSelectedMA(ma)}
            style={{
              borderRadius: 99,
              padding: '8px 24px',
              fontWeight: 600,
              background: selectedMA === ma ? pastelColors[i % pastelColors.length] : 'white',
              border: selectedMA === ma ? 'none' : `1px solid ${pastelColors[i % pastelColors.length]}`,
              color: selectedMA === ma ? '#333' : '#333',
              cursor: 'pointer'
            }}
          >
            {ma.split(" ")[0]}
          </button>
        ))}
        <button onClick={() => setSelectedMA("Michaelo Paler")}
          style={{
            borderRadius: 99,
            padding: '8px 24px',
            fontWeight: 600,
            background: selectedMA === "Michaelo Paler" ? pastelColors[4] : 'white',
            border: selectedMA === "Michaelo Paler" ? 'none' : `1px solid ${pastelColors[4]}`,
            color: selectedMA === "Michaelo Paler" ? '#333' : '#333',
            cursor: 'pointer'
          }}>
          Michaelo (TPL)
        </button>
      </div>

      {/* Dashboard */}
      {selectedMA === "Dashboard" && (
        <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff9', padding: 24, borderRadius: 24, boxShadow: '0 2px 16px #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#be185d', marginBottom: 12 }}>MPL Logs Overview</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={dashboardData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {MA_LIST.map((ma, idx) => (
                <Line key={ma} type="monotone" dataKey={ma} stroke={pastelColors[idx % pastelColors.length]} strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 18, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {MA_LIST.map((ma, i) => {
              const stats = getMplStats(MPL_DATA[ma]);
              return (
                <div key={ma} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 1px 8px #e0e7ef', padding: 18, minWidth: 220 }}>
                  <div style={{ fontWeight: 700, color: pastelColors[i % pastelColors.length], fontSize: 20 }}>{ma.split(" ")[0]}</div>
                  <div style={{ fontSize: 15, margin: '8px 0 2px 0' }}>Total Logs: <span style={{ fontWeight: 600 }}>{stats.total}</span></div>
                  <div style={{ fontSize: 14 }}>Best Month: <span style={{ fontWeight: 600, color: '#22c55e' }}>{stats.bestMonth.replace('2024-','').replace('2025-','')}</span></div>
                  <div style={{ fontSize: 14 }}>Challenging Month: <span style={{ fontWeight: 600, color: '#ef4444' }}>{stats.worstMonth.replace('2024-','').replace('2025-','')}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Individual MA Tabs */}
      {MA_LIST.map((ma, idx) => (
        selectedMA === ma && (
          <div key={ma} style={{ maxWidth: 650, margin: '0 auto', background: '#fff9', padding: 24, borderRadius: 24, boxShadow: '0 2px 16px #e2e8f0', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: pastelColors[idx % pastelColors.length] }}>{ma}</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={months.map((m, i) => ({ month: m, logs: MPL_DATA[ma][i] }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="logs" stroke={pastelColors[idx % pastelColors.length]} strokeWidth={4} dot={{ r: 7 }} activeDot={{ r: 10 }} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Total Logs: {getMplStats(MPL_DATA[ma]).total}</div>
              <div style={{ fontSize: 14 }}>Best Month: <span style={{ color: '#22c55e' }}>{getMplStats(MPL_DATA[ma]).bestMonth.replace('2024-','').replace('2025-','')}</span></div>
              <div style={{ fontSize: 14 }}>Challenging Month: <span style={{ color: '#ef4444' }}>{getMplStats(MPL_DATA[ma]).worstMonth.replace('2024-','').replace('2025-','')}</span></div>
            </div>
          </div>
        )
      ))}

      {/* Michaelo Paler (TPL) Tab */}
      {selectedMA === "Michaelo Paler" && (
        <div style={{ maxWidth: 650, margin: '0 auto', background: '#fff9', padding: 24, borderRadius: 24, boxShadow: '0 2px 16px #e2e8f0' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#facc15' }}>Michaelo Paler – TPL</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={TPL_MONTHS.map((m, i) => ({ month: m, logs: TPL_MICHAELO[i] }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="logs" stroke={pastelColors[4]} strokeWidth={4} dot={{ r: 7 }} activeDot={{ r: 10 }} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 18, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Total Logs: {TPL_MICHAELO.reduce((a, b) => a + b, 0)}</div>
            <div style={{ fontSize: 14 }}>Best Month: <span style={{ color: '#22c55e' }}>{TPL_MONTHS[TPL_MICHAELO.indexOf(Math.min(...TPL_MICHAELO))].replace('2025-','')}</span></div>
            <div style={{ fontSize: 14 }}>Challenging Month: <span style={{ color: '#ef4444' }}>{TPL_MONTHS[TPL_MICHAELO.indexOf(Math.max(...TPL_MICHAELO))].replace('2025-','')}</span></div>
          </div>
        </div>
      )}
    </main>
  );
}
