import React from "react";
import styles from "./DashboardSidebar.module.css";

interface DashboardSidebarProps {
  onNavClick: (view: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onNavClick }) => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <button
            onClick={() => onNavClick("roi")}
            className={styles.navButton}
          >
            ROI Calculator
          </button>
        </li>
        <li className={styles.navItem}>
          <button
            onClick={() => onNavClick("incentive")}
            className={styles.navButton}
          >
            Incentive details
          </button>
        </li>
        <li className={styles.navItem}>
          <button
            onClick={() => onNavClick("chat")}
            className={styles.navButton}
          >
            AI Chat
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardSidebar;
