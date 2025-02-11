"use client";

import { useEffect, useState } from "react";
import styles from "./SolarIncentives.module.css";

export default function SolarIncentives() {
  const [incentives, setIncentives] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncentives = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_OPENEI_API_KEY;
      const url = `https://api.openei.org/utility_rates?version=latest&format=json&api_key=${API_KEY}`;

      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch solar incentives");

        const data = await response.json();
        setIncentives(data.items || []);
      } catch (err) {
        setError("Failed to load incentives");
      }
    };

    fetchIncentives();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Government Solar Incentives</h2>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.incentiveList}>
        {incentives.length > 0 ? (
          incentives.map((item, index) => (
            <li key={index} className={styles.incentiveItem}>
              <strong>{item.name || "Unknown Incentive"}</strong>:{" "}
              {item.description || "No description available"}
            </li>
          ))
        ) : (
          <p>Loading incentives...</p>
        )}
      </ul>
    </div>
  );
}
