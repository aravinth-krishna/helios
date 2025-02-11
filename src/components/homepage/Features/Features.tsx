import React from "react";
import styles from "./Features.module.css";
import {
  FaRocket,
  FaTasks,
  FaChartBar,
  FaUsers,
  FaBrain,
  FaMobileAlt,
  FaClock,
  FaCode,
  FaShareAlt,
} from "react-icons/fa";

// Define Helios features data.
const featuresData = [
  {
    icon: <FaRocket />,
    title: "Dynamic ROI Calculator",
    description:
      "Get real‑time estimates of your solar investment returns based on live data.",
  },
  {
    icon: <FaTasks />,
    title: "Aggregated Data Integration",
    description:
      "Seamlessly combine solar irradiance, weather patterns, and pricing information for precise analysis.",
  },
  {
    icon: <FaChartBar />,
    title: "Interactive Visual Analytics",
    description:
      "Explore detailed charts and graphs that map your potential savings and performance.",
  },
  {
    icon: <FaUsers />,
    title: "Personalized Solar Insights",
    description:
      "Tailor your investment analysis to your unique energy consumption and local conditions.",
  },
  {
    icon: <FaBrain />,
    title: "Smart Incentive Navigator",
    description:
      "Access localized government and utility incentives to maximize your solar benefits.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Optimized Experience",
    description:
      "Enjoy a fully responsive design that works flawlessly across all devices.",
  },
  {
    icon: <FaClock />,
    title: "Real-Time Updates",
    description:
      "Stay informed with up‑to‑date market trends, weather changes, and policy updates.",
  },
  {
    icon: <FaCode />,
    title: "Robust API Integration",
    description:
      "Integrate Helios data seamlessly into your systems with our comprehensive API.",
  },
  {
    icon: <FaShareAlt />,
    title: "Automated Analysis",
    description:
      "Benefit from continuous recalculations and scenario comparisons for optimized decision‑making.",
  },
];

// Split the cards into two groups (for example, alternate cards).
const topFeatures = featuresData.filter((_, index) => index % 2 === 0);
const bottomFeatures = featuresData.filter((_, index) => index % 2 !== 0);

const Features = () => {
  return (
    <section id={"features"} className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Discover Helios Features</h2>
          <p className={styles.introText}>
            Explore a suite of tools designed to optimize your solar investment
            experience.
          </p>
        </div>

        <div className={styles.carouselWrapper}>
          <div className={styles.topCarousel}>
            <div className={styles.carouselInnerLeftToRight}>
              {topFeatures.map((feature, index) => (
                <div
                  className={styles.featureCard}
                  key={`top-feature-${index}`}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                  <p className={styles.featureCardDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
              {topFeatures.map((feature, index) => (
                <div
                  className={styles.featureCard}
                  key={`top-feature-dup-${index}`}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                  <p className={styles.featureCardDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bottomCarousel}>
            <div className={styles.carouselInnerRightToLeft}>
              {bottomFeatures.map((feature, index) => (
                <div
                  className={styles.featureCard}
                  key={`bottom-feature-${index}`}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                  <p className={styles.featureCardDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
              {bottomFeatures.map((feature, index) => (
                <div
                  className={styles.featureCard}
                  key={`bottom-feature-dup-${index}`}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                  <p className={styles.featureCardDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
