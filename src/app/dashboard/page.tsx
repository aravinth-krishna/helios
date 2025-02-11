"use client";

import React, { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar/DashboardSidebar";
import EfficiencyCalculator from "@/components/dashboard/EfficiencyCalculator/EfficiencyCalculator";
import MapLocationPicker from "@/components/dashboard/MapLocationPicker/MapLocationPicker";
import SolarSubsidyCalculator from "@/components/dashboard/SolarSubsidyCalculator/SolarSubsidyCalculator";
import Chat from "@/components/dashboard/Chat/Chat";
import styles from "./page.module.css";

const DashboardPage = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<string>("roi");

  const handleLocationChange = (latLng: { lat: number; lng: number }) => {
    setLatitude(latLng.lat);
    setLongitude(latLng.lng);
    console.log("Location received in DashboardPage:", latLng);
  };

  const renderContent = () => {
    switch (currentView) {
      case "roi":
        return (
          <div className={styles.componentWrapper}>
            <EfficiencyCalculator latitude={latitude} longitude={longitude} />
          </div>
        );
      case "chat":
        return (
          <div className={styles.componentWrapper}>
            <Chat />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <DashboardNavbar />
      <div className={styles.mainContent}>
        <DashboardSidebar onNavClick={setCurrentView} />
        <div className={styles.contentArea}>
          {currentView === "roi" && (
            <>
              {typeof latitude === "number" && typeof longitude === "number" ? (
                <div className={styles.componentWrapper}>
                  <EfficiencyCalculator
                    latitude={latitude}
                    longitude={longitude}
                  />
                </div>
              ) : (
                <p className={styles.placeholderText}>
                  Please select a location on the map to calculate solar
                  efficiency.
                </p>
              )}
              <MapLocationPicker onLocationChange={handleLocationChange} />
            </>
          )}
          {currentView === "chat" && (
            <div className={styles.componentWrapper}>
              <Chat />
            </div>
          )}
          {currentView === "incentive" && (
            <div>
              <div className={styles.placeholderText}>
                <SolarSubsidyCalculator />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
