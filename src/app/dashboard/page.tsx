"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar/DashboardNavbar";
import EfficiencyCalculator from "@/components/dashboard/EfficiencyCalculator/EfficiencyCalculator";
import MapLocationPicker from "@/components/dashboard/MapLocationPicker/MapLocationPicker";
import React, { useState } from "react";
import styles from "./page.module.css"; // Import CSS Modules

const DashboardPage = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleLocationChange = (latLng: { lat: number; lng: number }) => {
    setLatitude(latLng.lat);
    setLongitude(latLng.lng);
    console.log("Location received in DashboardPage:", latLng);
  };

  return (
    <div>
      <DashboardNavbar />
      <div className={styles.sideBySideContainer}>
        <div className={styles.componentWrapper}>
          <EfficiencyCalculator latitude={latitude} longitude={longitude} />
        </div>
        <div>
          <MapLocationPicker onLocationChange={handleLocationChange} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
