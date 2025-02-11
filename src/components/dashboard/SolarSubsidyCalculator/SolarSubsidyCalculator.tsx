"use client";
import React, { useState, useEffect } from "react";
import styles from "./SolarSubsidyCalculator.module.css";

const SolarSubsidyCalculator: React.FC = () => {
  const [capacity, setCapacity] = useState(1);
  const [subsidy, setSubsidy] = useState(0);
  const [installationCost, setInstallationCost] = useState(0);
  const [sector, setSector] = useState("residential");
  const [state, setState] = useState("default");
  const installationCostPerKW = 50000;

  const calculateSubsidy = (capacity: number) => {
    let subsidyAmount = 0;
    const cost = capacity * installationCostPerKW;

    if (capacity <= 2) {
      subsidyAmount = cost * 0.6;
    } else if (capacity > 2 && capacity <= 3) {
      subsidyAmount =
        2 * installationCostPerKW * 0.6 +
        (capacity - 2) * installationCostPerKW * 0.4;
    } else if (capacity > 3) {
      subsidyAmount = 78000;
    }

    return { subsidy: Math.min(subsidyAmount, 78000), installationCost: cost };
  };

  useEffect(() => {
    const calculation = calculateSubsidy(capacity);
    setSubsidy(calculation.subsidy);
    setInstallationCost(calculation.installationCost);
  }, [capacity]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(parseFloat(event.target.value));
  };

  const handleSectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSector(event.target.value);
    console.log("Selected Sector:", event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
    console.log("Selected State:", event.target.value);
  };

  const netInstallationCost = installationCost - subsidy;
  const subsidyPercentage =
    installationCost > 0 ? (subsidy / installationCost) * 100 : 0;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Indian Solar Rooftop Subsidy Calculator</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="sectorSelect" className={styles.label}>
          Sector Type:
        </label>
        <select
          id="sectorSelect"
          className={styles.select}
          value={sector}
          onChange={handleSectorChange}
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="industrial">Industrial</option>
          <option value="institutional">Institutional</option>
          {/* Add more sectors as needed */}
        </select>
        <p className={styles.inputDescription}>
          Select the sector for the solar installation. Subsidy rules can vary
          by sector.
        </p>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="stateSelect" className={styles.label}>
          State:
        </label>
        <select
          id="stateSelect"
          className={styles.select}
          value={state}
          onChange={handleStateChange}
        >
          <option value="default">All India (General)</option>
          <option value="state1">State 1 (Example)</option>
          <option value="state2">State 2 (Example)</option>
        </select>
        <p className={styles.inputDescription}>
          Select your state to see if state-specific subsidies apply (currently
          using a general India subsidy model).
        </p>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="capacitySlider" className={styles.label}>
          System Capacity (kW):
        </label>
        <input
          type="range"
          id="capacitySlider"
          min="0"
          max="5"
          step="0.1"
          value={capacity}
          onChange={handleSliderChange}
          className={styles.slider}
        />
        <p className={styles.capacityDisplay}>
          Selected Capacity: {capacity.toFixed(1)} kW
        </p>
        <p className={styles.inputDescription}>
          Slide to choose your desired solar system capacity. Subsidies are
          often tiered based on capacity.
        </p>
      </div>

      <div className={styles.resultGroup}>
        <div className={styles.result}>
          <p className={styles.resultText}>
            Estimated Installation Cost:{" "}
            <span className={styles.resultValue}>
              ₹{installationCost.toLocaleString()}
            </span>
          </p>
        </div>

        <div className={styles.result}>
          <p className={styles.resultText}>
            Estimated Subsidy Amount:{" "}
            <span className={styles.resultValue}>
              ₹{subsidy.toLocaleString()}
            </span>
          </p>
        </div>

        <div className={styles.result}>
          <p className={styles.resultText}>
            Net Installation Cost (After Subsidy):{" "}
            <span className={styles.resultValue}>
              ₹{netInstallationCost.toLocaleString()}
            </span>
          </p>
        </div>

        <div className={styles.result}>
          <p className={styles.resultText}>
            Subsidy as Percentage of Cost:{" "}
            <span className={styles.resultValue}>
              {subsidyPercentage.toFixed(2)}%
            </span>
          </p>
        </div>
      </div>

      <div className={styles.disclaimer}>
        <p>
          <strong className={styles.disclaimerTitle}>Disclaimer:</strong>
          This calculator provides an *estimate* of solar subsidies based on a
          simplified model and publicly available information. Actual subsidy
          amounts may vary significantly based on current government policies,
          state-specific schemes, changes in regulations, your eligibility
          criteria, and the specifics of your project. For accurate and
          up-to-date subsidy information, please:
          <ul className={styles.disclaimerList}>
            <li>
              <strong>
                Consult the latest guidelines and notifications from the
                Ministry of New and Renewable Energy (MNRE), Government of
                India.
              </strong>
            </li>
            <li>
              <strong>
                Check for state-specific solar incentive programs and policies
                offered by your state&apos;s renewable energy development agency
                or electricity distribution companies.
              </strong>
            </li>
            <li>
              <strong>
                Contact a solar installer or a relevant government agency for
                personalized subsidy information and application process
                guidance.
              </strong>
            </li>
          </ul>
          This tool is for informational purposes only and should not be
          considered as financial or legal advice.
        </p>
      </div>
    </div>
  );
};

export default SolarSubsidyCalculator;
