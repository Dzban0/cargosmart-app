import React, { useState } from "react";
import './HomePage.css';
import Warehouses from '../Warehouse/Warehouses';
import FAQ from "../FAQ/FAQ";

function HomePage() {

  const [activeTab, setActiveTab] = useState("magazyn");

  return (
    <div className="HomePage">
      <h2 className="title">CargoSmart - Zarządzanie magazynowaniem i transportem</h2>

      {/* Menu zakładek */}
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

        <button className={activeTab === "faq" ? "active" : ""} onClick={() => setActiveTab("faq")}>
          FAQ
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "dashboard" && <div className="dashboard-text">Witaj w panelu głównym!</div>}
        {activeTab === "magazyn" && <Warehouses />}
        {activeTab === "transport"}
        {activeTab === "faq" && <FAQ />}
      </div>
    </div>
  );
}

export default HomePage;