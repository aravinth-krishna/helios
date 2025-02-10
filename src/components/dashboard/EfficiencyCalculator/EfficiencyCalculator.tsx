"use client";

import React, { useState, useEffect } from "react";
import styles from "./EfficicencyCalculator.module.css"; // Import CSS Modules

interface SolarPerformanceCalculatorProps {
  latitude: number;
  longitude: number;
  defaultRoofArea?: number; // Optional default roof area
}

interface ApiResponse {
  properties?: {
    parameter?: {
      ALLSKY_SFC_SW_DWN?: {
        [date: string]: number;
      };
    };
  };
  header?: {
    title?: string;
    api?: {
      version?: string;
      name?: string;
    };
    sources?: string[];
    fill_value?: number;
    time_standard?: string;
    start?: string;
    end?: string;
  };
  messages?: any[];
  parameters?: {
    ALLSKY_SFC_SW_DWN?: {
      units?: string;
      longname?: string;
    };
  };
  times?: {
    data?: number;
    process?: number;
  };
}

const SolarPerformanceCalculator: React.FC<SolarPerformanceCalculatorProps> = ({
  latitude,
  longitude,
  defaultRoofArea = 100, // Default roof area if not provided
}) => {
  const [irradiance, setIrradiance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [panelEfficiency, setPanelEfficiency] = useState<number>(20);
  const [systemLosses, setSystemLosses] = useState<number>(15);
  const [estimatedACEnergy, setEstimatedACEnergy] = useState<number | null>(
    null
  );
  const [systemEfficiency, setSystemEfficiency] = useState<number | null>(null);
  const [roofArea, setRoofArea] = useState<number>(defaultRoofArea);
  const [slope, setSlope] = useState<number>(20);
  const [estimatedSystemCost, setEstimatedSystemCost] = useState<number>(10000);
  const [electricityCost, setElectricityCost] = useState<number>(0.15);
  const [roi, setRoi] = useState<number | null>(null);
  const [paybackPeriod, setPaybackPeriod] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${longitude}&latitude=${latitude}&start=20250201&end=20250202&format=JSON`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = (await response.json()) as ApiResponse;
        console.log("API Response:", data);

        const irradianceValue =
          data.properties?.parameter?.ALLSKY_SFC_SW_DWN?.["20250202"];
        setIrradiance(irradianceValue || null);

        if (irradianceValue !== null && irradianceValue !== undefined) {
          const inputEnergy = irradianceValue * roofArea;
          const potentialDCEnergy = inputEnergy * (panelEfficiency / 100);
          const calculatedACEnergy =
            potentialDCEnergy * (1 - systemLosses / 100);
          const calculatedSystemEfficiency =
            (calculatedACEnergy / inputEnergy) * 100;

          setEstimatedACEnergy(calculatedACEnergy);
          setSystemEfficiency(calculatedSystemEfficiency);

          // ROI Calculation (Simplified)
          const annualEnergyProduction = calculatedACEnergy * 365;
          const annualSavings = annualEnergyProduction * electricityCost;
          const calculatedPaybackPeriod = estimatedSystemCost / annualSavings;
          const calculatedROI =
            ((annualSavings * 25 - estimatedSystemCost) / estimatedSystemCost) *
            100;

          setRoi(calculatedROI);
          setPaybackPeriod(calculatedPaybackPeriod);
        }
      } catch (e: unknown) {
        setError(e as Error);
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    latitude,
    longitude,
    roofArea,
    panelEfficiency,
    systemLosses,
    electricityCost,
  ]);

  const handleEfficiencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPanelEfficiency(parseFloat(e.target.value));
  };

  const handleLossesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystemLosses(parseFloat(e.target.value));
  };

  const handleRoofAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoofArea(parseFloat(e.target.value));
  };

  const handleSlopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlope(parseFloat(e.target.value));
  };

  const handleSystemCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimatedSystemCost(parseFloat(e.target.value));
  };

  const handleElectricityCostChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setElectricityCost(parseFloat(e.target.value));
  };

  return (
    <div className={styles.calculatorContainer}>
      {" "}
      {/* Apply container style */}
      <h2 className={styles.calculatorTitle}>
        Solar Performance and ROI Calculator
      </h2>{" "}
      {/* Apply title style */}
      <div className={styles.inputGroup}>
        {" "}
        {/* Input group style */}
        <p className={styles.locationInfo}>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      </div>
      <div className={styles.inputGroup}>
        {" "}
        {/* Input group style */}
        <label htmlFor="roof-area" className={styles.inputLabel}>
          Roof Area (m²):{" "}
        </label>{" "}
        {/* Apply label style */}
        <input
          type="number"
          id="roof-area"
          value={roofArea}
          onChange={handleRoofAreaChange}
          min="10"
          step="10"
          className={styles.inputField} // Apply input field style
        />
      </div>
      <div className={styles.inputGroup}>
        {" "}
        {/* Input group style */}
        <label htmlFor="roof-slope" className={styles.inputLabel}>
          Roof Slope (degrees):{" "}
        </label>{" "}
        {/* Apply label style */}
        <input
          type="number"
          id="roof-slope"
          value={slope}
          onChange={handleSlopeChange}
          min="0"
          max="90"
          step="5"
          className={styles.inputField} // Apply input field style
        />
      </div>
      <div className={styles.inputGroup}>
        {" "}
        {/* Input group style */}
        <label htmlFor="panel-efficiency" className={styles.inputLabel}>
          Panel Efficiency (%):{" "}
        </label>{" "}
        {/* Apply label style */}
        <input
          type="number"
          id="panel-efficiency"
          value={panelEfficiency}
          onChange={handleEfficiencyChange}
          min="10"
          max="25"
          step="0.5"
          className={styles.inputField} // Apply input field style
        />
      </div>
      <div className={styles.inputGroup}>
        {" "}
        {/* Input group style */}
        <label htmlFor="system-losses" className={styles.inputLabel}>
          System Losses (%):{" "}
        </label>{" "}
        {/* Apply label style */}
        <input
          type="number"
          id="system-losses"
          value={systemLosses}
          onChange={handleLossesChange}
          min="5"
          max="30"
          step="0.5"
          className={styles.inputField} // Apply input field style
        />
      </div>
      <div className={styles.inputGroup}>
        {" "}
        {/* Input group style */}
        <label htmlFor="system-cost" className={styles.inputLabel}>
          Estimated System Cost ($):{" "}
        </label>{" "}
        {/* Apply label style */}
        <input
          type="number"
          id="system-cost"
          value={estimatedSystemCost}
          onChange={handleSystemCostChange}
          min="1000"
          step="1000"
          className={styles.inputField} // Apply input field style
        />
      </div>
      <div className={styles.inputGroup}>
        {" "}
        {/* Input group style */}
        <label htmlFor="electricity-cost" className={styles.inputLabel}>
          Electricity Cost ($/kWh):{" "}
        </label>{" "}
        {/* Apply label style */}
        <input
          type="number"
          id="electricity-cost"
          value={electricityCost}
          onChange={handleElectricityCostChange}
          min="0.01"
          step="0.01"
          className={styles.inputField} // Apply input field style
        />
      </div>
      {loading ? (
        <p className={styles.loading}>
          Loading solar data and calculating performance & ROI...
        </p>
      ) : error ? (
        <p className={styles.error}>Error fetching data: {error.message}</p>
      ) : irradiance !== null &&
        estimatedACEnergy !== null &&
        systemEfficiency !== null &&
        roi !== null &&
        paybackPeriod !== null ? (
        <div className={styles.resultsContainer}>
          {" "}
          {/* Apply results container style */}
          <h3 className={styles.resultsTitle}>Solar Data:</h3>{" "}
          {/* Apply results title style */}
          <p className={styles.resultsText}>
            {" "}
            {/* Apply results text style */}
            Solar Irradiance:{" "}
            <strong className={styles.resultsValue}>
              {irradiance} kW-hr/m²/day
            </strong>{" "}
            {/* Apply results value style */}
          </p>
          <h3 className={styles.resultsTitle}>
            Performance Calculation Results:
          </h3>{" "}
          {/* Apply results title style */}
          <p className={styles.resultsText}>
            Roof Area:{" "}
            <strong className={styles.resultsValue}>{roofArea} m²</strong>
          </p>{" "}
          {/* Apply results text and value styles */}
          <p className={styles.resultsText}>
            Roof Slope:{" "}
            <strong className={styles.resultsValue}>{slope}°</strong>
          </p>{" "}
          {/* Apply results text and value styles */}
          <p className={styles.resultsText}>
            Panel Efficiency:{" "}
            <strong className={styles.resultsValue}>{panelEfficiency}%</strong>
          </p>{" "}
          {/* Apply results text and value styles */}
          <p className={styles.resultsText}>
            System Losses:{" "}
            <strong className={styles.resultsValue}>{systemLosses}%</strong>
          </p>{" "}
          {/* Apply results text and value styles */}
          <p className={styles.resultsText}>
            Estimated Daily AC Energy Output:{" "}
            <strong className={styles.resultsValue}>
              {estimatedACEnergy.toFixed(2)} kW-hr/day
            </strong>
          </p>{" "}
          {/* Apply results text and value styles */}
          <p className={styles.resultsText}>
            Average Solar Panel System Efficiency:{" "}
            <strong className={styles.resultsValue}>
              {systemEfficiency.toFixed(2)}%
            </strong>
          </p>
          <h3 className={styles.resultsTitle}>
            Return on Investment (ROI) Estimate:
          </h3>{" "}
          {/* Apply results title style */}
          <p className={styles.resultsText}>
            Estimated System Cost:{" "}
            <strong className={styles.resultsValue}>
              ${estimatedSystemCost}
            </strong>
          </p>{" "}
          {/* Apply results text and value styles */}
          <p className={styles.resultsText}>
            Electricity Cost:{" "}
            <strong className={styles.resultsValue}>
              ${electricityCost}/kWh
            </strong>
          </p>{" "}
          {/* Apply results text and value styles */}
          <p className={styles.resultsText}>
            Estimated Payback Period:{" "}
            <strong className={styles.resultsValue}>
              {paybackPeriod.toFixed(2)} years
            </strong>
          </p>
          <p className={styles.resultsText}>
            Projected ROI over 25 years:{" "}
            <strong className={styles.resultsValue}>{roi.toFixed(2)}%</strong>
          </p>
        </div>
      ) : (
        <p className={styles.noData}>
          Could not retrieve solar data or calculate performance & ROI.
        </p>
      )}
    </div>
  );
};

export default SolarPerformanceCalculator;
