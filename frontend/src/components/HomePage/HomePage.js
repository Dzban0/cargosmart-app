import React, { useState } from "react";
import './HomePage.css';
import Dashboard from '../Dashboard/Dashboard';
import Warehouses from '../Warehouse/Warehouses';
import Transport from '../Transport/Transport';
import Document from "../Document/Document";
import SettingsPage from "../SettingsPage/SettingsPage";
import Support from "../Support/Support";

function HomePage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  if (isSettingsOpen) {
    return <SettingsPage onClose={handleCloseSettings} />;
  }

  const handleOpenSupport = () => {
    setIsSupportOpen(true);
  };

  const handleCloseSupport = () => {
    setIsSupportOpen(false);
  };

  if (isSupportOpen) {
    return <Support onClose={handleCloseSupport} />;
  }

  return (
    <div className="HomePage">
      <div className="top-bar">
        <h2 className="title">CargoSmart</h2>

        <div className="top-buttons">
          <button className="btn" onClick={handleOpenSettings}>
            Ustawienia
          </button>

          <button className="btn" onClick={handleOpenSupport}>
            Pomoc i Dokumentacja
          </button>

          <button className="btn" onClick={onLogout}>
            Wyloguj
          </button>
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </button>

        <button className={activeTab === "magazyn" ? "active" : ""} onClick={() => setActiveTab("magazyn")}>
          Magazyn
        </button>

        <button className={activeTab === "transport" ? "active" : ""} onClick={() => setActiveTab("transport")}>
          Transport
        </button>

        <button className={activeTab === "dokument" ? "active" : ""} onClick={() => setActiveTab("dokument")}>
          Dokumenty
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "magazyn" && <Warehouses onSelectWarehouse={(id) => setSelectedWarehouse(id)} selectedWarehouse={selectedWarehouse} />}
        {activeTab === "transport" && <Transport onSelectTransport={(id) => setSelectedTransport(id)} selectedTransport={selectedTransport} />}
        {activeTab === "dokument" && <Document />}
      </div>
    </div>
  );
}

export default HomePage;