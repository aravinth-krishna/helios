import styles from "./About.module.css";
import Image from "next/image";

import {
  FaRocket,
  FaTasks,
  FaChartBar,
  FaBrain,
  FaMobileAlt,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  return (
    <section id={"about"} className={styles.about}>
      <div className={styles.aboutHero}>
        <div className={styles.aboutHeroText}>
          <h1>Helios: Empower Your Solar Investment</h1>
          <p>
            Welcome to Helios, your trusted partner in harnessing the power of
            the sun. Experience real-time ROI insights, personalized solar
            performance data, and smart incentive guidance—all tailored to your
            unique energy needs.
          </p>
        </div>
        <div className={styles.aboutHeroImage}>
          <Image
            src={"/rooftop-solar-about-image.jpg"}
            alt={"Solar Investment Overview"}
            width={600}
            height={300}
            className={styles.heroImg}
          />
        </div>
      </div>
      <div className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>Our Key Strengths</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaRocket />
            </div>
            <h3>Rapid ROI Calculation</h3>
            <p>
              Quickly assess your potential savings with dynamic, real‑time
              analysis.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaTasks />
            </div>
            <h3>Seamless Data Integration</h3>
            <p>
              Consolidate solar irradiance, pricing, and weather data for
              accurate projections.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaChartBar />
            </div>
            <h3>Interactive Analytics</h3>
            <p>
              Visualize your investment potential with detailed, interactive
              charts.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaUsers />
            </div>
            <h3>Personalized Insights</h3>
            <p>
              Tailor your analysis to match your specific energy needs and local
              conditions.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaBrain />
            </div>
            <h3>Smart Incentive Navigator</h3>
            <p>
              Discover government and utility incentives that maximize your
              solar benefits.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <FaMobileAlt />
            </div>
            <h3>Mobile Optimized</h3>
            <p>
              Access Helios on any device with our fully responsive,
              user‑friendly design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
